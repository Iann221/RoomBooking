using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.API.DTO;
using API.Application.Reservations;
using Application.Activities;
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
            if (param.EndReserveTime <= param.ReserveTime)
            { // cek apakah ada matching username
                ModelState.AddModelError("reserveTime","waktu end tidak bisa lebih kecil dari waktu start"); //(key, value)
                return ValidationProblem();
            }
            return HandleResult(await Mediator.Send(new Create.Command{Params = param}));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllReservations() 
        {
            return HandleResult(await Mediator.Send(new AllList.Query()));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditReservation(Guid id, ReserveRequestDto reservation){
            if (reservation.EndReserveTime <= reservation.ReserveTime)
            { // cek apakah ada matching username
                ModelState.AddModelError("time","waktu end tidak bisa lebih kecil dari waktu start"); //(key, value)
                return ValidationProblem();
            }
            return HandleResult(await Mediator.Send(new Edit.Command{Id = id, Reservation = reservation}));
        }
    }
}