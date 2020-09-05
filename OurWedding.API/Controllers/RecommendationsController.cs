using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OurWedding.API.Data;

namespace OurWedding.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IWeddingRepository _repo;
        public RecommendationsController(IWeddingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecommendation(string category = "All")
        {
            var recommendations = await _repo.GetRecommendations(category);
            return Ok(recommendations);
        }

    }
}