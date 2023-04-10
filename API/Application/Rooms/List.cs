using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.API.DTO;
using API.Application.Core;
using API.Application.Reservations;
using API.Domain;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Application.Rooms
{
    public class List
    {
        public class Query : IRequest<Result<List<RoomDto>>>
        {
            public ReservationParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<RoomDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
            }

            public async Task<Result<List<RoomDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var startDate = request.Params.SelectedDate.Date;
                var rooms = await _context.Rooms
                .ProjectTo<RoomDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                foreach (var room in rooms){
                    if(!room.Reservations.Any(x => x.DateTime >= startDate && x.DateTime < startDate.AddDays(1))){
                        room.Reservations.Clear();
                    }
                }
                 

                return Result<List<RoomDto>>.Success(rooms);
            }
        }
    }
}