using System.Collections.Generic;

namespace OurWedding.API.Dtos
{
    public class InviteeMultipleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsMainGuest { get; set; }
        public bool isNew { get; set; }
        public virtual ICollection<InviteeAnswerDto> InviteeAnswers { get; set; }

    }
}