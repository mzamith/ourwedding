namespace OurWedding.API.Dtos
{
    public class InviteeUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsMainGuest { get; set; }
        public bool isNew { get; set; }
        public virtual InviteeAnswerUpdateDto InviteeAnswer { get; set; }

    }
}