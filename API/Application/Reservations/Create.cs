using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.API.DTO;
using API.Application.Core;
using API.Domain;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Application.Reservations
{
    public class Create
    {
        public class Command : IRequest<Result<ReservationDto>>
        {
            public ReserveRequestDto Params { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<ReservationDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;
            }

            public async Task<Result<ReservationDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var room = await _context.Rooms.FindAsync(request.Params.RoomId);
                if(room == null) return null;
                var reservation = new Reservation
                {
                    ReserveTime = request.Params.ReserveTime,
                    Reservee = _userAccessor.GetUsername(),
                    Room = room,
                    Purpose = request.Params.Purpose,
                };

                room.Reservations.Add(reservation);
                var success = await _context.SaveChangesAsync() > 0; // id baru kegenerate secara otomatis klo disave ke db, walau idnya int
                if (success) return Result<ReservationDto>.Success(_mapper.Map<ReservationDto>(reservation));
                return Result<ReservationDto>.Failure("Failed to add comment");
            }
        }
    }
}