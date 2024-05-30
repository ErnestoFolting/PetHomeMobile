using backendPetHome.BLL.DTOs.UserDTOs;
using AutoMapper;
using backendPetHome.DAL.Entities;

namespace backendPetHome.BLL.MappingProfiles.UserProfiles
{
    public class UserRegisterProfile:Profile
    {
        public UserRegisterProfile()
        {
            CreateMap<UserRegisterDTO, User>();
        }
    }
}
