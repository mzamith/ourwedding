namespace OurWedding.API.Dtos
{
    public class AccessesDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string AccessKey { get; set; }
        public bool IsBlacklisted { get; set; }
        public bool IsAdmin { get; set; }
    }
}