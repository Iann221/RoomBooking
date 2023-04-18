using API.Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>> // inget command ga return apa2
        {
            public Guid Id { get; set; } // parameternya adlh activity
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var reservation = await _context.Reservations.FindAsync(request.Id);

                if(reservation == null) return null;

                _context.Remove(reservation);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("failed to delete reservation");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}