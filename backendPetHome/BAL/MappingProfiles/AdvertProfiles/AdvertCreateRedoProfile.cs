using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.DAL.Entities;

namespace backendPetHome.BLL.MappingProfiles.AdvertProfiles
{
    public class AdvertCreateRedoProfile : Profile
    {
        public AdvertCreateRedoProfile()
        {
            CreateMap<Advert, AdvertCreateRedoDTO>();
            CreateMap<AdvertCreateRedoDTO, Advert>();
        }
    }
}
