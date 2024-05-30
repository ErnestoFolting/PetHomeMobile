using System.Text.RegularExpressions;

namespace backendPetHome.API.Validators.CommonValidators
{
    public static class ValidationCommon
    {
        const string emailPattern = @"^([a-zA-z0-9]+([._\-][a-zA-z0-9]+)?)+@([a-zA-z0-9]+([.\-][a-zA-Z0-9]+)?)+\.[a-zA-Z]{2,4}$";
        const string phoneNumberPattern = @"^(\+38\d{10}|\d{10})$";
        const string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$";
        public static bool IsValidEmail(this string value)
        {
            return Regex.IsMatch(value, emailPattern);
        }
        public static bool IsValidPhoneNumber(this string value)
        {
            return Regex.IsMatch(value, phoneNumberPattern);
        }
        public static bool IsValidPassword(this string value)
        {
            return Regex.IsMatch(value, passwordPattern);
        }
    }
}
