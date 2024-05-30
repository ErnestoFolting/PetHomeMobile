namespace backendPetHome.BLL.Services.Interfaces
{
    public interface ITimeExceptionService
    {
        Task addTimeExceptions(string userId, IEnumerable<DateTime> dates);
        Task deleteTimeExceptions(string userId, IEnumerable<DateTime> datesToRemove);
        Task<bool> checkPerformerDates(string userId, DateTime advertStart, DateTime advertEnd);

    }
}
