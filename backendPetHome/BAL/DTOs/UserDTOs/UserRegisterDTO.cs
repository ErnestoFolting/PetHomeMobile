using backendPetHome.DAL.Enums;

namespace backendPetHome.BLL.DTOs.UserDTOs
{
    public class UserRegisterDTO : UserRedoDTO
    {
        public string UserName { get; set; } = "mock";
        public string password { get; set; } = "Password123!";
        public SexEnum sex { get; set; }
    }
}
