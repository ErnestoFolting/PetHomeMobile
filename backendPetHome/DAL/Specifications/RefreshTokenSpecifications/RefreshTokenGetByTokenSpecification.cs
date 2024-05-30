using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.RefreshTokenSpecifications
{
    public class RefreshTokenGetByTokenSpecification : Specification<RefreshToken>
    {
        public RefreshTokenGetByTokenSpecification(string token)
            : base(r => r.token == token)
        {
        }
    }
}
