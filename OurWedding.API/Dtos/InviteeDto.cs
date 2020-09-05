using System.Collections.Generic;

namespace OurWedding.API.Dtos
{
    public class InviteeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsMainGuest { get; set; }
        public virtual InviteeAnswerDto InviteeAnswer { get; set; }
    }
}