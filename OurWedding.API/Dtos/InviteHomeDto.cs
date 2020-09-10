using System;

namespace OurWedding.API.Dtos
{
    public class InviteHomeDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public bool Answered { get; set; }
        public string Team { get; set; }
        public string WelcomeMessage { get; set; }
        public DateTime LastAnswered { get; set; }
    }
}