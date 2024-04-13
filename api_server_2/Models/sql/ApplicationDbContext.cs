using Microsoft.EntityFrameworkCore;

namespace api_server_2.Models.sql
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public DbSet<Swipe> Swipe { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=3224;Username=tchoulo;Password=123tchoulo123;Database=amourconnect_dev");
        }

    }
}