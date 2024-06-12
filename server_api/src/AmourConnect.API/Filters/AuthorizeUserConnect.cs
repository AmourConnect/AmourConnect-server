using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using AmourConnect.App.Services;

namespace AmourConnect.API.Filters
{
    public class AuthorizeUserConnect : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IUserRepository _userRepository;

        public AuthorizeUserConnect(IUserRepository userRepository)
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