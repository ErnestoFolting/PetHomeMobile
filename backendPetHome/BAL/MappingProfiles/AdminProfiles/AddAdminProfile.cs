using AutoMapper;
using backendPetHome.BLL.DTOs.AdminDTOs;
using backendPetHome.DAL.Entities;
namespace backendPetHome.BLL.MappingProfiles.AdminProfiles
{


    namespace backendPetHome.BLL.MappingProfiles.UserProfiles
    {
        public class AddAdminProfile : Profile
        {
            public AddAdminProfile()
            {
                CreateMap<AdminAddDTO, User>();
            }
        }
    }

}
