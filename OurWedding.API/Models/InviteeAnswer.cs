using System;

namespace OurWedding.API.Models
{
    public class InviteeAnswer
    {
        public int Id { get; set; }
        public int InviteeId { get; set; }
        public virtual Invitee Invitee { get; set; }
        public string Status { get; set; }
        public string Restriction { get; set; }
        public bool IsAtending { get; set; }
        public DateTime AnswerDate { get; set; }
    }
}