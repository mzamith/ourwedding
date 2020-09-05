using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OurWedding.API.Data;
using OurWedding.API.Dtos;

namespace OurWedding.API.Controllers
{
    //[ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class InvitesController : ControllerBase
    {
        private readonly IWeddingRepository _repo;
        private readonly IMapper _mapper;
        public InvitesController(IWeddingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInviteDetails(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var invite = await _repo.GetInviteDetails(id);
            var inviteToReturn = _mapper.Map<InviteDetailsDto>(invite);

            return Ok(inviteToReturn);
        }

    }
}