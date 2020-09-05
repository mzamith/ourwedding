using System;

namespace OurWedding.API.Dtos
{
    public class InviteHomeDto
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public bool Answered { get; set; }
        public DateTime LastAnswered { get; set; }
    }
}