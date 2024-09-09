using AmourConnect.App.Interfaces.Filters;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using AmourConnect.App.Interfaces.Services;
using AmourConnect.Domain.Entities;
namespace AmourConnect.App.UseCases.Filters
{
    internal class AuthorizeUserCase(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IJWTSessionUtils jWTSessionUtils) : Attribute, IAuthorizeUserCase, IAsyncAuthorizationFilter
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IJWTSessionUtils _jWTSessions = jWTSessionUtils;

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var cookieValueJWT = _jWTSessions.GetValueClaimsCookieUser(context.HttpContext);

            if (cookieValueJWT == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            string cookieValue = _jWTSessions.GetCookie(_httpContextAccessor.HttpContext, _jWTSessions.NameCookieUserConnected);

            User user = await _userRepository.GetUserWithCookieAsync(cookieValue);

            DateTime expirationDate = DateTime.UtcNow;
            if (user == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (user.date_token_session_expiration < expirationDate)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
        }
    }
}