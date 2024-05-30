using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IRequestRepository
    {
        Task<Request?> GetByIdSpecification(Specification<Request> spec);
        Task<List<Request>> GetBySpecification(Specification<Request> spec);
        Task Add(Request requestToAdd);
        Task Update(Request requestToUpdate);
        Task Delete(Request requestToRemove);        
    }
}
