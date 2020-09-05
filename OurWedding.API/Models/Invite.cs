using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OurWedding.API.Dtos;
using OurWedding.API.Helpers;

namespace OurWedding.API.Models
{
    public class Invite : IdentityUser<int>
    {
        public string AccessKey { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public bool IsBlacklisted { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<Invitee> Invitees { get; set; }
        public virtual ICollection<InviteAnswer> InviteAnswers { get; set; }

    }
}