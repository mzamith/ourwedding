using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OurWedding.API.Data;
using OurWedding.API.Dtos;
using OurWedding.API.Filters;
using OurWedding.API.Helpers;
using OurWedding.API.Models;

namespace OurWedding.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [PrivacyFilter]
    [Route("api/[controller]")]
    [ApiController]
    public class InvitesController : ControllerBase
    {
        private readonly IWeddingRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<Invite> _userManager;
        public InvitesController(IWeddingRepository repo, IMapper mapper, UserManager<Invite> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInviteDetails(int id)
        {
            var invite = await _repo.GetInviteDetails(id);
            var inviteToReturn = _mapper.Map<InviteDetailsDto>(invite);

            return Ok(inviteToReturn);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateInvite(int id, InviteUpdateDto inviteDetails)
        {
            var invite = await _repo.GetInviteDetails(id);
            invite.fromUpdateDto(inviteDetails, _mapper);

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Failed to Post RSVP");

        }

    }
}