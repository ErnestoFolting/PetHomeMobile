using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.DTOs.RequestDTOs;

namespace backendPetHome.API.Hubs
{
    public interface IPerformerSelectionHub
    {
        Task Send(IEnumerable<string> possiblePerformerIds, AdvertDTO advertToSend);
        Task ApplyRequest(RequestDTO requestDTO);
        Task DeleteRequest(RequestDTO requestDTO);
        Task ConfirmRequest(List<RequestDTO> requestsToReject, RequestDTO requestToConfirm);
        Task RejectRequest(RequestDTO requestToReject);
    }
}
