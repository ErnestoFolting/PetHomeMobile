using FluentValidation;
using backendPetHome.BLL.DTOs.UserDTOs;

namespace backendPetHome.API.Validators.UserValidators
{
    public class UserLoginDTOValidator : AbstractValidator<UserLoginDTO>
    {
        public UserLoginDTOValidator()
        {
            RuleFor(u => u.username).NotEmpty();
            RuleFor(u => u.password).NotEmpty();
        }
    }
}
