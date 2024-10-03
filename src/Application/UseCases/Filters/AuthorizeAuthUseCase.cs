using Application.Interfaces.Filters;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Application.Interfaces.Services;
using Domain.Entities;
namespace Application.UseCases.Filters
{
    internal class AuthorizeAuthUseCase(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IJWTSessionUtils jWTSessionUtils) : Attribute, IAuthorizeAuthUseCase, IAsyncAuthorizationFilter
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