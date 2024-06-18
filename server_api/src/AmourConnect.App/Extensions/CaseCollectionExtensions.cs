using AmourConnect.App.Interfaces.Filters;
using AmourConnect.App.UseCases.Filters;
using Microsoft.Extensions.DependencyInjection;
using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.App.UseCases.Controllers;
namespace AmourConnect.App.Extensions
{
    public static class CaseCollectionExtensions
    {
        public static void AddCaseControllers(this IServiceCollection services)
        {
            services.AddScoped<IAuthorizeUserCase, AuthorizeUserCase>();
            services.AddScoped<IAuthCase, AuthCase>();
            services.AddScoped<IUserCase, UserCase>();
            services.AddScoped<IMessageCase, MessageCase>();
            services.AddScoped<IRequestFriendsCase, RequestFriendsCase>();
        }
    }
}