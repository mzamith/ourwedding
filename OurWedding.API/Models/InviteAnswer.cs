using System;
using System.Collections.Generic;
using OurWedding.API.Data;

namespace OurWedding.API.Models
{
    public class InviteAnswer : IHasStatus
    {
        public int Id { get; set; }
        public int InviteId { get; set; }
        public virtual Invite Invite { get; set; }
        public string Comment { get; set; }
        public DateTime AnswerDate { get; set; }
        public string Status { get; set; }
    }
}