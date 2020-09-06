using Microsoft.AspNetCore.Http;

namespace OurWedding.API.Dtos
{
    public class RecommendationDto
    {
        public string Category { get; set; }
        public IFormFile File { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public string MapCoordinates { get; set; }

    }
}