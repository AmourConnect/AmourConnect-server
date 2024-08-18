using Microsoft.AspNetCore.Mvc.Filters;
using AmourConnect.App.Interfaces.Filters;

namespace AmourConnect.API.Filters
{
    internal class AuthorizeUser(IAuthorizeUserCase authorizeUserCase) : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IAuthorizeUserCase _authorizeUserCase = authorizeUserCase;

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context) => await _authorizeUserCase.OnAuthorizationAsync(context);
    }
}