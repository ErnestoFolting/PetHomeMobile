using AutoMapper;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.RequestSpecifications;

namespace backendPetHome.BLL.Services
{
    public class RequestService : BaseService, IRequestService
    {
        private readonly ITimeExceptionService _timeExceptionService;
        public RequestService(IUnitOfWork unitOfWork, IMapper mapper, ITimeExceptionService timeExceptionService) : base(unitOfWork, mapper)
        {
            _timeExceptionService = timeExceptionService;
        }
        public async Task<RequestDTO> addRequest(string userId, int advertId, DAL.Enums.RequestStatusEnum status)
        {
            Advert? advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdIncludesRequestAndUserSpecification(advertId));
            if (advertInDb == null) throw new KeyNotFoundException("Advert not found");
            if (advertInDb.ownerId == userId) throw new ArgumentException("You can not send a request on your own advert.");
            if (advertInDb.requests.Any(request => request.userId == userId)) throw new ArgumentException("You can not send request multiple times");
            if (!await _timeExceptionService
                .checkPerformerDates(userId, advertInDb.startTime, advertInDb.endTime))
                throw new ArgumentException("Ви не можете виконувати оголошення в зазначені дати. Видаліть зайняті дати та спробуйте ще раз.");

            Request newRequest = new();
            newRequest.userId = userId;
            newRequest.advertId = advertId;
            newRequest.status = status;

            await _unitOfWork.RequestRepository.Add(newRequest);
            await _unitOfWork.SaveChangesAsync();
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdSpecification(new RequestByIdWithAdvertAndUserSpecification(newRequest.id));
            RequestDTO requestDTO = _mapper.Map<RequestDTO>(requestInDb);
            return requestDTO;
        }
        public async Task<(List<RequestDTO> requestsToRejectDTO, RequestDTO requestDTO)> confirmRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdSpecification(new RequestByIdWithAdvertAndUserSpecification(requestId));
            if (requestInDb == null) throw new KeyNotFoundException("Request not found.");
            if (requestInDb.advert.ownerId != userId) throw new ArgumentException("You do not have the access.");
            if (!await _timeExceptionService.checkPerformerDates(requestInDb.userId, requestInDb.advert.startTime, requestInDb.advert.endTime))
                throw new ArgumentException("This user can not perform at that dates.");

            requestInDb.advert.performerId = requestInDb.userId;
            requestInDb.advert.status = DAL.Enums.AdvertStatusEnum.process;
            requestInDb.status = DAL.Enums.RequestStatusEnum.confirmed;

            List<DateTime> datesToExceptAtPerformer = getListOfDates(requestInDb.advert.startTime, requestInDb.advert.endTime);
            await _timeExceptionService.addTimeExceptions(requestInDb.userId, datesToExceptAtPerformer);
            var requestsToReject = await _unitOfWork.RequestRepository.GetBySpecification(new RequestCurrentAdvertNotCurrentSpecification(requestInDb));
            requestsToReject.ForEach(r =>
            {
                r.status = DAL.Enums.RequestStatusEnum.rejected;
                _unitOfWork.RequestRepository.Update(r);
            });
            await _unitOfWork.SaveChangesAsync();

            RequestDTO requestDTO = _mapper.Map<RequestDTO>(requestInDb);
            List<RequestDTO> requestsToRejectDTO = _mapper.Map<List<RequestDTO>>(requestsToReject);
            return (requestsToRejectDTO, requestDTO);
        }

        public async Task<RequestDTO> applyGeneratedRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdSpecification(new RequestByIdWithAdvertAndUserSpecification(requestId));
            if (requestInDb == null) throw new KeyNotFoundException("Request not found");
            if (requestInDb.userId != userId) throw new ArgumentException("You do not have the access.");

            requestInDb.status = DAL.Enums.RequestStatusEnum.applied;
            await _unitOfWork.RequestRepository.Update(requestInDb);
            await _unitOfWork.SaveChangesAsync();

            RequestDTO requestDTO = _mapper.Map<RequestDTO>(requestInDb);
            return requestDTO;
        }

        public async Task<RequestDTO> deleteRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdSpecification(new RequestByIdWithAdvertAndUserSpecification(requestId));
            if (requestInDb == null) throw new KeyNotFoundException("Request not found");
            if (requestInDb.userId != userId) throw new ArgumentException("You do not have the access.");

            await _unitOfWork.RequestRepository.Delete(requestInDb);
            await _unitOfWork.SaveChangesAsync();

            RequestDTO requestDTO = _mapper.Map<RequestDTO>(requestInDb);
            return requestDTO;
        }

        public async Task<RequestDTO> rejectRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdSpecification(new RequestByIdWithAdvertAndUserSpecification(requestId));
            if (requestInDb == null) throw new KeyNotFoundException("Request not found");
            if (requestInDb.advert.ownerId != userId) throw new ArgumentException("You do not have the access.");

            requestInDb.status = DAL.Enums.RequestStatusEnum.rejected;
            await _unitOfWork.RequestRepository.Update(requestInDb);
            await _unitOfWork.SaveChangesAsync();

            RequestDTO requestDTO = _mapper.Map<RequestDTO>(requestInDb);
            return requestDTO;
        }
        private List<DateTime> getListOfDates(DateTime date1, DateTime date2)
        {
            List<DateTime> allDates = new();
            for (DateTime date = date1; date <= date2; date = date.AddDays(1))
                allDates.Add(date);
            return allDates;
        }
    }
}

