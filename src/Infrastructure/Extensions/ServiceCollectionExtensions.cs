using Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Seeders;
using Infrastructure.Interfaces;
using Infrastructure.Repository;

namespace Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, string ConnectionDB)
        {
            services.AddDbContext<BackendDbContext>(options => 
            {
                options.UseNpgsql(ConnectionDB);
            });

            services.AddScoped<IUserSeeder, UserSeeder>();
            services.AddScoped<IBackendDbContext, BackendDbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IRequestFriendsRepository, RequestFriendsRepository>();
        }
    }
}