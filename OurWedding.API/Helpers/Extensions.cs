using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OurWedding.API.Data;
using OurWedding.API.Models;

namespace OurWedding.API.Helpers
{
    public static class Extensions
    {

        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static async Task<Invite> FindByAccessKeyAsync(this UserManager<Invite> userManager, string accessKey)
        {
            return await userManager.Users.SingleOrDefaultAsync(u => u.AccessKey == accessKey);
        }

        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }

        public static void SetStatus<T>(this IEnumerable<T> data, string status)
        {
            foreach (var item in data)
            {
                if (typeof(IHasStatus).IsInstanceOfType(item))
                {
                    ((IHasStatus)(object)item).Status = status;
                }
            }
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

    }
}