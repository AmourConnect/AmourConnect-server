using AmourConnect.App.Interfaces.Filters;
using AmourConnect.App.Services;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace AmourConnect.App.UseCases.Filters
{
    internal class AuthorizeUserCase : Attribute, IAuthorizeUserCase, IAsyncAuthorizationFilter
    {
        private readonly IUserRepository _userRepository;

        public AuthorizeUserCase(IUserRepository userRepository)
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