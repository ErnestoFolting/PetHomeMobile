using backendPetHome.BLL.DTOs.TimeExceptionDTOs;
using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;

namespace backendPetHome.BLL.DTOs.UserDTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SexEnum sex { get; set; }
        public string photoFilePath { get; set; } = string.Empty;
        public string location { get; set; } = string.Empty;

        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public bool ifHaveRequests { get; set; } = true;
        public IEnumerable<TimeExceptionDTO> timeExceptions { get; set; }
    }
}
