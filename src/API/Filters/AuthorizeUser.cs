using Microsoft.AspNetCore.Mvc.Filters;
using Application.Interfaces.Filters;

namespace API.Filters
{
    internal class AuthorizeUser(IAuthorizeUserCase authorizeUserCase) : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IAuthorizeUserCase _authorizeUserCase = authorizeUserCase;

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context) => await _authorizeUserCase.OnAuthorizationAsync(context);
    }
}