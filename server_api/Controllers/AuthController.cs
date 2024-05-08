using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server_api.Interfaces;
using server_api.Dto;
using server_api.Utils;
using DotNetEnv;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }



        [HttpGet("login")]
        public IActionResult Login()
        {
            var props = new AuthenticationProperties { RedirectUri = "/api/Auth/signin-google" };
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }



        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleLogin()
        {
            var response = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (response?.Principal == null) return BadRequest();

            var EmailGoogle = response.Principal.FindFirstValue(ClaimTypes.Email);
            var userIdGoogle = response.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

           int? Id_User = _userRepository.SearchIdUserWithIdGoogle(EmailGoogle, userIdGoogle);

            if (Id_User > 0)
            {
                return CreateSessionLoginAndReturnResponse(Id_User.Value);
            }
            else
            {
                CookieUtils.CreateCookieToSaveIdGoogle(Response, userIdGoogle, EmailGoogle);
                return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/register");
            }
        }



        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistrationDto userRegistrationDto)
        {
            var (userIdGoogle, emailGoogle) = CookieUtils.GetGoogleUserFromCookie(Request);

            if (userIdGoogle == null && emailGoogle == null)
            {
                return BadRequest(new { message = "Please login with Google before register" });
            }

            IActionResult result = RegexUtils.CheckBodyAuthRegister(this, userRegistrationDto.date_of_birth, userRegistrationDto.sex, userRegistrationDto.city, userRegistrationDto.Pseudo);
            if (result != null)
            {
                return result;
            }

            if (_userRepository.CheckIfPseudoAlreadyExist(userRegistrationDto.Pseudo))
            {
                return BadRequest(new { message = "Pseudo Already use" });
            }

            int? id_user = _userRepository.SearchIdUserWithIdGoogle(emailGoogle, userIdGoogle);

            if (id_user > 0)
            {
                return CreateSessionLoginAndReturnResponse(id_user.Value);
            }

            else 
            {
                int? id_user2 = _userRepository.CreateUser(userIdGoogle, emailGoogle, userRegistrationDto.date_of_birth, userRegistrationDto.sex, userRegistrationDto.Pseudo, userRegistrationDto.city);

                if (id_user2.HasValue)
                {
                    SessionUserDto sessionData = _userRepository.UpdateSessionUser(id_user2.Value);
                    CookieUtils.CreateSessionCookie(Response, sessionData);
                    return Ok(new { message = "Register finish" });
                }
                else
                {
                    return BadRequest(new { message = "Failed to create user" });
                }
            }
        }



        private IActionResult CreateSessionLoginAndReturnResponse(int Id_User)
        {
            SessionUserDto sessionData = _userRepository.UpdateSessionUser(Id_User);
            CookieUtils.CreateSessionCookie(Response, sessionData);
            return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/welcome");
        }
    }
}