using backendPetHome.DAL.Entities.Abstract;
using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;

namespace backendPetHome.DAL.Entities
{
    public class Advert : BaseEntity
    {
        public int Id { get; set; }
        public string name { get; set; } = string.Empty;
        public int cost { get; set; }
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public string description { get; set; } = string.Empty;
        public string photoFilePath { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AdvertStatusEnum status { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public string ownerId { get; set; } = string.Empty;
        public User owner { get; set; }
        public string? performerId { get; set; }
        public User? performer { get; set; }
        public List<Request>? requests { get; set; }

    }
}
