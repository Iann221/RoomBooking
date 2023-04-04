using API.Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any()) // cek dah pny user ato belom, klo belom bikin
            {
                var users = new List<AppUser>
                {
                    new AppUser{UserName = "Ian", Email = "ian@test.com"},
                };
                foreach (var user in users){
                    await userManager.CreateAsync(user, "Pa$$w0rd"); // create the user (user, passwordnya)
                    // klo ini gaperlu save changes
                }            
            }

            if (context.Rooms.Any()) return;
            
            var activities = new List<Room>
            {
                new Room
                {
                    Title = "aula pastoran",
                    Description = "ukuran ruangan gede",
                },
                new Room
                {
                    Title = "halaman gereja",
                    Description = "outdoor",
                },
                new Room
                {
                    Title = "ruang rapat",
                    Description = "muat 10 orang",
                },
            };

            await context.Rooms.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}