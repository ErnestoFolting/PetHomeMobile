using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Delete(User useToDelete)
        {
            var userRequests = _context.Set<Request>().Where(r => r.userId == useToDelete.Id).ToList();
            _context.Set<Request>().RemoveRange(userRequests);
            _context.Set<User>().Remove(useToDelete);
            await _context.SaveChangesAsync();
        }
        public Task<User?> GetByIdSpecification(Specification<User> spec)
        {
            return ApplySpecification(spec).SingleOrDefaultAsync();
        }

        public Task<List<User>>? GetUsersSpecification(Specification<User> spec)
        {
            return ApplySpecification(spec).ToListAsync();
        }

        public async Task<IEnumerable<string>> SelectPossiblePerformers(Advert advert, string ownerId)
        {
            IEnumerable<string> possiblePerformersIds = await
                _context.selectPossiblePerformers(advert.startTime, advert.endTime, advert.locationLng, advert.locationLat, ownerId).Select(el=>el.Id).ToListAsync();
            return possiblePerformersIds;
        }

        public async Task Update(User userToUpdate)
        {
            _context.Set<User>().Attach(userToUpdate);
            _context.Entry(userToUpdate).State = EntityState.Modified;
        }

        private IQueryable<User> ApplySpecification(Specification<User> specification)
        {
            return SpecificationEvaluator.getQuery(_context.Set<User>(), specification);
        }
    }
}
