using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.TimeExceptionSpecifications
{
    public class TimeExceptionCurrentUserFitAdvertTimeSpecification : Specification<TimeException>
    {
        public TimeExceptionCurrentUserFitAdvertTimeSpecification(string userId, DateTime advertStart, DateTime advertEnd)
            : base(t => t.userId == userId && t.date >= advertStart && t.date <= advertEnd)
        {
        }
    }
}
