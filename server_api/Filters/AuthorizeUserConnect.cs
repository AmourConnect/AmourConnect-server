using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using server_api.Interfaces;
using server_api.Models;
using server_api.Utils;

namespace server_api.Filters
{
    public class AuthorizeUserConnect : Attribute, IAuthorizationFilter
    {
        private readonly IUserRepository _userRepository;

        public AuthorizeUserConnect(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var cookieValue = CookieUtils.GetCookieUser(context.HttpContext);
            if (string.IsNullOrEmpty(cookieValue))
            {
                context.Result = new UnauthorizedResult();
            }
            else
            {
                User user = _userRepository.GetUserWithCookie(cookieValue);
                if (user == null)
                {
                    context.Result = new UnauthorizedResult();
                }
                else
                {
                    DateTime expirationDate = DateTime.UtcNow;
                    if (user.date_token_session_expiration < expirationDate)
                    {
                        context.Result = new UnauthorizedResult();
                    }
                }
            }
        }
    }
}