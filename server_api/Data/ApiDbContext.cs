using Microsoft.EntityFrameworkCore;

namespace server_api.Models
{
    public class ApiDbContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public DbSet<Swipe> Swipe { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options): base (options)
        {

        }

    }
}