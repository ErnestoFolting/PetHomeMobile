using AutoMapper;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.MappingProfiles.UserProfiles;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.UserSpecifications;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace backendPetHome.BLL.Tests.Tests
{
    public class UserServiceTests
    {
        private readonly UserService _sut;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UserServiceTests()
        {
            var myProfile = new UserProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            _mapper =  new Mapper(configuration);
            var storeMock = new Mock<IUserStore<User>>();
            var _userManager = new Mock<UserManager<User>>(
                storeMock.Object,
                null, null, null, null, null, null, null, null 
            );
            _sut = new UserService(_unitOfWorkMock.Object, _userManager.Object, _mapper);
        }
        [Fact]
        public async Task getCertainUser_UserExists_GetUser()
        {
            //arrange
            var userId = "6a00001b-0265-4a16-8cf2-d05b11b4f239";
            var user = new User
            {
                Id = userId,
                surname = "Смислов"
            };
            _unitOfWorkMock.Setup(x => x.UserRepository
                .GetByIdSpecification(It.IsAny<UserByIdWithTimeExceptionSpecification>()))
                 .ReturnsAsync(user);

            //act
            UserDTO userFromService = await _sut.getCertainUser(userId);

            UserDTO userMapped = _mapper.Map<UserDTO>(user);

            //assert
            userFromService.Should().BeEquivalentTo(userMapped);
        }
        [Fact]
        public async Task getCertainUser_UserNotExists_KeyNotFound()
        {
            //arrange
            _unitOfWorkMock.Setup(x => x.UserRepository
                .GetByIdSpecification(It.IsAny<UserByIdWithTimeExceptionSpecification>()))
                 .ReturnsAsync(() => null);

            //act
            Func<Task> act = () =>  _sut.getCertainUser("check");

            //assert
            await act.Should().ThrowAsync<KeyNotFoundException>();
        }
    }
}
