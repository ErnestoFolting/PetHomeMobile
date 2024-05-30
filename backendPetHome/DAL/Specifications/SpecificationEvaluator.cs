using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Specifications
{
    public static class SpecificationEvaluator
    {
        public static IQueryable<TEntity> getQuery<TEntity> (IQueryable<TEntity> inputQueryable, Specification<TEntity> specification) where TEntity : class
        {
            IQueryable<TEntity> quaryable = inputQueryable;

            if (specification.Criteria != null)
            {
                quaryable = quaryable.Where(specification.Criteria);
            }

            quaryable = specification.IncludeExpressions.Aggregate(quaryable, (current, includeExpression) =>
                current.Include(includeExpression));

            quaryable = specification.IncludeStrings.Aggregate(quaryable,
                                (current, include) => current.Include(include));

            if (specification.QueryParameters != null)
            {
                quaryable = quaryable.Skip((specification.QueryParameters.PageNumber - 1) * specification.QueryParameters.PageSize)
                   .Take(specification.QueryParameters.PageSize);
            }   
            return quaryable;
        }
    }
}
