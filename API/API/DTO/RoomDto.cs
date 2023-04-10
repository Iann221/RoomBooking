using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.API.DTO
{
    public class RoomDto
    {
        public Guid Id {get; set;}
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<ReservationDto> Reservations { get; set; }
    }
}