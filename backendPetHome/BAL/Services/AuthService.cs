using AutoMapper;
using backendPetHome.BLL.DTOs.RefreshTokenDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.RefreshTokenSpecifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backendPetHome.BLL.Services
{
    public class AuthService: BaseService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        public AuthService(IUnitOfWork unitOfWork, UserManager<User> userManager, IMapper mapper, IConfiguration configuration):base(unitOfWork,mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        public async Task Register(UserRegisterDTO data, IFormFile userFile)
        {
            var userExisted = await _userManager.FindByNameAsync(data.UserName);
            if (userExisted != null)
            {
                throw new ArgumentException("The user with that userName already existing.");
            }
            User newUser = _mapper.Map<User>(data);

            string photoFilePath = "/images/" + userFile.FileName;

            newUser.photoFilePath = photoFilePath;

            var result = await _userManager.CreateAsync(newUser, data.password);
            await _unitOfWork.FileRepository.Add(userFile);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "User");
            }
            else
            {
                throw new InvalidOperationException("Can not add a new user.");
            }
        }

        public async Task<(SecurityToken Security, RefreshTokenDTO Refresh, IList<string> Roles)> Login(UserLoginDTO creds)
        {
            var user = await _userManager.FindByNameAsync(creds.username);
            if (user != null && await _userManager.CheckPasswordAsync(user, creds.password))
            {
                IList<string> roles = await _userManager.GetRolesAsync(user);
                var newTokens = await getTokens(user, roles);
                return (newTokens.Security,newTokens.Refresh, roles);
            }
            throw new ArgumentException("Invalid credentials.");
        }

        public async Task<(SecurityToken Security, RefreshTokenDTO Refresh, IList<string> Roles)> Refresh(string refreshToken)
        {
            RefreshToken? refreshTokenInDb = await _unitOfWork.RefreshTokenRepository.GetBySpecification(new RefreshTokenGetByTokenSpecification(refreshToken));
            if (refreshTokenInDb == null)
            {
                throw new KeyNotFoundException("The refresh token does not exist.");
            }
            else if (refreshTokenInDb?.isNotActual == true || refreshTokenInDb?.expires < DateTime.Now)
            {
                throw new ArgumentException("The refresh token is not actual.");
            }
            else if (validateToken(refreshToken))
            {
                refreshTokenInDb.isNotActual = true;
                await _unitOfWork.RefreshTokenRepository.Update(refreshTokenInDb);
                var user = await _userManager.FindByIdAsync(refreshTokenInDb.ownerId);
                IList<string> roles = await _userManager.GetRolesAsync(user);
                var newTokens = await getTokens(user,  roles);
                return (newTokens.Security,newTokens.Refresh, roles);
            }
            else
            {
                throw new ArgumentException("The refresh token is not valid.");
            }
        }
        private bool validateToken(string? token)
        {
            if (token == null) return false;
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    ValidAudience = _configuration["JWT:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"])),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private async Task<(SecurityToken Security, RefreshTokenDTO Refresh)> getTokens(User user, IList<string> userRoles)
        {
            var securityToken = GetSecurityToken(user, DateTime.Now.AddDays(1), userRoles); //change
            var newRefreshToken = GetRefreshToken(user, userRoles);
            await _unitOfWork.RefreshTokenRepository.Add(newRefreshToken);
            await _unitOfWork.SaveChangesAsync();
            RefreshTokenDTO refreshDTO = _mapper.Map<RefreshTokenDTO>(newRefreshToken);
            return (securityToken,refreshDTO);
        }
        private RefreshToken GetRefreshToken(User user, IList<string> userRoles)
        {
            var expireTime = DateTime.Now.AddDays(7);
            var refreshJWT = GetSecurityToken(user, expireTime, userRoles);
            var tokenHandler = new JwtSecurityTokenHandler();
            var encryptedRefreshToken = tokenHandler.WriteToken(refreshJWT);
            RefreshToken refreshToken = new()
            {
                token = encryptedRefreshToken,
                expires = expireTime,
                created = DateTime.Now,
                ownerId = user.Id
            };
            return refreshToken;
        }
        private SecurityToken GetSecurityToken(User user, DateTime expireTime, IList<string> userRoles)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: expireTime,
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
    }
}
