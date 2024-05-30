using backendPetHome.DAL.Data;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Repositories;

namespace backendPetHome.DAL
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly DataContext _context;
        public IAdvertRepository AdvertRepository { get; }
        public IRequestRepository RequestRepository { get; }
        public ITimeExceptionRepository TimeExceptionRepository { get; }
        public IRefreshTokenRepository RefreshTokenRepository { get; }
        public IUserRepository UserRepository { get; }
        public IFileRepository FileRepository { get; }
        public UnitOfWork(DataContext context)
        {
            _context = context;
            AdvertRepository = new AdvertRepository(context);
            RequestRepository = new RequestRepository(context);
            TimeExceptionRepository = new TimeExceptionRepository(context);
            RefreshTokenRepository = new RefreshTokenRepository(context);
            UserRepository = new UserRepository(context);
            FileRepository = new FileRepository(Path.Combine(Environment.CurrentDirectory, "wwwroot", "images"));
        }
        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
