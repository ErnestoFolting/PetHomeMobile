using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.MappingProfiles.AdvertProfiles;
using backendPetHome.BLL.Services;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.QueryParameters;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace backendPetHome.BLL.Tests.Tests
{
    public class AdvertServiceTests
    {
        private readonly AdvertService _sut;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock = new ();
        private readonly Mock<IRequestService> _requestServiceMock = new();
        private readonly IMapper _mapper;
        private Advert _advertToTest = new();
        public AdvertServiceTests()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AdvertProfile());
                cfg.AddProfile(new AdvertCreateRedoProfile());
            });
            _mapper = new Mapper(configuration);
            _sut = new AdvertService(_unitOfWorkMock.Object, _requestServiceMock.Object, _mapper);
            initialSeed();
        }
        [Fact]
        public async Task getAdverts_AdvertWithSpecificationExists_GotAdverts()
        {
            //arrange
            List<Advert> adverts = new List<Advert>()
            {
                _advertToTest,
                _advertToTest
            };
            _unitOfWorkMock.Setup(x =>
                x.AdvertRepository
                .GetBySpecificationAndPaging(It.IsAny<AdvertWithParamsAndPaginationSpecification>()))
                .ReturnsAsync((adverts, adverts.Count));

            //act
            var advertsAndCount = await _sut.getAdverts(new QueryStringParameters(), default);
            List<AdvertDTO> advertsDTOs = _mapper.Map<List<AdvertDTO>>(advertsAndCount.fitAdvertsDTO);

            //assert
            advertsAndCount.fitAdvertsDTO.Should().BeEquivalentTo(advertsDTOs);
            advertsAndCount.totalCount.Should().Be(adverts.Count);
        }
        [Fact]
        public async Task getAdvertById_AdvertExists_GotAdvert()
        {
            //arrange
            Advert advert = _advertToTest;
            _unitOfWorkMock.Setup(x =>
                x.AdvertRepository
                .GetByIdSpecification(It.IsAny<AdvertByIdWithOwnerSpecification>()))
                .ReturnsAsync(_advertToTest);

            //act
            AdvertDTO advertFromService = await _sut.getAdvertById(advert.Id);
            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(advert);

            //assert
            advertFromService.Should().BeEquivalentTo(advertDTO);
        }
        [Fact]
        public async Task getAdvertById_AdvertNotExists_ArgumentNullExceptionThrown()
        {
            //arrange
            _unitOfWorkMock.Setup(x =>
                x.AdvertRepository
                .GetByIdSpecification(It.IsAny<AdvertByIdWithOwnerSpecification>()))
                .ReturnsAsync(() => null);

            //act
            Func<Task> act = () => _sut.getAdvertById(1);

            //assert
            await act.Should().ThrowAsync<KeyNotFoundException>();
        }
        [Fact]
        public async Task addAdvert_CorrectData_AdvertAdded()
        {
            //arrange
            Advert advert = _advertToTest;
            var bytes = Encoding.UTF8.GetBytes("This is a dummy file");
            IFormFile file = new FormFile(new MemoryStream(bytes), 0, bytes.Length, "Data", "hairy.jpeg");
            IEnumerable<string> possiblePerformersIds = new List<string>() { "userId1", "userId2"};
            int countPossiblePeformers = 2;

            _unitOfWorkMock.Setup(x =>x.AdvertRepository.Add(advert));
            _unitOfWorkMock.Setup(x =>x.FileRepository.Add(file));
            _unitOfWorkMock.Setup(x =>x.UserRepository.SelectPossiblePerformers(It.IsAny<Advert>(), advert.ownerId)).ReturnsAsync(possiblePerformersIds);
            _requestServiceMock.Setup(x => x.addRequest(It.IsAny<string>(), advert.Id, DAL.Enums.RequestStatusEnum.generated));

            //act
            AdvertCreateRedoDTO advertCreateDTO = _mapper.Map<AdvertCreateRedoDTO>(advert);
            var possiblePerformersIdsAndAdvert  = await _sut.addAdvert(advertCreateDTO, advert.ownerId, file);
            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(advert);

            //assert
            _unitOfWorkMock.Verify(x => x.AdvertRepository.Add(It.IsAny<Advert>()), Times.Exactly(1));
            _unitOfWorkMock.Verify(x => x.FileRepository.Add(file), Times.Exactly(1));
            _requestServiceMock.Verify(x => x.addRequest(It.IsAny<string>(), advert.Id, DAL.Enums.RequestStatusEnum.generated), Times.Exactly(countPossiblePeformers));
            possiblePerformersIdsAndAdvert.possiblePerformersIds.Should().BeEquivalentTo(possiblePerformersIds);
            possiblePerformersIdsAndAdvert.advertDTO.Should().BeEquivalentTo(advertDTO);
        }
        [Fact]
        public async Task markAsFinished_AdvertExists_AdvertFinished()
        {
            //arrange
            Advert advertToFinish = _advertToTest;
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(advertToFinish);
            _unitOfWorkMock.Setup(x => x.AdvertRepository.Update(advertToFinish));
            //act
            await _sut.MarkAsFinished(advertToFinish.Id, advertToFinish.ownerId);

            //assert
            _unitOfWorkMock.Verify(x => x.AdvertRepository.Update(advertToFinish), Times.Exactly(1));

        }
        [Fact]
        public async Task markAsFinished_AdvertNotExists_ArgumentNullExceptionThrown()
        {
            //arrange
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(()=>null);

            //act
            Func<Task> act = () => _sut.MarkAsFinished(1,"check");

            //assert
            await act.Should().ThrowAsync<KeyNotFoundException>();

        }
        [Fact]
        public async Task markAsFinished_UserIsNotOwner_ArgumentExceptionTrown()
        {
            //arrange
            Advert advertToFinish = _advertToTest;
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(advertToFinish);

            //act
            Func<Task> act = () => _sut.MarkAsFinished(advertToFinish.Id, "check");

            //assert
            await act.Should().ThrowAsync<ArgumentException>();

        }
        [Fact]
        public async Task delete_AdvertExists_AdvertDeleted()
        {
            //arrange
            Advert advertToDelete = _advertToTest;
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdIncludesRequestAndUserSpecification>())).ReturnsAsync(advertToDelete);
            _unitOfWorkMock.Setup(x => x.AdvertRepository.Delete(advertToDelete));
            //act
            await _sut.deleteAdvert(advertToDelete.Id, advertToDelete.ownerId);

            //assert
            _unitOfWorkMock.Verify(x => x.AdvertRepository.Delete(advertToDelete), Times.Exactly(1));

        }
        [Fact]
        public async Task delete_AdvertNotExists_ArgumentNullExceptionThrown()
        {
            //arrange
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(() => null);

            //act
            Func<Task> act = () => _sut.deleteAdvert(1, "check");

            //assert
            await act.Should().ThrowAsync<KeyNotFoundException>();

        }
        [Fact]
        public async Task delete_UserIsNotOwner_ArgumentExceptionTrown()
        {
            //arrange
            Advert advertToDelete = _advertToTest;
            _unitOfWorkMock.Setup(x => x.AdvertRepository.GetByIdSpecification(It.IsAny<AdvertByIdSpecification>())).ReturnsAsync(advertToDelete);

            //act
            Func<Task> act = () => _sut.deleteAdvert(advertToDelete.Id, "check");

            //assert
            await act.Should().ThrowAsync<KeyNotFoundException>();

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
                ownerId = "6a00001b-0265-4a16-8cf2-d05b11b4f239",
                requests =new List<Request>(),
            };
        }
    }
}
