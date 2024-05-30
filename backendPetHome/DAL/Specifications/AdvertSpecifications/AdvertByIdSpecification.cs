using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.AdvertSpecifications
{
    public class AdvertByIdSpecification : Specification<Advert>
    {
        public AdvertByIdSpecification(int id)
            : base(a => a.Id == id)
        {
        }
    }
}
