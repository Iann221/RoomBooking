using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Room
    {
        public Guid Id {get; set;}
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}