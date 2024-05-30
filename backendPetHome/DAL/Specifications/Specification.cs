using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications.QueryParameters;
using System.Linq.Expressions;

namespace backendPetHome.DAL.Specifications
{
    public abstract class Specification<TEntity> where TEntity : class
    {
        protected Specification(Expression<Func<TEntity, bool>> criteria)
        {
            Criteria = criteria;
        }
        public QueryStringParameters? QueryParameters;
        public string userId{ get; private set; }
        public Expression<Func<TEntity, bool>>? Criteria { get; }
        public List<Expression<Func<TEntity, object>>> IncludeExpressions { get; } = new();
        protected void AddInclude(Expression<Func<TEntity, object>> includeExpression)
        {
            IncludeExpressions.Add(includeExpression);
        }
        public List<string> IncludeStrings { get; } = new List<string>();
        protected virtual void AddInclude(string includeString)
        {
            IncludeStrings.Add(includeString);
        }
        protected void AddPagination(QueryStringParameters parameters)
        {
            QueryParameters = parameters;
        }
        public void RemovePagination()
        {
            QueryParameters = null;
        }
        protected virtual void AddFitDatesCriteria(string userId)
        {
            this.userId = userId;
        }
    }
}
