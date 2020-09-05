using System;
using System.Collections.Generic;

namespace OurWedding.API.Dtos
{
    public class InviteAnswerDto
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public DateTime AnswerDate { get; set; }
        public string Status { get; set; }
    }
}