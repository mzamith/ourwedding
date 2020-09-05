using System;
using System.Collections.Generic;
using OurWedding.API.Data;

namespace OurWedding.API.Dtos
{
    public class InviteAnswerDto : IHasStatus
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public DateTime AnswerDate { get; set; }
        public string Status { get; set; }
    }
}