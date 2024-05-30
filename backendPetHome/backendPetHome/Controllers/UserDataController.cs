using backendPetHome.API.Controllers.Abstract;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.DTOs.TimeExceptionDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Specifications.QueryParameters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    public class UserDataController : BaseController
    {
        private readonly UserDataService _userDataService;

        public UserDataController(UserDataService userDataService)
        {
            _userDataService = userDataService;
        }

        [HttpGet("myadverts")]
        public async Task<ActionResult<IEnumerable<AdvertUserDTO>>> GetUserAdverts([FromQuery] QueryStringParameters parameters)
        {
            var advertsAndCount = await _userDataService.getCurrentUserAdverts(UserId, parameters);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.totalCount));
            return Ok(advertsAndCount.fitAdvertsDTO);
        }

        [HttpGet("myadverts/{id}")]
        public async Task<ActionResult<IEnumerable<AdvertUserDTO>>> GetUserCertainAdvert(int id)
        {
            AdvertUserDTO? advertInDb = await _userDataService.getCurrentUserCertainAdvert(UserId, id);
            return Ok(advertInDb);
        }

        [HttpGet("myprofile")]
        public async Task<ActionResult<UserDTO>> GetUserProfile()
        {
            var user = await _userDataService.getCurrentUserProfile(UserId);
            return Ok(user);
        }

        [HttpGet("myrequests")]
        public async Task<ActionResult<IEnumerable<RequestDTO>>> GetUserRequests()
        {
            IEnumerable<RequestDTO> requests = await _userDataService.getCurrentUserRequests(UserId);
            return Ok(requests);
        }

        [HttpGet("mytimeexceptions")]
        public async Task<ActionResult<IEnumerable<RequestDTO>>> GetUserTimeExceptions()
        {
            IEnumerable<TimeExceptionDTO> requests = await _userDataService.getCurrentUserTimeExceptions(UserId);
            return Ok(requests);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            await _userDataService.deleteUserProfile(UserId);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile([FromForm] UserRedoDTO data, IFormFile? userPhoto)
        {
            await _userDataService.updateUserProfile(UserId, data, userPhoto);
            return Ok();
        }

        [HttpPut("myadverts/{id}")]
        public async Task<ActionResult> UpdateAdvert([FromForm] AdvertCreateRedoDTO data, IFormFile? advertPhoto, int id)
        {
            await _userDataService.updateUserAdvert(UserId, data, id, advertPhoto);
            return Ok();
        }
    }
}
