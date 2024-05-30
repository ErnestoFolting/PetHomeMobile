using Microsoft.AspNetCore.Mvc;
using backendPetHome.BLL.Services;
using backendPetHome.BLL.DTOs.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using backendPetHome.API.Controllers.Abstract;
using backendPetHome.BLL.DTOs.AdminDTOs;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> Get(string id)
        {
            var user = await _userService.getCertainUser(id);
            return Ok(user);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("adminAdd")]
        public async Task<IActionResult> AddAdmin([FromBody] AdminAddDTO creds)
        {
            await _userService.addAdmin(creds);
            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetUsers()
        {
            var users = await _userService.getUsers(UserId);
            return Ok(users);

        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{userToDeleteId}")]
        public async Task<ActionResult<List<UserDTO>>> DeleteUser(string userToDeleteId)
        {
            if(UserId == userToDeleteId) return BadRequest();
            await _userService.deleteUserProfile(userToDeleteId);
            return Ok();
        }
    }
}
