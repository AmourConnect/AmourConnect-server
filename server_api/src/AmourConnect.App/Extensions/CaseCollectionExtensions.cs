using AmourConnect.App.Interfaces.Filters;
using AmourConnect.App.UseCases.Filters;
using Microsoft.Extensions.DependencyInjection;
namespace AmourConnect.App.Extensions
{
    public static class CaseCollectionExtensions
    {
        public static void AddCaseControllers(this IServiceCollection services)
        {
            services.AddScoped<IAuthorizeUserCase, AuthorizeUserCase>();
        }
    }
}