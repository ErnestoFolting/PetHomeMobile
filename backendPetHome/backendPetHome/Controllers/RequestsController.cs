using backendPetHome.API.Controllers.Abstract;
using backendPetHome.API.Hubs;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    public class RequestsController : BaseController
    {
        private readonly IRequestService _requestService;
        private readonly PerformerSelectionHub _hub;

        public RequestsController(IRequestService requestService, PerformerSelectionHub hub)
        {
            _requestService = requestService;
            _hub = hub;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] int advertId)
        {
            RequestDTO requestDTO = await _requestService.addRequest(UserId, advertId, DAL.Enums.RequestStatusEnum.applied);
            await _hub.ApplyRequest(requestDTO);
            return Ok();
        }

        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmRequest(int id)
        {
            var requestsToRejectAndConfirmedRequest = await _requestService.confirmRequest(id, UserId);
            await _hub.ConfirmRequest(requestsToRejectAndConfirmedRequest.requestsToRejectDTO, requestsToRejectAndConfirmedRequest.requestDTO);
            return Ok();
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> Reject(int id)
        {
            RequestDTO requestDTO = await _requestService.rejectRequest(id, UserId);
            await _hub.RejectRequest(requestDTO);
            return Ok();
        }

        [HttpPut("apply/{id}")]
        public async Task<IActionResult> applyGeneratedRequest(int id)
        {
            RequestDTO requestDTO = await _requestService.applyGeneratedRequest(id, UserId);
            await _hub.ApplyRequest(requestDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteRequest(int id)
        {
            RequestDTO requestDTO = await _requestService.deleteRequest(id, UserId);
            await _hub.DeleteRequest(requestDTO);
            return Ok();
        }
    }
}
