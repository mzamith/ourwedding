using System.Collections.Generic;
using System.Linq;
using OurWedding.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace OurWedding.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<Invite> userManager, RoleManager<Role> roleManager, DataContext context, IConfiguration conf)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                // var invites = JsonConvert.DeserializeObject<List<Invite>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Guest"},
                    new Role{Name = "Admin"}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                // foreach (var invite in invites)
                // {
                //     userManager.CreateAsync(invite, "password").Wait();
                //     userManager.AddToRoleAsync(invite, "Guest").Wait();
                // }

                var adminUser = new Invite
                {
                    UserName = "BrideAndGroom",
                    AccessKey = conf.GetSection("AppSettings:AdminKey").Value
                };

                var result = userManager.CreateAsync(adminUser, "password").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("BrideAndGroom").Result;
                    userManager.AddToRoleAsync(admin, "Admin").Wait();
                }

            }

            if (!context.Recommendations.Any())
            {
                var recomData = System.IO.File.ReadAllText("Data/RecommendationSeedData.json");
                var recommendations = JsonConvert.DeserializeObject<List<Recommendation>>(recomData);

                context.AddRange(recommendations);
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

    }
}