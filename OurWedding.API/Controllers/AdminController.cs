using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OurWedding.API.Data;
using OurWedding.API.Dtos;
using OurWedding.API.Helpers;
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

        public AdminController(IWeddingRepository repo, IMapper mapper)
        {
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


    }
}