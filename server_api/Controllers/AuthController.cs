using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server_api.Interfaces;
using server_api.Utils;
using DotNetEnv;
using server_api.Dto.AppLayerDto;
using server_api.Dto.SetDto;

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

            if (string.IsNullOrEmpty(EmailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return BadRequest();
            }

            int? Id_User = _userRepository.GetUserIdWithGoogleId(EmailGoogle, userIdGoogle);

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
        public IActionResult Register([FromBody] SetUserRegistrationDto setuserRegistrationDto)
        {
            var (userIdGoogle, emailGoogle) = CookieUtils.GetGoogleUserFromCookie(Request);

            if (string.IsNullOrEmpty(emailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return BadRequest(new { message = "Please login with Google before register" });
            }

            IActionResult result = RegexUtils.CheckBodyAuthRegister(this, setuserRegistrationDto.date_of_birth, setuserRegistrationDto.sex, setuserRegistrationDto.city, setuserRegistrationDto.Pseudo);
            
            if (result != null)
            {
                return result; // return IActionResult
            }

            if (_userRepository.GetUserByPseudo(setuserRegistrationDto.Pseudo))
            {
                return BadRequest(new { message = "Pseudo Already use" });
            }

            int? id_user = _userRepository.GetUserIdWithGoogleId(emailGoogle, userIdGoogle);

            if (id_user > 0)
            {
                return CreateSessionLoginAndReturnResponse(id_user.Value);
            }

            else 
            {
                int? id_user2 = _userRepository.CreateUser(userIdGoogle, emailGoogle, setuserRegistrationDto.date_of_birth, setuserRegistrationDto.sex, setuserRegistrationDto.Pseudo, setuserRegistrationDto.city);

                if (id_user2.HasValue)
                {
                    ALSessionUserDto sessionData = _userRepository.UpdateSessionUser(id_user2.Value);
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
            ALSessionUserDto sessionData = _userRepository.UpdateSessionUser(Id_User);
            CookieUtils.CreateSessionCookie(Response, sessionData);
            return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/welcome");
        }
    }
}