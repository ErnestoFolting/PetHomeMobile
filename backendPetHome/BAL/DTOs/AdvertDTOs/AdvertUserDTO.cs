using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;

namespace backendPetHome.BLL.DTOs.AdvertDTOs
{
    public class AdvertUserDTO
    {
        public int id { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AdvertStatusEnum status { get; set; }
        public string? photoFilePath { get; set; } = string.Empty;
        public UserDTO? owner { get; set; }
        public string? ownerId { get; set; }
        public string name { get; set; }
        public string description { get; set; } = string.Empty;
        public int cost { get; set; }
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public IEnumerable<RequestDTO> requests { get; set; }
        public bool ifHaveAppliedRequests { get; set; }
        public string? performerId { get; set; }
        public UserDTO? performer { get; set; }
    }
}
