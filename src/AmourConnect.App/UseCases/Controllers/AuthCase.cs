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
using DotNetEnv;
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

        public async Task<(bool success, string message)> ValidateGoogleLoginAsync()
        {
            var response = await _httpContextAccessor.HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (response?.Principal == null || !response.Succeeded)
            {
                return (false, Env.GetString("IP_NOW_FRONTEND") + "/login");
            }

            var EmailGoogle = response.Principal.FindFirstValue(ClaimTypes.Email);
            var userIdGoogle = response.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(EmailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return (false, Env.GetString("IP_NOW_FRONTEND") + "/login");
            }

            int? Id_User = await _userRepository.GetUserIdWithGoogleIdAsync(EmailGoogle, userIdGoogle);

            if (Id_User > 0)
            {
                await CreateSessionLoginAsync(Id_User.Value);
                return (true, Env.GetString("IP_NOW_FRONTEND") + "/welcome");
            }

            CookieUtils.SetCookieToSaveIdGoogle(_httpContextAccessor.HttpContext.Response, userIdGoogle, EmailGoogle);
            return (false, Env.GetString("IP_NOW_FRONTEND") + "/register");
        }


        public async Task<(bool success, string message)> RegisterUserAsync(SetUserRegistrationDto setuserRegistrationDto)
        {
            var claims = CookieUtils.GetJWTFromCookie(_httpContextAccessor.HttpContext.Request, CookieUtils.nameCookieGoogle, false);

            string emailGoogle = claims?.FirstOrDefault(c => c.Type == "EmailGoogle")?.Value;
            string userIdGoogle = claims?.FirstOrDefault(c => c.Type == "userIdGoogle")?.Value;

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

            int? Newid_user = await _userRepository.CreateUserAsync(userIdGoogle, emailGoogle, setuserRegistrationDto);

            if (Newid_user.HasValue)
            {
                await CreateSessionLoginAsync(Newid_user.Value);
                await EmailUtils.MailRegisterAsync(emailGoogle, setuserRegistrationDto.Pseudo);
                return (true, "Register finish");
            }

            return (false, "Failed to create user");
        }

        private async Task CreateSessionLoginAsync(int Id_User)
        {
            SessionUserDto sessionData = await _userRepository.UpdateSessionUserAsync(Id_User);
            CookieUtils.SetSessionUser(_httpContextAccessor.HttpContext.Response, sessionData);
        }
    }
}