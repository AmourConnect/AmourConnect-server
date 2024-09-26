using Microsoft.AspNetCore.Mvc.Filters;

namespace Application.Interfaces.Filters
{
    public interface IAuthorizeUserCase
    {
        Task OnAuthorizationAsync(AuthorizationFilterContext context);
    }
}