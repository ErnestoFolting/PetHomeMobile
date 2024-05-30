using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.RequestSpecifications
{
    public class RequestCurrentAdvertNotCurrentSpecification : Specification<Request>
    {
        public RequestCurrentAdvertNotCurrentSpecification(Request requestToConfirm)
            : base(r => r.advertId == requestToConfirm.advertId && r.id !=requestToConfirm.id)
        {
        }
    }
}
