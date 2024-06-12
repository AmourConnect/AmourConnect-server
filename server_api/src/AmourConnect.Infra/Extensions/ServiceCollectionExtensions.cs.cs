using AmourConnect.Infra.Persistence;
using Microsoft.Extensions.DependencyInjection;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using AmourConnect.Infra.Seeders;
using AmourConnect.Infra.Interfaces;
using AmourConnect.Infra.Repository;

namespace AmourConnect.Infra.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            Env.Load();
            Env.TraversePath().Load();
            services.AddDbContext<AmourConnectDbContext>(options => options.UseNpgsql(Env.GetString("ConnectionDB")));

            services.AddScoped<IUserSeeder, UserSeeder>();
            services.AddScoped<IAmourConnectDbContext, AmourConnectDbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessage, MessageRepository>();
            services.AddScoped<IRequestFriends, RequestFriendsRepository>();
        }
    }
}