using backendPetHome.DAL.Entities.Abstract;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Entities
{
    public class RefreshToken : BaseEntity
    {
        public static EntityState Modified { get; internal set; }
        public int id { get; set; }
        public string token { get; set; } = string.Empty;
        public DateTime created { get; set; } = DateTime.Now;
        public DateTime expires { get; set; } = DateTime.Now.AddDays(7);
        public string ownerId { get; set; }
        public User owner { get; set; }
        public bool isNotActual { get; set; } = false;
    }
}
