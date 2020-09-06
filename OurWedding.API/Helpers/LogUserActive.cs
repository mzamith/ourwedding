using System;
using System.Security.Claims;
using System.Threading.Tasks;
using OurWedding.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace OurWedding.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var inviteId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IWeddingRepository>();
            var invite = await repo.GetInviteDetails(inviteId);
            invite.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}