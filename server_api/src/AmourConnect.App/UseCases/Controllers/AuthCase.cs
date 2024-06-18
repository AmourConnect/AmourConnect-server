using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.AppLayerDtos;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using AmourConnect.API.Services;
using AmourConnect.Domain.Dtos.SetDtos;
namespace AmourConnect.App.UseCases.Controllers
{
    internal class AuthCase : IAuthCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthCase(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> ValidateGoogleLoginAsync()
        {
            var response = await _httpContextAccessor.HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (response?.Principal == null) return false;

            var EmailGoogle = response.Principal.FindFirstValue(ClaimTypes.Email);
            var userIdGoogle = response.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(EmailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return false;
            }

            int? Id_User = await _userRepository.GetUserIdWithGoogleIdAsync(EmailGoogle, userIdGoogle);

            if (Id_User > 0)
            {
                await CreateSessionLoginAsync(Id_User.Value);
                return true;
            }

            CookieUtils.CreateCookieToSaveIdGoogle(_httpContextAccessor.HttpContext.Response, userIdGoogle, EmailGoogle);
            return false;
        }


        public async Task<(bool success, string message)> RegisterUserAsync(SetUserRegistrationDto setuserRegistrationDto, string userIdGoogle, string emailGoogle)
        {
            if (string.IsNullOrEmpty(emailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return (false, "Please login with Google before register");
            }

            var regexResult = RegexUtils.CheckBodyAuthRegister(setuserRegistrationDto);

            if (!regexResult.success)
            {
                return regexResult;
            }

            if (await _userRepository.GetUserByPseudoAsync(setuserRegistrationDto.Pseudo))
            {
                return (false, "Pseudo Already use");
            }

            int? id_user = await _userRepository.GetUserIdWithGoogleIdAsync(emailGoogle, userIdGoogle);

            if (id_user > 0)
            {
                await CreateSessionLoginAsync(id_user.Value);
                return (true, "User already exists, logged in");
            }

            int? id_user2 = await _userRepository.CreateUserAsync(userIdGoogle, emailGoogle, setuserRegistrationDto);

            if (id_user2.HasValue)
            {
                await CreateSessionLoginAsync(id_user2.Value);
                await EmailUtils.MailRegisterAsync(emailGoogle, setuserRegistrationDto.Pseudo);
                return (true, "Register finish");
            }

            return (false, "Failed to create user");
        }

        private async Task CreateSessionLoginAsync(int Id_User)
        {
            SessionUserDto sessionData = await _userRepository.UpdateSessionUserAsync(Id_User);
            CookieUtils.CreateSessionCookie(_httpContextAccessor.HttpContext.Response, sessionData);
        }
    }
}