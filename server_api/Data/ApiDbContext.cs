using Microsoft.EntityFrameworkCore;
using server_api.Models;

namespace server_api.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public DbSet<Swipe> Swipe { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options): base (options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Swipe>()
                .HasOne<User>(s => s.User)
                .WithMany(u => u.Swipes)
                .HasForeignKey(s => s.Id_User)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Swipe>()
                .HasOne<User>(s => s.UserWhichWasSwiped)
                .WithMany(u => u.SwipesReceived)
                .HasForeignKey(s => s.Id_User_which_was_Swiped)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}