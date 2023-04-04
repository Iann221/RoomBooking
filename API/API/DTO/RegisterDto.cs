using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.API.DTO
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "password must be complex")] 
        // rule2 si passwordnya \\d: slh satu hrs nomor. {4,8} hrs antara 4 dan 8 karakter
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}