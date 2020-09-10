using System.Collections.Generic;

namespace OurWedding.API.Dtos
{
    public class InviteDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool CanAddInvitee { get; set; }
        public virtual ICollection<InviteeDto> Invitees { get; set; }
        public virtual InviteAnswerDto InviteAnswer { get; set; }
    }
}