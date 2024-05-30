using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.AdvertSpecifications
{
    public class AdvertByIdWithOwnerSpecification : Specification<Advert>
    {
        public AdvertByIdWithOwnerSpecification(int id)
            : base(a=> a.Id == id)
        {
            AddInclude(a => a.owner);
        }
    }
}
