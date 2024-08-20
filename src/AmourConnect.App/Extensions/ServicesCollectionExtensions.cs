using AmourConnect.App.Interfaces.Services;
using AmourConnect.App.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AmourConnect.App.Extensions
{
    public static class ServicesCollectionExtensions
    {
        public static void AddServicesControllers(this IServiceCollection services)
        {
            services.AddScoped<IRegexUtils, RegexUtils>();
        }
    }
}