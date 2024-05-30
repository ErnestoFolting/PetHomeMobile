using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.RequestSpecifications
{
    public class RequestCurrentUserSpecification : Specification<Request>
    {
        public RequestCurrentUserSpecification(string id)
            : base(r => r.userId == id)
        {
            AddInclude(r => r.advert);
        }
    }
}
