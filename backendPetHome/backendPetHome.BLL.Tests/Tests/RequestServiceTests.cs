using AutoMapper;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.MappingProfiles.AdvertProfiles;
using backendPetHome.BLL.MappingProfiles.RequestProfiles;
using backendPetHome.BLL.MappingProfiles.UserProfiles;
using backendPetHome.BLL.Services;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.RequestSpecifications;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace backendPetHome.BLL.Tests.Tests
{
    public class RequestServiceTests
    {
        private readonly RequestService _sut;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
        private readonly Mock<ITimeExceptionService> _timeExceptionServiceMock = new();
        private readonly IMapper _mapper;
        private Advert _advertToTest = new();
        private Request _requestToTest = new();
        private Request _requestToTestWithAdvertAndUser = new();
        private User _userToTest = new();
        public RequestServiceTests()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new RequestProfile());
                cfg.AddProfile(new UserProfile());
                cfg.AddProfile(new AdvertProfile());
            });
            _mapper = new Mapper(configuration);
            _sut = new RequestService(_unitOfWorkMock.Object, _mapper, _timeExceptionServiceMock.Object);
            initialSeed();
        }
        [Fact]
        public async Task addRequest_ValidData_RequestAdded()
        {
            //arrange 
            Advert advert = _advertToTest;
            Request request = _requestToTest;
            string applierId = "check";
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(advert);
            _timeExceptionServiceMock.Setup(x => x.checkPerformerDates(applierId, advert.startTime, advert.endTime)).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.RequestRepository.Add(request));
            _unitOfWorkMock.Setup(x => x.RequestRepository.GetByIdSpecification(It.IsAny<RequestByIdWithAdvertAndUserSpecification>()))
                .ReturnsAsync(_requestToTestWithAdvertAndUser);

            //act
            RequestDTO requestDTOFromService = await _sut.addRequest(applierId,advert.Id,_requestToTest.status);
            RequestDTO requestDTO = _mapper.Map<RequestDTO>(_requestToTestWithAdvertAndUser);

            //assert
            requestDTOFromService.Should().BeEquivalentTo(requestDTO);
        }
        [Fact]
        public async Task addRequest_AdvertNoFound_KeyNoFoundExceptionThrown()
        {
            //arrange 
            Advert advert = _advertToTest;
            string applierId = "check";
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(() => null);

            //act
            Func<Task> act = () => _sut.addRequest(applierId,advert.Id,_requestToTest.status);

            //assert
            await act.Should().ThrowAsync<KeyNotFoundException>().WithMessage("Advert not found");
        }
        [Fact]
        public async Task addRequest_UserIsOwnerOfTheAdvert_ArgumentExceptionThrown()
        {
            //arrange 
            Advert advert = _advertToTest;
            string applierId = "check";
            advert.ownerId = applierId;
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(advert);

            //act
            Func<Task> act = () => _sut.addRequest(applierId, advert.Id, _requestToTest.status);

            //assert
            await act.Should().ThrowAsync<ArgumentException>().WithMessage("You can not send a request on your own advert.");
        }
        [Fact]
        public async Task addRequest_UserHaveNotFitdates_ArgumentExceptionThrown()
        {
            //arrange 
            Advert advert = _advertToTest;
            string applierId = "check";
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(advert);
            _timeExceptionServiceMock.Setup(x => x.checkPerformerDates(applierId, advert.startTime, advert.endTime)).ReturnsAsync(false);

            //act
            Func<Task> act = () => _sut.addRequest(applierId, advert.Id, _requestToTest.status);

            //assert
            await act.Should().ThrowAsync<ArgumentException>().WithMessage("You can not perform at that dates. Remove the time exceptions and try again.");
        }
        private void initialSeed()
        {
            _advertToTest = new Advert()
            {
                Id = 0,
                name = "testAdvert",
                cost = 100,
                location = "Київ, Україна",
                locationLat = 50.450001,
                locationLng = 30.523333,
                description = "Волохатий пес.",
                photoFilePath = "/images/hairy.jpeg",
                status = DAL.Enums.AdvertStatusEnum.search,
                startTime = System.DateTime.Now,
                endTime = System.DateTime.Now.AddDays(3),
                ownerId = "6a00001b-0265-4a16-8cf2-d05b11b4f239"
            };
            _requestToTest = new Request()
            {
                userId = "check",
                advertId = 0,
                status = DAL.Enums.RequestStatusEnum.applied
            };
            _requestToTestWithAdvertAndUser = _requestToTest;
            _requestToTestWithAdvertAndUser.advert = _advertToTest;
            _requestToTestWithAdvertAndUser.user = _userToTest;
            
            _userToTest = new User()
            {
                name = "check",
                Id = "check"
            };
        }
    }
}
