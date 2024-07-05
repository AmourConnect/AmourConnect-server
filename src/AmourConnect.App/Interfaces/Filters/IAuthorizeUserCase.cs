using Microsoft.AspNetCore.Mvc.Filters;

namespace AmourConnect.App.Interfaces.Filters
{
    public interface IAuthorizeUserCase
    {
        Task OnAuthorizationAsync(AuthorizationFilterContext context);
    }
}