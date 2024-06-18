using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.UserSpecifications
{
    public class UserByIdWithPerformAtAdvertsSpecification : Specification<User>
    {
        public UserByIdWithPerformAtAdvertsSpecification(string id)
            : base(u => u.Id == id)
        {
            AddInclude(u => u.performAtAdverts);
        }
    }
}
