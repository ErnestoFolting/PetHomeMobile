using Microsoft.AspNetCore.Http;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IFileRepository
    {
        Task Add(IFormFile fileToADd);
    }
}
