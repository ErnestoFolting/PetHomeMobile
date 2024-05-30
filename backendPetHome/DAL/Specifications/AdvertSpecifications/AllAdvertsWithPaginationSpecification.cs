using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications.QueryParameters;

namespace backendPetHome.DAL.Specifications.AdvertSpecifications
{
    public class AllAdvertsWithPaginationSpecification : Specification<Advert>
    {
        public AllAdvertsWithPaginationSpecification(QueryStringParameters parameters)
            : base(el => el.Id >= 0)
        {
            AddPagination(parameters);
        }
    }
}
