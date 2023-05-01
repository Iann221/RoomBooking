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
                    new AppUser{UserName = "Ian", Email = "ian@test.com", PhoneNumber = "087822421636"},
                };
                foreach (var user in users){
                    await userManager.CreateAsync(user, "Pa$$w0rd"); // create the user (user, passwordnya)
                    // klo ini gaperlu save changes
                }            
            }

            if (context.Rooms.Any()) return;
            
            var rooms = new List<Room>
            {
                new Room
                {
                    Title = "Ruang Rapat 1",
                    Description = "",
                },
                new Room
                {
                    Title = "Ruang Rapat 2",
                    Description = "",
                },
                new Room
                {
                    Title = "Aula",
                    Description = "",
                },
                new Room
                {
                    Title = "Gereja St. Theodorus",
                    Description = "",
                },
            };

            await context.Rooms.AddRangeAsync(rooms);
            await context.SaveChangesAsync();
        }
    }
}