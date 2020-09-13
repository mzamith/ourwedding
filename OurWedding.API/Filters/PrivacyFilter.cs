using System;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OurWedding.API.Filters
{
    public class PrivacyFilter : Attribute, IResourceFilter
    {
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            object id;
            context.HttpContext.Request.RouteValues.TryGetValue("id", out id);
            var userId = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userRole = context.HttpContext.User.FindFirst(ClaimTypes.Role).Value;

            if (int.Parse((string)id) != int.Parse(userId) && userRole != "Admin")
                context.Result = new UnauthorizedResult();
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {

        }
    }
}