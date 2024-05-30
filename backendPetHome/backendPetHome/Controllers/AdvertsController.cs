using backendPetHome.API.Attributes;
using backendPetHome.API.Controllers.Abstract;
using backendPetHome.API.Hubs;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Specifications.QueryParameters;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    public class AdvertsController : BaseController
    {
        private readonly IAdvertService _advertService;
        private readonly PerformerSelectionHub _hub;
        public AdvertsController(IAdvertService advertService, PerformerSelectionHub hub)
        {
            _advertService = advertService;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> GetAdverts([FromQuery] QueryStringParameters parameters)
        {
            var advertsAndCount = await _advertService.getAdverts(parameters, UserId);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.totalCount));
            return Ok(advertsAndCount.fitAdvertsDTO);
        }
        [Authorize(Roles = "Administrator")]
        [HttpGet("byadmin")]
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> GetAdvertsByAdmin([FromQuery] QueryStringParameters parameters)
        {
            var advertsAndCount = await _advertService.getAdverts(parameters);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.totalCount));
            return Ok(advertsAndCount.fitAdvertsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertDTO>> Get(int id)
        {
            return Ok(await _advertService.getAdvertById(id));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] AdvertCreateRedoDTO advertToAdd, IFormFile petPhoto)
        {
            var possiblePerformers = await _advertService.addAdvert(advertToAdd, UserId, petPhoto);
            if (possiblePerformers.possiblePerformersIds != null) await _hub.Send(possiblePerformers.possiblePerformersIds, possiblePerformers.advertDTO);
            return Ok();
        }

        [HttpPut("finish/{advertId}")]
        public async Task<ActionResult> MarkAsFinished(int advertId)
        {
            await _advertService.MarkAsFinished(advertId, UserId);
            return Ok();
        }

        [HttpDelete("{advertId}")]
        public async Task<ActionResult> deleteAdvert(int advertId)
        {
            await _advertService.deleteAdvert(advertId, UserId);
            return Ok();
        }

        [Authorize(Roles ="Administrator")] //can be more complex moderating logic
        [HttpDelete("adminDelete/{advertId}")]
        public async Task<ActionResult> deleteAdvertByAdmin(int advertId)
        {
            await _advertService.deleteAdvert(advertId);
            return Ok();
        }
    }
}
