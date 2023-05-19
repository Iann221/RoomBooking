using Microsoft.AspNetCore.Identity;

namespace API.Domain
{
    public class AppUser : IdentityUser
    {
        public string Role { get; set; }
        public string Bidang { get; set; }
        public string Password { get; set; }
    }
}