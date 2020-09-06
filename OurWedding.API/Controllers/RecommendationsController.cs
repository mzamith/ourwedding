using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OurWedding.API.Data;
using OurWedding.API.Dtos;
using OurWedding.API.Models;

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
        public async Task<IActionResult> GetRecommendations(string category = "All")
        {
            var recommendations = await _repo.GetRecommendations(category);
            return Ok(recommendations);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecommendation(int id)
        {
            var recommendation = await _repo.GetRecommendation(id);
            _repo.Delete(recommendation);

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Failed to Delete recommendation");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> CreateRecommendation(RecommendationDto recommendation)
        {

            var recommendationToCreate = _mapper.Map<Recommendation>(recommendation);
            _repo.Add(recommendationToCreate);
            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Filed to Create Recommendation");
        }

    }
}