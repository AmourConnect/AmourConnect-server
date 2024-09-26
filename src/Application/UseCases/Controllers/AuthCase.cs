using Application.Interfaces.Controllers;
using Domain.Dtos.AppLayerDtos;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Domain.Dtos.SetDtos;
using DotNetEnv;
using Application.Interfaces.Services;
using Application.Interfaces.Services.Email;
namespace Application.UseCases.Controllers
{
    internal sealed class AuthCase(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IRegexUtils regexUtils, ISendMail sendMail, IJWTSessionUtils jWTSessionUtils) : IAuthCase
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IRegexUtils _regexUtils = regexUtils;
        private readonly ISendMail sendMail = sendMail;
        private readonly IJWTSessionUtils _jWTSessions = jWTSessionUtils;

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

            SetCookieToSaveIdGoogle(_httpContextAccessor.HttpContext.Response, userIdGoogle, EmailGoogle);
            return (false, Env.GetString("IP_NOW_FRONTEND") + "/register");
        }


        public async Task<(bool success, string message)> RegisterUserAsync(SetUserRegistrationDto setuserRegistrationDto)
        {
            var claims = _jWTSessions.GetClaimsFromCookieJWT(_httpContextAccessor.HttpContext, _jWTSessions.NameCookieUserGoogle);

            string emailGoogle = claims?.FirstOrDefault(c => c.Type == "EmailGoogle")?.Value;
            string userIdGoogle = claims?.FirstOrDefault(c => c.Type == "userIdGoogle")?.Value;

            if (string.IsNullOrEmpty(emailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return (false, "Please login with Google before register");
            }

            var regexResult = _regexUtils.CheckBodyAuthRegister(setuserRegistrationDto);

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
                await sendMail.MailRegisterAsync(emailGoogle, setuserRegistrationDto.Pseudo);
                return (true, "Register finish");
            }

            return (false, "Failed to create user");
        }

        private async Task CreateSessionLoginAsync(int Id_User)
        {
            var claims = new[]
{
                new Claim("userAmourConnected", Id_User.ToString(), ClaimValueTypes.String),
            };
            SessionUserDto JWTGenerate = _jWTSessions.GenerateJwtToken(claims, DateTime.UtcNow.AddDays(7));
            await _userRepository.UpdateSessionUserAsync(Id_User, JWTGenerate);
            _jWTSessions.SetSessionCookie(_httpContextAccessor.HttpContext.Response, _jWTSessions.NameCookieUserConnected, JWTGenerate);
        }

        private void SetCookieToSaveIdGoogle(HttpResponse Response, string userIdGoogle, string EmailGoogle)
        {
            DateTime expirationCookieGoogle = DateTime.UtcNow.AddHours(1);

            var claims = new[]
            {
                new Claim("userIdGoogle", userIdGoogle),
                new Claim("EmailGoogle", EmailGoogle)
            };

            SessionUserDto sessionDataJWT = _jWTSessions.GenerateJwtToken(claims, expirationCookieGoogle);

            _jWTSessions.SetSessionCookie(Response, _jWTSessions.NameCookieUserGoogle, sessionDataJWT);
        }
    }
}