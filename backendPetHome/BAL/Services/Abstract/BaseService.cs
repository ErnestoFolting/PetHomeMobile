using AutoMapper;
using backendPetHome.DAL.Interfaces;

namespace backendPetHome.BLL.Services.Abstract
{
    public class BaseService
    {
        private protected readonly IUnitOfWork _unitOfWork;
        private protected readonly IMapper _mapper;
        public BaseService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
    }
}
