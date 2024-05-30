using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.RequestSpecifications
{
    public class RequestByIdWithAdvertSpecification:Specification<Request>
    {
        public RequestByIdWithAdvertSpecification(int id)
            :base(r => r.id == id)
        {
            AddInclude(r => r.advert);
        }
    }
}
