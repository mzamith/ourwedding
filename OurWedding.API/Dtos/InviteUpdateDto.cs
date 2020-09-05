using System.Collections.Generic;

namespace OurWedding.API.Dtos
{
    public class InviteUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<InviteeUpdateDto> Invitees { get; set; }
        public virtual InviteAnswerUpdateDto InviteAnswer { get; set; }

    }
}