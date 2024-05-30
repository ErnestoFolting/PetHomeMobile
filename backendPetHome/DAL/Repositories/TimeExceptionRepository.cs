using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class TimeExceptionRepository: ITimeExceptionRepository
    {
        private readonly DataContext _context;
        public TimeExceptionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task Add(TimeException timeExceptionToAdd)
        {
            await _context.Set<TimeException>().AddAsync(timeExceptionToAdd);
        }

        public async Task Delete(TimeException timeExceptionToDelete)
        {
            _context.Set<TimeException>().Remove(timeExceptionToDelete);
        }

        public Task<List<TimeException>> GetBySpecification(Specification<TimeException> spec)
        {
            return ApplySpecification(spec).ToListAsync();
        }

        private IQueryable<TimeException> ApplySpecification(Specification<TimeException> specification)
        {
            return SpecificationEvaluator.getQuery(_context.Set<TimeException>(), specification);
        }
    }
}
