using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.API.DTO;
using API.Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Application.Reservations
{
    public class List
    {
         public class Query : IRequest<Result<List<ReservationDto>>> 
        {
            public ReservationParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ReservationDto>>> // nerima parameter <query, apa yg akan direturn>
        { // returns task of list of activity
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper) // tambah mapper agar bisa ubah activity jadi activityDto
            {
            _mapper = mapper;
            _context = context;
                
            }
            public async Task<Result<List<ReservationDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //query clean
                var comments = await _context.Reservations
                    .Where(d => d.ReserveTime >= request.Params.SelectedDate) // bwt filter, cm mau ambil date yg lebih dari hari ini
                    .Where(d => d.ReserveTime < request.Params.SelectedDate.AddDays(1))
                    .Where(d => d.Room.Id == Guid.Parse(request.Params.RoomId))
                    .OrderBy(d => d.ReserveTime)
                    .ProjectTo<ReservationDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ReservationDto>>.Success(comments);
            }
        }
    }
}