using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.DTOs.TimeExceptionDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.QueryParameters;
using backendPetHome.DAL.Specifications.RequestSpecifications;
using backendPetHome.DAL.Specifications.TimeExceptionSpecifications;
using backendPetHome.DAL.Specifications.UserSpecifications;
using Microsoft.AspNetCore.Http;

namespace backendPetHome.BLL.Services
{
    public class UserDataService : BaseService
    {
        public UserDataService(IUnitOfWork unitOfWork, IMapper mapper): base(unitOfWork, mapper)
        {
        }
        public async Task<(List<AdvertUserDTO> fitAdvertsDTO, int totalCount)> getCurrentUserAdverts(string userId, QueryStringParameters parameters)
        {
            var tuple = await 
                _unitOfWork.AdvertRepository
                .GetBySpecificationAndPaging(new AdvertCurrentUserWithParamsAndPaginationIncludesRequestSpecification(userId, parameters));
            List<AdvertUserDTO> fitAdvertsDTO = _mapper.Map<List<AdvertUserDTO>>(tuple.fitAdverts);
            return (fitAdvertsDTO, tuple.totalCount);
        }
        public async Task<AdvertUserDTO?> getCurrentUserCertainAdvert(string userId, int advertId)
        {
            Advert? advertInDb = await 
                _unitOfWork.AdvertRepository
                .GetByIdSpecification(new AdvertByIdIncludesRequestAndUserSpecification(advertId));
            if (advertInDb == null) throw new KeyNotFoundException("Your advert not found.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("This is not your advert.");

            AdvertUserDTO advertUserDTO = _mapper.Map<AdvertUserDTO>(advertInDb);
            return advertUserDTO;
        }
        public async Task<UserDTO> getCurrentUserProfile(string id)
        {
            User? user = await _unitOfWork.UserRepository.GetByIdSpecification(new UserByIdWithTimeExceptionSpecification(id));
            if (user == null) throw new KeyNotFoundException("User not found");

            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
        public async Task<List<RequestDTO>> getCurrentUserRequests(string id)
        {
            List<Request> requests = await _unitOfWork.RequestRepository.GetBySpecification(new RequestCurrentUserSpecification(id));
            List<RequestDTO> requestDTOs = _mapper.Map<List<RequestDTO>>(requests);
            return requestDTOs;
        }

        public async Task<List<TimeExceptionDTO>> getCurrentUserTimeExceptions(string id)
        {
            List<TimeException> timeExceptions = await _unitOfWork.TimeExceptionRepository.GetBySpecification(new TimeExceptionCurrentUserSpecification(id));
            List<TimeExceptionDTO> timeExceptionsDTOs = _mapper.Map<List<TimeExceptionDTO>>(timeExceptions);
            return timeExceptionsDTOs;
        }

        public async Task<int> deleteUserProfile(string userId)
        {
            var userInDb = await _unitOfWork.UserRepository.GetByIdSpecification(new UserByIdSpecification(userId));
            if(userInDb == null) throw new KeyNotFoundException("User does not exist.");

            await _unitOfWork.UserRepository.Delete(userInDb);
            return await _unitOfWork.SaveChangesAsync();
        }
        public async Task<int> updateUserProfile(string userId, UserRedoDTO redoData, IFormFile? userPhoto)
        {
            var userInDb = await _unitOfWork.UserRepository.GetByIdSpecification(new UserByIdSpecification(userId));
            if(userInDb == null) throw new KeyNotFoundException("User does not exist.");

            userInDb = _mapper.Map(redoData, userInDb);
            if (userPhoto != null) {
                userInDb.photoFilePath = "/images/" + userPhoto.FileName;
                await _unitOfWork.FileRepository.Add(userPhoto);
            }
            
            await _unitOfWork.UserRepository.Update(userInDb);
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> updateUserAdvert(string userId, AdvertCreateRedoDTO data, int advertId, IFormFile? advertPhoto)
        {
            Advert? advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdIncludesRequestAndUserSpecification(advertId));
            if (advertInDb == null) throw new KeyNotFoundException("Advert does not exist.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("It is not your advert.");
            if (advertInDb.requests.Any(el => el.status != DAL.Enums.RequestStatusEnum.rejected)) throw new ArgumentException("There are requests on advert. Delete them before redo.");

            advertInDb = _mapper.Map(data, advertInDb);
            if (advertPhoto != null) {
                advertInDb.photoFilePath = "/images/" + advertPhoto.FileName;
                await _unitOfWork.FileRepository.Add(advertPhoto);
            }
            
            await _unitOfWork.AdvertRepository.Update(advertInDb);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}
