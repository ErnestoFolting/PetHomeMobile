using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.AdvertSpecifications
{
    public class AdvertByIdIncludesRequestAndUserSpecification : Specification<Advert>
    {
        public AdvertByIdIncludesRequestAndUserSpecification(int id)
            : base(a => a.Id == id)
        {
            AddInclude(a => a.requests);
            AddInclude($"{nameof(Advert.requests)}.{nameof(Request.user)}");
        }
    }
}
