using FluentValidation;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.API.Validators.CommonValidators;

namespace backendPetHome.API.Validators.UserValidators
{
    public class UserRedoDTOValidator : AbstractValidator<UserRedoDTO>
    {
        public UserRedoDTOValidator()
        {
            RuleFor(u => u.surname).NotEmpty().MinimumLength(2);
            RuleFor(u => u.name).NotEmpty().MinimumLength(2);
            RuleFor(u => u.Email).NotEmpty().Must(e => e != null && e.IsValidEmail());
            RuleFor(u => u.PhoneNumber).NotEmpty().Must(p => p != null && p.IsValidPhoneNumber());
            RuleFor(a => a.location).NotEmpty();
            RuleFor(a => a.locationLat).NotEmpty().GreaterThanOrEqualTo(-90).LessThanOrEqualTo(90);
            RuleFor(a => a.locationLng).NotEmpty().GreaterThanOrEqualTo(-180).LessThanOrEqualTo(180);
        }
    }
}
