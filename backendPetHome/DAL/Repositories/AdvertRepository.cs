using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class AdvertRepository :IAdvertRepository
    {
        private readonly DataContext _context;
        public AdvertRepository(DataContext context)
        {
            _context = context;
        }

        public async Task Add(Advert advertToAdd)
        {
            await _context.Set<Advert>().AddAsync(advertToAdd);
        }

        public Task<Advert?> GetByIdSpecification(Specification<Advert> spec)
        {
            return ApplySpecification(spec).SingleOrDefaultAsync();
        }

        public Task<List<Advert>> GetBySpecification(Specification<Advert> spec)
        {
            return ApplySpecification(spec).ToListAsync();
        }

        public async Task<(List<Advert> fitAdverts, int totalCount)> GetBySpecificationAndPaging(Specification<Advert> spec)
        {
            var fitAdvertsWithPaging = await ApplySpecification(spec).ToListAsync();
            spec.RemovePagination();
            var totalCount = await ApplySpecification(spec).CountAsync();
            return (fitAdvertsWithPaging,totalCount);
        }
        public async Task Update(Advert advertToUpdate)
        { 
            _context.Set<Advert>().Attach(advertToUpdate);
            _context.Entry(advertToUpdate).State = EntityState.Modified;
        }
        public async Task Delete(Advert entity)
        {
            _context.Set<Advert>().Remove(entity);
        }

        private IQueryable<Advert> ApplySpecification(Specification<Advert> specification)
        {
            IQueryable<Advert> set;

            if (specification?.userId !=null)
            {
                 set = _context.getTimeExceptionFitAdverts(specification.userId);
            }
            else
            {
                set = _context.Set<Advert>();
            }
            
            return SpecificationEvaluator.getQuery(set, specification);
        }
    }
}
