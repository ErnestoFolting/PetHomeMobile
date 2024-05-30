using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications.QueryParameters;

namespace backendPetHome.DAL.Specifications.AdvertSpecifications
{
    public class AdvertWithParamsAndPaginationSpecification : Specification<Advert>
    {
        public AdvertWithParamsAndPaginationSpecification(string userId, QueryStringParameters parameters)
            : base(el => el.cost >= parameters.priceFrom && el.cost <= parameters.priceTo
            && el.status == parameters.advertsStatus )
        {
            AddPagination(parameters);
            if (parameters.isDatesFit)
            {
                AddFitDatesCriteria(userId);

            }
        }
    }
}
