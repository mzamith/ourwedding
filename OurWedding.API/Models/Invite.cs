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
        public bool CanAddInvitee { get; set; }
        public string Team { get; set; }
        public string WelcomeMessage { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<Invitee> Invitees { get; set; }
        public virtual ICollection<InviteAnswer> InviteAnswers { get; set; }

        public void fromUpdateDto(InviteUpdateDto inviteUpdate, IMapper mapper)
        {
            LastActive = DateTime.Now;
            InviteAnswers.SetStatus("H");
            InviteAnswers.Add(mapper.Map<InviteAnswer>(inviteUpdate.InviteAnswer));

            foreach (var invitee in inviteUpdate.Invitees)
            {
                var repoInvitee = Invitees.FirstOrDefault(i => i.Id == invitee.Id);

                if (repoInvitee == null)
                {
                    var newInvitee = mapper.Map<Invitee>(invitee);
                    newInvitee.InviteeAnswers = new List<InviteeAnswer>();
                    newInvitee.InviteeAnswers.Add(mapper.Map<InviteeAnswer>(invitee.InviteeAnswer));
                    Invitees.Add(newInvitee);
                }
                else
                {
                    if (invitee.isNew && !invitee.InviteeAnswer.IsAttending)
                        repoInvitee.WasRemoved = true;
                    repoInvitee.InviteeAnswers.SetStatus("H");
                    repoInvitee.InviteeAnswers.Add(mapper.Map<InviteeAnswer>(invitee.InviteeAnswer));
                }

            }
        }

    }
}