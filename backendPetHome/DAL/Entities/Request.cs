using backendPetHome.DAL.Entities.Abstract;
using backendPetHome.DAL.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace backendPetHome.DAL.Entities
{
    public class Request : BaseEntity
    {
        public int id { get; set; }
        public string userId { get; set; }
        public User user { get; set; }
        public int advertId { get; set; }
        public Advert advert { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public RequestStatusEnum status { get; set; }

    }
}
