using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications.QueryParameters;

namespace backendPetHome.DAL.Specifications.AdvertSpecifications
{
    public class AdvertCurrentUserWithParamsAndPaginationIncludesRequestSpecification : Specification<Advert>
    {
        public AdvertCurrentUserWithParamsAndPaginationIncludesRequestSpecification(string ownerId ,QueryStringParameters parameters)
            : base(el => el.ownerId == ownerId && el.cost >= parameters.priceFrom && el.cost <= parameters.priceTo
            && el.status == parameters.advertsStatus)
        {
            AddInclude(el => el.requests);
            AddPagination(parameters);
        }
    }
}
