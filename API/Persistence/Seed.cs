using API.Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
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