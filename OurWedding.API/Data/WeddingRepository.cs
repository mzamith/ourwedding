using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OurWedding.API.Helpers;
using OurWedding.API.Models;

namespace OurWedding.API.Data
{
    public class WeddingRepository : IWeddingRepository
    {
        private readonly DataContext _context;
        public WeddingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Invite> GetInviteDetails(int id)
        {
            var invite = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            invite.Invitees = invite.Invitees.Where(i => !i.WasRemoved).ToList();
            return invite;
        }

        public async Task<ICollection<Recommendation>> GetRecommendations(string category)
        {
            if (category.Equals("All"))
            {
                return await _context.Recommendations.ToListAsync();
            }
            else
            {
                return await _context.Recommendations.Where(r => r.Category.Equals(category.ToUpper())).ToListAsync();
            }
        }

        public async Task<PagedList<Invite>> GetInvites(InviteParams inviteParams)
        {
            var invites = _context.Users.OrderByDescending(u => u.LastActive).AsQueryable();
            invites = invites.Where(u => u.UserRoles.Select(ur => ur.Role.Name).Contains("Guest"));

            if (!string.IsNullOrEmpty(inviteParams.Status))
            {
                if (inviteParams.Status.Equals("PENDING"))
                {
                    invites = invites.Where(i => !i.InviteAnswers.IsAny());
                }
                else
                {
                    invites = invites.Where(i => i.InviteAnswers.IsAny());
                }
            }

            if (inviteParams.IsBlacklisted)
            {
                invites = invites.Where(i => i.IsBlacklisted);
            }

            return await PagedList<Invite>.CreateAsync(invites, inviteParams.PageNumber, inviteParams.PageSize);

        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Recommendation> GetRecommendation(int id)
        {
            return await _context.Recommendations.Where(r => r.Id == id).FirstOrDefaultAsync();

        }
    }
}