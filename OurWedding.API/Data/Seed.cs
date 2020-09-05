using System.Collections.Generic;
using System.Linq;
using OurWedding.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace OurWedding.API.Data
{
    public class Seed
    {

        //public static void SeedUsers(DataContext context)
        public static void SeedUsers(UserManager<Invite> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var invites = JsonConvert.DeserializeObject<List<Invite>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Guest"},
                    new Role{Name = "Admin"}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var invite in invites)
                {
                    userManager.CreateAsync(invite, "password").Wait();
                    userManager.AddToRoleAsync(invite, "Guest").Wait();
                }

                AddInviteeAnswers(userManager);

                var adminUser = new Invite
                {
                    UserName = "BrideAndGroom",
                    AccessKey = "adminkey"
                };

                var result = userManager.CreateAsync(adminUser, "password").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("BrideAndGroom").Result;
                    userManager.AddToRoleAsync(admin, "Admin").Wait();
                }

                //context.SaveChanges();
            }
        }

        private static void AddInviteeAnswers(UserManager<Invite> userManager)
        {
            var familyOne = userManager.FindByNameAsync("FamilyOne").Result;

            var guest11 = familyOne.Invitees.FirstOrDefault(x => x.Name == "Guest 11");
            var guest12 = familyOne.Invitees.FirstOrDefault(x => x.Name == "Guest 12");

            var inviteeAnswerVegan = new InviteeAnswer
            {
                IsAtending = true,
                Status = "V",
                Restriction = "Vegan",
                Invitee = guest11
            };
            var inviteeAnswerNormal = new InviteeAnswer
            {
                IsAtending = true,
                Status = "V",
                Invitee = guest12
            };
            var inviteeAnswerNormalNotAtt = new InviteeAnswer
            {
                IsAtending = false,
                Status = "H",
                Invitee = guest12
            };
            var inviteeAnswerVeganH = new InviteeAnswer
            {
                IsAtending = true,
                Status = "H",
                Restriction = "Vegan",
                Invitee = guest11
            };

            var historyAnswer = familyOne.InviteAnswers.FirstOrDefault(x => x.Status == "H");
            var currentAnswer = familyOne.InviteAnswers.FirstOrDefault(x => x.Status == "V");

            historyAnswer.InviteeAnswers = new List<InviteeAnswer>();
            historyAnswer.InviteeAnswers.Add(inviteeAnswerNormalNotAtt);
            historyAnswer.InviteeAnswers.Add(inviteeAnswerVeganH);

            currentAnswer.InviteeAnswers = new List<InviteeAnswer>();
            currentAnswer.InviteeAnswers.Add(inviteeAnswerNormal);
            currentAnswer.InviteeAnswers.Add(inviteeAnswerVegan);

            userManager.UpdateAsync(familyOne).Wait();
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