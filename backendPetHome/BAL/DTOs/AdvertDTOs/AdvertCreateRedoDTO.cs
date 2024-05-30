    namespace backendPetHome.BLL.DTOs.AdvertDTOs
{
    public class AdvertCreateRedoDTO
    {
        public string name { get; set; }
        public string description { get; set; } = string.Empty;
        public int cost { get; set; }
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
    }
}
