using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.API.DTO
{
    public class ReservationDto
    {
        public Guid Id { get; set; } 
        public Guid RoomId { get; set; } 
        public string RoomName { get; set; }
        public DateTime DateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string Username { get; set; }
        public string Purpose { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}