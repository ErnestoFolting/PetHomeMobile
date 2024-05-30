using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.UserSpecifications
{
    public class UserByIdWithTimeExceptionSpecification : Specification<User>
    {
        public UserByIdWithTimeExceptionSpecification(string id)
            : base(u => u.Id == id)
        {
            AddInclude(u => u.timeExceptions);
        }
    }
}
