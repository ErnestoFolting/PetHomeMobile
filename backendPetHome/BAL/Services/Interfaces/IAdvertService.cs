using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.DAL.Specifications.QueryParameters;
using Microsoft.AspNetCore.Http;

namespace backendPetHome.BLL.Services.Interfaces
{
    public interface IAdvertService
    {
        Task<(List<AdvertDTO> fitAdvertsDTO, int totalCount)> getAdverts(QueryStringParameters parameters,string userId);
        Task<(List<AdvertDTO> fitAdvertsDTO, int totalCount)> getAdverts(QueryStringParameters parameters);
        Task<AdvertDTO> getAdvertById(int advertId);
        Task<(IEnumerable<string> possiblePerformersIds, AdvertDTO advertDTO)> addAdvert(AdvertCreateRedoDTO advertToAdd, string userId, IFormFile advertFile);
        Task MarkAsFinished(int advertId, string userId);
        Task deleteAdvert(int advertId, string userId);
        Task deleteAdvert(int advertId);

    }
}
