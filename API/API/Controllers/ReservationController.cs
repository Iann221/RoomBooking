using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.API.DTO;
using API.Application.Reservations;
using Microsoft.AspNetCore.Mvc;

namespace API.API.Controllers
{
    public class ReservationController : BaseAPIController
    {
        [HttpGet] //api/activities, ngesetnya dari nama classnya, klo namanya NaniController, rootnya api/nani
        public async Task<IActionResult> GetReservations([FromQuery]ReservationParams param) 
        {
            return HandleResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody]ReserveRequestDto param) 
        {
            return HandleResult(await Mediator.Send(new Create.Command{Params = param}));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllReservations() 
        {
            return HandleResult(await Mediator.Send(new AllList.Query()));
        }
    }
}