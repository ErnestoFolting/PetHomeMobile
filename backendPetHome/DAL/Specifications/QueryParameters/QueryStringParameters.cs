using backendPetHome.DAL.Enums;

namespace backendPetHome.DAL.Specifications.QueryParameters
{
    public class QueryStringParameters
    {
        const int maxPageSize = 36;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 9;
        public int priceFrom { get; set; } = 0;
        public int priceTo { get; set; } = int.MaxValue;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > maxPageSize ? maxPageSize : value;
            }
        }
        public AdvertStatusEnum? advertsStatus { get; set; } = AdvertStatusEnum.search;
        public bool isDatesFit { get; set; } = false;
    }
}
