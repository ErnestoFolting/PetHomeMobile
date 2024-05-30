using backendPetHome.BLL.DTOs.RequestDTOs;

namespace backendPetHome.BLL.Services.Interfaces
{
    public interface IRequestService
    {
        Task<RequestDTO> addRequest(string userId, int advertId, DAL.Enums.RequestStatusEnum status);
        Task<(List<RequestDTO> requestsToRejectDTO, RequestDTO requestDTO)> confirmRequest(int requestId, string userId);

        Task<RequestDTO> applyGeneratedRequest(int requestId, string userId);
        Task<RequestDTO> deleteRequest(int requestId, string userId);
        Task<RequestDTO> rejectRequest(int requestId, string userId);
    }
}
