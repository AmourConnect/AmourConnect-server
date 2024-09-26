using Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Seeders;
using Infrastructure.Interfaces;
using Infrastructure.Repository;

namespace Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            Env.Load();
            Env.TraversePath().Load();
            services.AddDbContext<BackendDbContext>(options => 
            {
                options.UseNpgsql(Env.GetString("ConnectionDB"));
            });

            services.AddScoped<IUserSeeder, UserSeeder>();
            services.AddScoped<IBackendDbContext, BackendDbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IRequestFriendsRepository, RequestFriendsRepository>();
        }
    }
}