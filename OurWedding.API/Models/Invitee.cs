using System.Collections.Generic;

namespace OurWedding.API.Models
{
    public class Invitee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsMainGuest { get; set; }
        public bool isNew { get; set; }
        public bool WasRemoved { get; set; }
        public virtual Invite Invite { get; set; }
        public int InviteId { get; set; }
        public virtual ICollection<InviteeAnswer> InviteeAnswers { get; set; }
    }
}