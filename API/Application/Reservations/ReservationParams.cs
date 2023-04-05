using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Reservations
{
    public class ReservationParams
    {
        public string RoomId { get; set; }
        public DateTime SelectedDate { get; set; }
    }
}