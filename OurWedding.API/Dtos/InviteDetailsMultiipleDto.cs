using System.Collections.Generic;

namespace OurWedding.API.Dtos
{
    public class InviteDetailsMultipleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isBlacklisted { get; set; }
        public string Team { get; set; }
        public virtual ICollection<InviteeMultipleDto> Invitees { get; set; }
        public virtual ICollection<InviteAnswerDto> InviteAnswers { get; set; }
    }
}