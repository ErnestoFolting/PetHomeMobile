using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;
        public RequestRepository(DataContext context)
        {
            _context = context;
        }

        public Task<List<Request>> GetBySpecification(Specification<Request> spec)
        {
            return ApplySpecification(spec).ToListAsync();
        }

        public Task<Request?> GetByIdSpecification(Specification<Request> spec)
        {
            return ApplySpecification(spec).SingleOrDefaultAsync();
        }

        public async Task Add(Request requestToAdd)
        {
            await _context.Set<Request>().AddAsync(requestToAdd);
        }
        public async Task Update(Request requestToUpdate)
        {
            _context.Set<Request>().Attach(requestToUpdate);
            _context.Entry(requestToUpdate).State = EntityState.Modified;
        }

        public async Task Delete(Request requestToRemove)
        {
            _context.Set<Request>().Remove(requestToRemove);
        }

        private IQueryable<Request> ApplySpecification(Specification<Request> specification)
        {
            return SpecificationEvaluator.getQuery(_context.Set<Request>(), specification);
        }
    }
}
