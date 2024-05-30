using AutoMapper;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.TimeExceptionSpecifications;

namespace backendPetHome.BLL.Services
{
    public class TimeExceptionService : BaseService, ITimeExceptionService
    {
        public TimeExceptionService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }
        public async Task addTimeExceptions(string userId, IEnumerable<DateTime> dates)
        {
            var userExceptions = await _unitOfWork
                .TimeExceptionRepository
                .GetBySpecification(new TimeExceptionCurrentUserSpecification(userId));

            foreach (var date in dates)
            {
                TimeException exception = new();
                exception.userId = userId;
                exception.date = date;
                if (userExceptions.FindIndex(el => el.date == exception.date) == -1)
                {
                    await _unitOfWork.TimeExceptionRepository.Add(exception);
                }
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task deleteTimeExceptions(string userId, IEnumerable<DateTime> datesToRemove)
        {
            var userExceptions = await _unitOfWork
                .TimeExceptionRepository
                .GetBySpecification(new TimeExceptionCurrentUserSpecification(userId));

            foreach (var userException in userExceptions)
            {
                if (datesToRemove.Any(dateToRemove =>
                dateToRemove.Year == userException.date.Year &&
                dateToRemove.Month == userException.date.Month &&
                dateToRemove.Day == userException.date.Day))
                {
                    await _unitOfWork.TimeExceptionRepository.Delete(userException);
                }
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> checkPerformerDates(string userId, DateTime advertStart, DateTime advertEnd)
        {
            List<TimeException> fitExceptions = await 
                _unitOfWork
                .TimeExceptionRepository
                .GetBySpecification(new TimeExceptionCurrentUserFitAdvertTimeSpecification(userId, advertStart, advertEnd));
            return !fitExceptions.Any();
        }
    }    
}
