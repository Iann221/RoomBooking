using API.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Room> Rooms { get; set; } // agar bisa ngequery activities dari data context
        public DbSet<Reservation> Reservations { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Reservation>()
                .HasOne(a => a.Room)
                .WithMany(c => c.Reservations)
                .OnDelete(DeleteBehavior.Cascade); // jika activity didelete, commentsnya kedelete juga

        }
    }
}