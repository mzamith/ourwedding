using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OurWedding.API.Data;
using OurWedding.API.Dtos;
using OurWedding.API.Helpers;
using OurWedding.API.Models;
using OurWedding.API.Services;

namespace OurWedding.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "RequireAdminRole")]
    public class AdminController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IWeddingRepository _repo;
        private readonly UserManager<Invite> _userManager;

        public AdminController(IWeddingRepository repo, UserManager<Invite> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("invites")]
        public async Task<IActionResult> GetAllInvites([FromQuery] InviteParams inviteParams)
        {
            var invites = await _repo.GetInvites(inviteParams);
            var invitesToReturn = _mapper.Map<IEnumerable<InviteDetailsMultipleDto>>(invites);

            Response.AddPagination(invites.CurrentPage, invites.PageSize, invites.TotalCount, invites.TotalPages);
            return Ok(invitesToReturn);
        }

        [HttpPut("blacklist/{id}")]
        public async Task<IActionResult> BlacklistInvite(int id, bool blacklist = true)
        {
            var inviteFromRepo = await _repo.GetInviteDetails(id);
            inviteFromRepo.IsBlacklisted = blacklist;

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Failed to Blacklist User");
        }

        [HttpPost("invites")]
        public async Task<IActionResult> SeedInvites(ICollection<Invite> invites)
        {
            foreach (var invite in invites)
            {
                await _userManager.CreateAsync(invite);
                await _userManager.AddToRoleAsync(invite, "Guest");
            }

            return NoContent();
        }

        [HttpDelete("invite/{id}")]
        public async Task<IActionResult> DeleteInvite(int id)
        {
            var invite = await _userManager.FindByIdAsync(id.ToString());
            await _userManager.DeleteAsync(invite);

            return NoContent();


        }

        [HttpDelete("invites")]
        public async Task<IActionResult> DeleteInvites()
        {
            var invites = await _userManager.GetUsersInRoleAsync("Guest");

            foreach (var invite in invites)
            {
                await _userManager.DeleteAsync(invite);
            }

            return NoContent();

        }

        [HttpGet("accesses")]
        public async Task<IActionResult> GetAccesses()
        {
            var invites = await _userManager.GetUsersInRoleAsync("Guest");
            var adminInvites = await _userManager.GetUsersInRoleAsync("Admin");
            var allInvites = invites.Concat(adminInvites);
            var accesses = _mapper.Map<IEnumerable<AccessesDto>>(allInvites);

            return Ok(accesses);
        }

        [HttpPut("accesses/{id}")]
        public async Task<IActionResult> ChangeAccess(int id, string key)
        {
            var invite = await _userManager.FindByIdAsync(id.ToString());
            invite.AccessKey = key;

            await _userManager.UpdateAsync(invite);

            return NoContent();
        }


        [HttpPost("rsvp/{id}")]
        public async Task<IActionResult> UpdateInvite(int id, InviteUpdateDto inviteDetails)
        {
            var invite = await _repo.GetInviteDetails(id);
            invite.fromUpdateDto(inviteDetails, _mapper);
            var validAnswer = invite.InviteAnswers.Where(ia => ia.Status == "V").FirstOrDefault().Status = "A";

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Failed to Post RSVP");
        }

        [HttpPost("createadmin")]
        public async Task<IActionResult> CreateAdminAcess(string username, string key)
        {
            var invite = new Invite
            {
                UserName = username,
                AccessKey = key,
                Created = DateTime.Now,
                LastActive = DateTime.Now
            };

            await _userManager.CreateAsync(invite);
            await _userManager.AddToRoleAsync(invite, "Admin");
            return NoContent();

        }



    }
}