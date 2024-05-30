using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.BLL.DTOs.TimeExceptionDTOs
{
    public class TimeExceptionDTO
    {
        public int id { get; set; }
        public string userId { get; set; }
        public DateTime date { get; set; }
    }
}
