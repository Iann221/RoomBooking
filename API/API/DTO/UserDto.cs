using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.API.DTO
{
    public class UserDto
    {
        public Guid Id {get; set;} 
        public string Token { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }

    }
}