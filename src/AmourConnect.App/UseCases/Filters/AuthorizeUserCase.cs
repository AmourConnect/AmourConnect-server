using AmourConnect.App.Interfaces.Filters;
using AmourConnect.App.Services;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace AmourConnect.App.UseCases.Filters
{
    internal class AuthorizeUserCase : Attribute, IAuthorizeUserCase, IAsyncAuthorizationFilter
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthorizeUserCase(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var cookieValueJWT = CookieUtils.GetValueClaimsCookieUser(context.HttpContext, CookieUtils.nameCookieUserConnected);

            if (cookieValueJWT == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
        }
    }
}