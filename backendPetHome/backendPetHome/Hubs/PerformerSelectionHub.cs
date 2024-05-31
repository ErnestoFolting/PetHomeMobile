using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.DTOs.RequestDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace backendPetHome.API.Hubs
{
    [Authorize]
    public class PerformerSelectionHub : Hub, IPerformerSelectionHub
    {
        public async Task Send(IEnumerable<string> possiblePerformerIds, AdvertDTO advertToSend)
        {
            //await Clients.Users(possiblePerformerIds).SendAsync("Send", advertToSend);
        }

        public async Task ApplyRequest(RequestDTO requestDTO)
        {
            string? ownerId = requestDTO.advert.ownerId;
            if (ownerId != null)
            {
                await Clients.User(ownerId).SendAsync("Apply", requestDTO);
            }
            //await Clients.User("37ae77ba-94a7-46db-a5e7-6be9d237c7fe").SendAsync("Send", requestDTO?.status);
        }

        public async Task Check(string checkString)
        {
            await Clients.User("37ae77ba-94a7-46db-a5e7-6be9d237c7fe").SendAsync("Send", checkString);
        }

        public async Task DeleteRequest(RequestDTO requestDTO)
        {
            //string? ownerId = requestDTO.advert.ownerId;
            //if (ownerId != null &&
            //    requestDTO.advert.status != DAL.Enums.AdvertStatusEnum.finished &&
            //    requestDTO.status != DAL.Enums.RequestStatusEnum.rejected
            //    )
            //{
            //    await Clients.User(ownerId).SendAsync("Delete", requestDTO);
            //}
        }

        public async Task ConfirmRequest(List<RequestDTO> requestsToReject, RequestDTO requestToConfirm)
        {
            //List<string> applierIdsToRejectNotify = new();
            //requestsToReject.ForEach(el => applierIdsToRejectNotify.Add(el.userId));
            //await Clients.Users(applierIdsToRejectNotify).SendAsync("Reject", requestToConfirm);
            //await Clients.User(requestToConfirm.userId).SendAsync("Confirm", requestToConfirm);
        }

        public async Task RejectRequest(RequestDTO requestToReject)
        {
            //string applierId = requestToReject.userId;
            //await Clients.User(applierId).SendAsync("Reject", requestToReject);
        }
    }
}
