using Microsoft.AspNetCore.Mvc;
using backendPetHome.API.Controllers.Abstract;
using backendPetHome.BLL.Services.Interfaces;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    public class TimeExceptionsController : BaseController
    {
        private readonly ITimeExceptionService _timeExceptionServise;
        public TimeExceptionsController(ITimeExceptionService timeExceptionService)
        {
            _timeExceptionServise = timeExceptionService;
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] IEnumerable<DateTime> dates)
        {
            await _timeExceptionServise.addTimeExceptions(UserId, dates);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete([FromBody] IEnumerable<DateTime> dates)
        {
            await _timeExceptionServise.deleteTimeExceptions(UserId, dates);
            return Ok();
        }
    }
}
