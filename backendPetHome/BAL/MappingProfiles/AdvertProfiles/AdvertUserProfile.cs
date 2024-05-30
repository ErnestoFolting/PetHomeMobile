using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.DAL.Entities;

namespace backendPetHome.BLL.MappingProfiles.AdvertProfiles
{
    public class AdvertUserProfile : Profile
    {
        public AdvertUserProfile()
        {
            CreateMap<Advert, AdvertUserDTO>()
                .ForMember(destination => destination.ifHaveAppliedRequests, opt => opt.MapFrom(source => source.requests.Any(el => el.status == DAL.Enums.RequestStatusEnum.applied)));
            CreateMap<AdvertUserDTO, Advert>();
        }
    }
}
