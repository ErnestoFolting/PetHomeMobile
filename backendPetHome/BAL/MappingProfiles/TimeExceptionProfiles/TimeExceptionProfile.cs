using AutoMapper;
using backendPetHome.BLL.DTOs.TimeExceptionDTOs;
using backendPetHome.DAL.Entities;

namespace backendPetHome.BLL.MappingProfiles.TimeExceptionProfiles
{
    public class TimeExceptionProfile : Profile
    {
        public TimeExceptionProfile()
        {
            CreateMap<TimeException, TimeExceptionDTO>();
            CreateMap<TimeExceptionDTO, TimeException>();
        }
    }
}
