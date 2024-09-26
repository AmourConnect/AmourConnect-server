using Application.Interfaces.Filters;
using Application.UseCases.Filters;
using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces.Controllers;
using Application.UseCases.Controllers;
namespace Application.Extensions
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