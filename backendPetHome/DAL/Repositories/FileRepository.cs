using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using Microsoft.AspNetCore.Http;

namespace backendPetHome.DAL.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly string _filePath;

        public FileRepository(string filePath)
        {
            _filePath = filePath;
        }
        public async Task Add(IFormFile fileToAdd)
        {
            var filePath = Path.Combine(_filePath, fileToAdd.FileName);
            using (var stream = File.Create(filePath))
            {
                await fileToAdd.CopyToAsync(stream);
            }
        }
    }
}
