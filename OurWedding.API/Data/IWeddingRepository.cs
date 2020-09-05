using System.Threading.Tasks;
using OurWedding.API.Models;

namespace OurWedding.API.Data
{
    public interface IWeddingRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        Task<Invite> GetInvite();

    }
}