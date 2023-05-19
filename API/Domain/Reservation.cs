using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public DateTime ReserveTime { get; set; }
        public DateTime EndReserveTime { get; set; }
        public string Reservee { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Room Room { get; set; }
        public string Purpose { get; set; }
    }
}