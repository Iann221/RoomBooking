using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.API.DTO;
using API.API.Services;
using API.Application.User;
using API.Domain;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseAPIController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IMapper mapper)
        { // tambahin tokenService klo mau pake token aja
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
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
            // if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            // { // cek apakah ada matching username
            //     ModelState.AddModelError("username","username taken"); //(key, value)
            //     return ValidationProblem();
            // }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email","email taken"); //(key, value)
                return ValidationProblem();
            }

            // string[] whitelist = {"widi@test.com"};
            // if(!whitelist.Any(registerDto.Email.Contains)){
            //     ModelState.AddModelError("user","Anda tidak memiliki akses web ini, kontak pak iwan untuk dapat akses"); //(key, value)
            //     return ValidationProblem();
            // }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                PhoneNumber = registerDto.PhoneNumber,
                Bidang = registerDto.Bidang,
                Role = registerDto.Role,
                Password = registerDto.Password
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid id, UserRequestDto param){
            if (await _userManager.Users.AnyAsync(x => x.Email == param.Email))
            {
                ModelState.AddModelError("email","email taken"); //(key, value)
                return ValidationProblem();
            }

            return HandleResult(await Mediator.Send(new Edit.Command{Id = id, User = param}));
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUser()
        {
            return HandleResult(await Mediator.Send(new AllList.Query()));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
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
                Id = Guid.Parse(user.Id),
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                Role = user.Role,
                Email = user.Email
            };
        }
    }
}