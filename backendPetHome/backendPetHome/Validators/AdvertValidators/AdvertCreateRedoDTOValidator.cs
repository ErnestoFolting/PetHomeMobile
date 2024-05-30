using backendPetHome.BLL.DTOs.AdvertDTOs;
using FluentValidation;

namespace backendPetHome.API.Validators.AdvertValidators
{
    public class AdvertCreateRedoDTOValidator : AbstractValidator<AdvertCreateRedoDTO>
    {
        public AdvertCreateRedoDTOValidator()
        {
            RuleFor(a => a.name).NotEmpty().MinimumLength(5);
            RuleFor(a => a.description).NotEmpty().MinimumLength(10).MaximumLength(500);
            RuleFor(a => a.cost).NotEmpty().GreaterThan(0);
            RuleFor(a => a.location).NotEmpty();
            RuleFor(a => a.locationLat).NotEmpty().GreaterThanOrEqualTo(-90).LessThanOrEqualTo(90);
            RuleFor(a => a.locationLng).NotEmpty().GreaterThanOrEqualTo(-180).LessThanOrEqualTo(180);
            RuleFor(a => a.startTime).NotEmpty().Must((d, t) => d.startTime <= d.endTime).WithMessage("Дата початку має бути раніше за дату закінчення оголошення.");
            RuleFor(a => a.endTime).NotEmpty();
        }
    }
}
