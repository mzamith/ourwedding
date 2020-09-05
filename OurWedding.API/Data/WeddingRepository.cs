using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}