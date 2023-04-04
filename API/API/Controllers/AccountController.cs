using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.API.DTO;
using API.API.Services;
using API.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        { // tambahin tokenService klo mau pake token aja
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [AllowAnonymous] // tdk perlu menggunakan token
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await _userManager.FindByEmailAsync(loginDto.Email); // cari user berdasarkan email di db
            if (user == null) return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password); // return true/false si loginnya valid/ngga
            if(result){
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [AllowAnonymous] // tdk perlu menggunakan token
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            { // cek apakah ada matching username
                ModelState.AddModelError("username","username taken"); //(key, value)
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email","email taken"); //(key, value)
                return ValidationProblem();
            }

            string[] whitelist = {"widi@test.com"};
            if(!whitelist.Any(registerDto.Email.Contains)){
                ModelState.AddModelError("user","Anda tidak memiliki akses web ini, kontak pak iwan untuk dapat akses"); //(key, value)
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentuser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)); // kita punya object User 
            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}