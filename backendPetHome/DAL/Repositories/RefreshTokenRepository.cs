using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DataContext _context;
        public RefreshTokenRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(RefreshToken tokenToAdd)
        {
            await _context.Set<RefreshToken>().AddAsync(tokenToAdd);
        }

        public Task<RefreshToken?> GetBySpecification(Specification<RefreshToken> spec)
        {
            return ApplySpecification(spec).SingleOrDefaultAsync();
        }
        public async Task Update(RefreshToken tokenToUpdate)
        {
            _context.Set<RefreshToken>().Attach(tokenToUpdate);
            _context.Entry(tokenToUpdate).State = EntityState.Modified;
        }
        private IQueryable<RefreshToken> ApplySpecification(Specification<RefreshToken> specification)
        {
            return SpecificationEvaluator.getQuery(_context.Set<RefreshToken>(), specification);
        }
    }
}
