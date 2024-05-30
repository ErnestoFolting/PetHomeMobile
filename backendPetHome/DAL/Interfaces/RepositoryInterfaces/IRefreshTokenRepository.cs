using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetBySpecification(Specification<RefreshToken> spec);
        Task Add(RefreshToken tokenToAdd);
        Task Update(RefreshToken tokenToUpdate);
    }
}
