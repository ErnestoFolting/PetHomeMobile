using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.QueryParameters;
using Microsoft.AspNetCore.Http;

namespace backendPetHome.BLL.Services
{
    public class AdvertService : BaseService, IAdvertService
    {
        private readonly IRequestService _requestService;

        public AdvertService(IUnitOfWork unitOfWork, IRequestService requestService, IMapper mapper)
            :base(unitOfWork,mapper)
        {
            _requestService = requestService;
        }
        public async Task<(List<AdvertDTO> fitAdvertsDTO, int totalCount)> getAdverts(QueryStringParameters parameters,string userId)
        {
            var fitAdverts = await _unitOfWork.AdvertRepository.GetBySpecificationAndPaging(new AdvertWithParamsAndPaginationSpecification(userId, parameters));
            List<AdvertDTO> advertsDTO = _mapper.Map<List<AdvertDTO>>(fitAdverts.fitAdverts);
            return (advertsDTO, fitAdverts.totalCount);
        }

        public async Task<(List<AdvertDTO> fitAdvertsDTO, int totalCount)> getAdverts(QueryStringParameters parameters)
        {
            var fitAdverts = await _unitOfWork.AdvertRepository.GetBySpecificationAndPaging(new AllAdvertsWithPaginationSpecification(parameters));
            List<AdvertDTO> advertsDTO = _mapper.Map<List<AdvertDTO>>(fitAdverts.fitAdverts);
            return (advertsDTO, fitAdverts.totalCount);
        }

        public async Task<AdvertDTO> getAdvertById(int advertId)
        { 
            Advert? advert = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdWithOwnerSpecification(advertId));
            if (advert == null) throw new KeyNotFoundException("Advert not found.");

            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(advert);
            return advertDTO;
        }

        public async Task<(IEnumerable<string> possiblePerformersIds,AdvertDTO advertDTO)> addAdvert(AdvertCreateRedoDTO advertToAdd, string userId, IFormFile advertFile)
        {
            Advert newAdvert = _mapper.Map<Advert>(advertToAdd);
            newAdvert.photoFilePath = "/images/" + advertFile.FileName;
            newAdvert.ownerId = userId;
            await _unitOfWork.AdvertRepository.Add(newAdvert);
            await _unitOfWork.FileRepository.Add(advertFile);
            await _unitOfWork.SaveChangesAsync();

            IEnumerable<string> possiblePerformersIds = await _unitOfWork.UserRepository.SelectPossiblePerformers(newAdvert, userId);
            foreach(string possiblePerformerId in possiblePerformersIds)
            {
                await _requestService.addRequest(possiblePerformerId, newAdvert.Id, RequestStatusEnum.generated);
            }
            await _unitOfWork.SaveChangesAsync();

            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(newAdvert);
            return (possiblePerformersIds, advertDTO);
        }
        public async Task MarkAsFinished(int advertId, string userId) {
            var advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdSpecification(advertId));
            if (advertInDb == null) throw new KeyNotFoundException("Advert not found.");
            if (advertInDb.ownerId!= userId) throw new ArgumentException("You do not have the access.");

            advertInDb.status = AdvertStatusEnum.finished;
            await _unitOfWork.AdvertRepository.Update(advertInDb);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task deleteAdvert(int advertId, string userId)
        {
            var advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdIncludesRequestAndUserSpecification(advertId));
            if (advertInDb == null) throw new KeyNotFoundException("Advert not found.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("You do not have the access.");
            if (advertInDb.requests.Any(el => el.status != RequestStatusEnum.rejected && el.status !=RequestStatusEnum.generated) && advertInDb.status != AdvertStatusEnum.finished) throw new ArgumentException("There are requests on advert. Delete them or finish advert before deleting.");

            await _unitOfWork.AdvertRepository.Delete(advertInDb);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task deleteAdvert(int advertId)
        {
            var advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdSpecification(advertId));
            if (advertInDb == null) throw new KeyNotFoundException("Advert not found.");

            await _unitOfWork.AdvertRepository.Delete(advertInDb);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
