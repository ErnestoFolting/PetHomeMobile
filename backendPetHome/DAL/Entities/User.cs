using backendPetHome.DAL.Enums;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace backendPetHome.DAL.Entities
{
    public class User : IdentityUser
    {
        public string surname { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SexEnum sex { get; set; } = SexEnum.male;
        public string photoFilePath { get; set; } = string.Empty;
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public ICollection<Advert> postedAdverts { get; set; }
        public ICollection<Advert> performAtAdverts { get; set; }
        public ICollection<Request> requests { get; set; }
        public ICollection<TimeException> timeExceptions { get; set; }
        public ICollection<RefreshToken> refreshTokens { get; set; }
    }
}
