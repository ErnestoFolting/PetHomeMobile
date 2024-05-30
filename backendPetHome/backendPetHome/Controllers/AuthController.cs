using backendPetHome.BLL.DTOs.RefreshTokenDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] UserRegisterDTO data, IFormFile userPhoto)
        {
            await _authService.Register(data, userPhoto);
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO creds)
        {
            var tokensAndRoles = await _authService.Login(creds);
            SetTokens(tokensAndRoles.Security, tokensAndRoles.Refresh);
            string? userId = tokensAndRoles.Refresh.ownerId;
            return Ok(new { userId, tokensAndRoles.Security, tokensAndRoles.Roles });
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken == null) return Forbid();
            var tokensAndRoles = await _authService.Refresh(refreshToken);
            SetTokens(tokensAndRoles.Security, tokensAndRoles.Refresh);
            string? userId = tokensAndRoles.Refresh.ownerId;
            return Ok(new { userId, tokensAndRoles.Roles });
        }

        [HttpPost("logout")]
        public async Task<ActionResult<string>> Logout()
        {
            var cookieOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now,
                SameSite = SameSiteMode.None,
                Secure = true
            };
            Response.Cookies.Append("accessToken", "", cookieOption);
            Response.Cookies.Append("refreshToken", "", cookieOption);
            return Ok();
        }

        private void SetTokens(SecurityToken security, RefreshTokenDTO refresh)
        {
            var accessOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = security.ValidTo,
                SameSite = SameSiteMode.None,
                Secure = true
            };
            var refreshOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = refresh.expires,
                SameSite = SameSiteMode.None,
                Secure = true
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var encrypterAccessToken = tokenHandler.WriteToken(security);
            Response.Cookies.Append("accessToken", encrypterAccessToken, accessOption);
            Response.Cookies.Append("refreshToken", refresh.token, refreshOption);
        }
    }
}
