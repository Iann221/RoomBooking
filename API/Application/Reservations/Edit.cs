using API.API.DTO;
using API.Application.Core;
using API.Domain;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; } // parameternya adlh activity
            public ReserveRequestDto Reservation { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var reservation = await _context.Reservations.FindAsync(request.Id);

                if(reservation == null) return null;
                reservation.ReserveTime = request.Reservation.ReserveTime;
                reservation.EndReserveTime = request.Reservation.EndReserveTime;
                reservation.Purpose = request.Reservation.Purpose;
                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("failed to edit reservation");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}