namespace OurWedding.API.Models
{
    public class Invitee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsMainGuest { get; set; }
        public virtual Invite Invite { get; set; }
        public int InviteId { get; set; }
    }
}