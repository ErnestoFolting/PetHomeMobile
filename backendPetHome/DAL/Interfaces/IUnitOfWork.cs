using backendPetHome.DAL.Interfaces.RepositoryInterfaces;

namespace backendPetHome.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IAdvertRepository AdvertRepository { get; }
        IRequestRepository RequestRepository { get; }
        ITimeExceptionRepository TimeExceptionRepository { get; }
        IRefreshTokenRepository RefreshTokenRepository { get; }
        IUserRepository UserRepository { get; }
        IFileRepository FileRepository { get; }
        Task<int> SaveChangesAsync();
    }
}
