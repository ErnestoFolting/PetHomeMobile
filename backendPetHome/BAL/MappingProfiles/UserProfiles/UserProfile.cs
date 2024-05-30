using AutoMapper;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Entities;

namespace backendPetHome.BLL.MappingProfiles.UserProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(destination => destination.ifHaveRequests, opt => opt.MapFrom(source => source.requests.Any()));
            CreateMap<UserDTO, User>();
        }
    }
}
