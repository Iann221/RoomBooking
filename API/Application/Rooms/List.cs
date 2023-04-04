using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Application.Rooms
{
    public class List
    {
        public class Query : IRequest<List<Room>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Room>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<List<Room>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Rooms.ToListAsync();
            }
        }
    }
}