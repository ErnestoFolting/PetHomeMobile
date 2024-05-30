global using Microsoft.EntityFrameworkCore;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Reflection;
using FluentValidation.AspNetCore;
using backendPetHome.BLL.MappingProfiles.UserProfiles;
using backendPetHome.BLL.MappingProfiles.AdvertProfiles;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL;
using backendPetHome.DAL.Entities;
using backendPetHome.API.Hubs;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.API.Validators.AdvertValidators;
using backendPetHome.API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("X-Pagination-Total-Count")
            .SetIsOriginAllowed(origin => true);
        });
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IAdvertService,AdvertService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ITimeExceptionService,TimeExceptionService>();
builder.Services.AddScoped<UserDataService>();
builder.Services.AddScoped<IRequestService,RequestService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddSingleton<PerformerSelectionHub>();
builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AdvertCreateRedoDTOValidator>());

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddCookie(option =>
{
    option.Cookie.Name = "accessToken";
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"])),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["accessToken"];
            return Task.CompletedTask;
        }
    };
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Standard Authorization header using the Bearer scheme (\"Bearer {token}\")"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string []{}
        }
    }); 
});

builder.Services.AddAutoMapper(Assembly.GetAssembly(typeof(AdvertProfile)), Assembly.GetAssembly(typeof(UserProfile)));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<DataContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
    await RoleInitializer.InitializeAsync(services);
}


app.UseStaticFiles();

app.UseAuthentication();

app.UseCors("CORSPolicy");

app.UseAuthorization();

app.MapHub<PerformerSelectionHub>("/performerSelectionHub");

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.MapControllers();

app.Run();