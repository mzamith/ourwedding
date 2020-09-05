using Microsoft.AspNetCore.Identity;

namespace OurWedding.API.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual Invite User { get; set; }
        public virtual Role Role { get; set; }

    }
}