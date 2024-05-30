using backendPetHome.BLL.DTOs.AdminDTOs;
using FluentValidation;
using backendPetHome.API.Validators.CommonValidators;


namespace backendPetHome.API.Validators.AdminValidators
{
    public class AdminAddDTOValidator : AbstractValidator<AdminAddDTO>
    {
        public AdminAddDTOValidator()
        {
            RuleFor(u => u.username).NotEmpty().MinimumLength(5);
            RuleFor(u => u.password).NotEmpty().Must(p => p != null && p.IsValidPassword());
        }
    }
}
