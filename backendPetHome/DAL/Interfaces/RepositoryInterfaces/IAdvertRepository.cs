using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IAdvertRepository
    {
        Task<Advert?> GetByIdSpecification(Specification<Advert> spec);
        Task<List<Advert>> GetBySpecification(Specification<Advert> spec);
        Task<(List<Advert> fitAdverts, int totalCount)> GetBySpecificationAndPaging(Specification<Advert> spec);
        Task Add(Advert entity);
        Task Update(Advert advertToUpdate);
        Task Delete(Advert entity);
    }
}
