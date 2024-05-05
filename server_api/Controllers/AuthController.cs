using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server_api.Interfaces;
using server_api.Dto;
using server_api.Utils;
using DotNetEnv;
using server_api.Models;

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

            var emailGoogle = response.Principal.FindFirstValue(ClaimTypes.Email);
            var userIdGoogle = response.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

           int? id_user = _userRepository.SearchIdUserWithIdGoogle(emailGoogle, userIdGoogle);

            if (id_user > 0)
            {
                return CreateSessionLoginAndReturnResponse(id_user.Value);
            }
            else
            {
                CookieUtils.CreateCookieToSaveIdGoogle(Response, userIdGoogle, emailGoogle);
                return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/register");
            }
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistrationDto userRegistrationDto)
        {
            var (idGoogle, emailGoogle) = CookieUtils.GetGoogleUserFromCookie(Request);

            if (idGoogle == null && emailGoogle == null)
            {
                return BadRequest("Please login with Google before register");
            }

            IActionResult result = RegexUtils.CheckBodyAuthRegister(this, userRegistrationDto.DateOfBirth, userRegistrationDto.Sex, userRegistrationDto.City, userRegistrationDto.Pseudo);
            if (result != null)
            {
                return result;
            }

            if (_userRepository.CheckIfPseudoAlreadyExist(userRegistrationDto.Pseudo))
            {
                return BadRequest("Pseudo Already use");
            }

            int? id_user = _userRepository.SearchIdUserWithIdGoogle(emailGoogle, idGoogle);

            if (id_user > 0)
            {
                return CreateSessionLoginAndReturnResponse(id_user.Value);
            }

            else 
            {
                int? id_user2 = _userRepository.CreateUser(idGoogle, emailGoogle, userRegistrationDto.DateOfBirth, userRegistrationDto.Sex, userRegistrationDto.Pseudo, userRegistrationDto.City);

                if (id_user2.HasValue)
                {
                    SessionDataDto sessionData = _userRepository.UpdateSessionUser(id_user2.Value);
                    CookieUtils.CreateSessionCookie(Response, sessionData);
                    return Ok("Register finish");
                }
                else
                {
                    return BadRequest("Failed to create user");
                }
            }
        }



        private IActionResult CreateSessionLoginAndReturnResponse(int userId)
        {
            SessionDataDto sessionData = _userRepository.UpdateSessionUser(userId);
            CookieUtils.CreateSessionCookie(Response, sessionData);
            return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/welcome");
        }
    }
}