using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.UserSpecifications
{
    public class UserByIdSpecification : Specification<User>
    {
        public UserByIdSpecification(string id)
            : base(u => u.Id == id)
        {
        }
    }
}
