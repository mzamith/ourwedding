using System;
using OurWedding.API.Data;

namespace OurWedding.API.Dtos
{
    public class InviteeAnswerDto : IHasStatus
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Restriction { get; set; }
        public bool IsAtending { get; set; }
        public DateTime AnswerDate { get; set; }

    }
}