using backendPetHome.DAL.Entities.Abstract;
using System.ComponentModel.DataAnnotations;

namespace backendPetHome.DAL.Entities
{
    public class TimeException : BaseEntity
    {
        public int id { get; set; }
        public string userId { get; set; }
        public User user { get; set; }
        [Required]
        public DateTime date { get; set; }
    }
}
