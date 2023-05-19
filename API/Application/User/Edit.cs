using API.API.DTO;
using API.Application.Core;
using API.Domain;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Application.User
{
    public class Edit
    {
                public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; } // parameternya adlh activity
            public UserRequestDto User { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Id.ToString());

                if(user == null) return null;

                if(request.User.UserName != ""){
                    user.UserName = request.User.UserName;
                }
                if(request.User.Email != ""){ // bisa oleh user
                    user.Email = request.User.Email;
                }
                if(request.User.PhoneNumber != ""){ // bisa oleh user
                    user.PhoneNumber = request.User.PhoneNumber;
                }
                if(request.User.Bidang != ""){
                    user.Bidang = request.User.Bidang;
                }
                if(request.User.Role != ""){
                    user.Role = request.User.Role;
                }
                if(request.User.Password != ""){ // bisa oleh user
                    user.Password = request.User.Password;
                    user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, request.User.Password);
                }

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("failed to edit reservation");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}