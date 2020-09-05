using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OurWedding.API.Dtos;
using OurWedding.API.Helpers;
using OurWedding.API.Models;

namespace OurWedding.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<Invite> _userManager;
        private readonly SignInManager<Invite> _signInManager;

        public AuthController(IConfiguration config, IMapper mapper, UserManager<Invite> userManager, SignInManager<Invite> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(InviteForLoginDto key)
        {
            var inviteFromRepo = await _userManager.FindByAccessKeyAsync(key.AccessKey);

            if (inviteFromRepo != null && !inviteFromRepo.IsBlacklisted)
            {
                var userToReturn = _mapper.Map<InviteHomeDto>(inviteFromRepo);

                return Ok(new
                {
                    token = GenerateJwtToken(inviteFromRepo),
                    user = userToReturn
                });
            }

            return Unauthorized();
        }

        private string GenerateJwtToken(Invite userFromRepo)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            foreach (var role in userFromRepo.UserRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Role.Name));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(2),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}