using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Rooms;
using API.Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.API.Controllers
{
    public class RoomsController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            // return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}