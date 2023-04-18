using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.API.DTO
{
    public class ReserveRequestDto
    {
        public Guid Id { get; set; }
        public string RoomId { get; set; }
        public DateTime ReserveTime { get; set; }
        public DateTime EndReserveTime { get; set; }
        public string Purpose { get; set; }
    }
}