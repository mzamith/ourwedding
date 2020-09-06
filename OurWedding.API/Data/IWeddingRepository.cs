using System.Collections.Generic;
using System.Threading.Tasks;
using OurWedding.API.Helpers;
using OurWedding.API.Models;

namespace OurWedding.API.Data
{
    public interface IWeddingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<Invite> GetInviteDetails(int id);
        Task<ICollection<Recommendation>> GetRecommendations(string category);
        Task<Recommendation> GetRecommendation(int id);
        Task<PagedList<Invite>> GetInvites(InviteParams inviteParams);

    }
}