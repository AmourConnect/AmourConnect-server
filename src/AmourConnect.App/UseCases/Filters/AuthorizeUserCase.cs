using AmourConnect.App.Interfaces.Filters;
using AmourConnect.App.Services;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using AmourConnect.Domain.Dtos.AppLayerDtos;

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
            var cookieValueJWT = CookieUtils.GetCookieUser(context.HttpContext);

            if (cookieValueJWT == null) 
            {
                var claims = CookieUtils.GetJWTFromCookie(_httpContextAccessor.HttpContext.Request, CookieUtils.nameCookieUserConnected, true);
                string userClaim = claims?.FirstOrDefault(c => c.Type == "userConnected")?.Value;
                if(claims == null || string.IsNullOrEmpty(userClaim))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                User user = await _userRepository.GetUserWithCookieAsync(userClaim);
                if (user == null)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                DateTime expirationDate = DateTime.UtcNow;
                if (user.date_token_session_expiration < expirationDate)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }

                SessionUserDto sessionData = new()
                {
                    date_token_session_expiration = DateTime.UtcNow.AddMinutes(15),
                    token_session_user = user.token_session_user,
                };

                CookieUtils.SetSessionUser(_httpContextAccessor.HttpContext.Response, sessionData);
            }
        }
    }
}