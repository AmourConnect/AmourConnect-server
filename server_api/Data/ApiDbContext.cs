using Microsoft.EntityFrameworkCore;
using server_api.Models;

namespace server_api.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public DbSet<RequestFriends> RequestFriends { get; set; }

        public DbSet<Message> Messages { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>()
                .HasOne<User>(m => m.UserIssuer)
                .WithMany(u => u.MessagesSent)
                .HasForeignKey(m => m.IdUserIssuer)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Message>()
                .HasOne<User>(m => m.UserReceiver)
                .WithMany(u => u.MessagesReceived)
                .HasForeignKey(m => m.Id_UserReceiver)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RequestFriends>()
                .HasOne<User>(r => r.UserIssuer)
                .WithMany(u => u.RequestsSent)
                .HasForeignKey(r => r.IdUserIssuer)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RequestFriends>()
                .HasOne<User>(r => r.UserReceiver)
                .WithMany(u => u.RequestsReceived)
                .HasForeignKey(r => r.Id_UserReceiver)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}