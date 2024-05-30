using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.RequestSpecifications
{
    public class RequestByIdWithAdvertAndUserSpecification : Specification<Request>
    {
        public RequestByIdWithAdvertAndUserSpecification(int id)
            : base(r => r.id == id)
        {
            AddInclude(r => r.advert);
            AddInclude(r => r.user);
        }
    }
}
