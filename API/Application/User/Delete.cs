using API.Application.Core;
using MediatR;
using Persistence;

namespace API.Application.User
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
                var user = await _context.Users.FindAsync(request.Id.ToString());

                if(user == null) return null;

                _context.Remove(user);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("failed to delete user");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}