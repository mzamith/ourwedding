namespace OurWedding.API.Models
{
    public class Recommendation
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoPublicId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public string MapCoordinates { get; set; }
    }
}