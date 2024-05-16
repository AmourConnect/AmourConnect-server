using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using server_api.Interfaces;
using server_api.Models;
using server_api.Utils;

namespace server_api.Filters
{
    public class AuthorizeUserConnectAsync : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IUserRepository _userRepository;

        public AuthorizeUserConnectAsync(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var cookieValue = CookieUtils.GetCookieUser(context.HttpContext);
            User user = await _userRepository.GetUserWithCookieAsync(cookieValue);
            if (string.IsNullOrEmpty(cookieValue) || user == null)
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
        }
    }
}