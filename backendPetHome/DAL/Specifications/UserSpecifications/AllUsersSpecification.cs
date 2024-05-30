using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.UserSpecifications
{
    public class AllUsersSpecification : Specification<User>
    {
        public AllUsersSpecification(string id)
            : base(u => u.Id != id && u.name.Length > 0)
        {
        }
    }
}
