using AutoMapper;
using backendPetHome.BLL.DTOs.AdminDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.UserSpecifications;
using Microsoft.AspNetCore.Identity;

namespace backendPetHome.BLL.Services
{
    public class UserService: BaseService
    {
        private readonly UserManager<User> _userManager;

        public UserService(IUnitOfWork unitOfWork,UserManager<User> userManager, IMapper mapper):base(unitOfWork, mapper)
        {
            _userManager = userManager;
        }
        public async Task<UserDTO> getCertainUser(string id)
        {
            User? user = await _unitOfWork.UserRepository.GetByIdSpecification(new UserByIdWithTimeExceptionSpecification(id));
            if (user == null) throw new KeyNotFoundException("User not found.");

            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
        public async Task<List<UserDTO>> getUsers(string adminId)
        {
            List<User>? users = await _unitOfWork.UserRepository.GetUsersSpecification(new AllUsersSpecification(adminId));
            if (users == null) throw new KeyNotFoundException("Users not found.");

            List<UserDTO> userDTOs = _mapper.Map<List<UserDTO>>(users);
            return userDTOs;
        }
        public async Task addAdmin(AdminAddDTO data)
        {
            var userExisted = await _userManager.FindByNameAsync(data.username);
            if (userExisted != null)
            {
                throw new ArgumentException("The user with that userName already existing.");
            }
            User newUser = _mapper.Map<User>(data);

            var result = await _userManager.CreateAsync(newUser, data.password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "Administrator");
            }
            else
            {
                throw new InvalidOperationException("Can not add a new user.");
            }
        }
        public async Task<int> deleteUserProfile(string userId)
        {
            var userInDb = await _unitOfWork.UserRepository.GetByIdSpecification(new UserByIdSpecification(userId));
            if (userInDb == null) throw new KeyNotFoundException("User does not exist.");

            await _unitOfWork.UserRepository.Delete(userInDb);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}
