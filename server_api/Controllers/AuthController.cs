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
using server_api.Mappers;

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

            int? Id_User = await _userRepository.GetUserIdWithGoogleIdAsync(EmailGoogle, userIdGoogle);

            if (Id_User > 0)
            {
                return await CreateSessionLoginAndReturnResponseAsync(Id_User.Value);
            }
            else
            {
                CookieUtils.CreateCookieToSaveIdGoogle(Response, userIdGoogle, EmailGoogle);
                return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/register");
            }
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] SetUserRegistrationDto setuserRegistrationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (userIdGoogle, emailGoogle) = CookieUtils.GetGoogleUserFromCookie(Request);

            if (string.IsNullOrEmpty(emailGoogle) || string.IsNullOrEmpty(userIdGoogle))
            {
                return BadRequest(new ApiResponse { message = "Please login with Google before register", succes = false });
            }

            IActionResult result = RegexUtils.CheckBodyAuthRegister(this, setuserRegistrationDto);
            
            if (result != null)
            {
                return result; // return IActionResult
            }

            if (await _userRepository.GetUserByPseudoAsync(setuserRegistrationDto.Pseudo))
            {
                return BadRequest(new ApiResponse { message = "Pseudo Already use", succes = false });
            }

            int? id_user = await _userRepository.GetUserIdWithGoogleIdAsync(emailGoogle, userIdGoogle);

            if (id_user > 0)
            {
                return await CreateSessionLoginAndReturnResponseAsync(id_user.Value);
            }

            else 
            {
                int? id_user2 = await _userRepository.CreateUserAsync(userIdGoogle, emailGoogle, setuserRegistrationDto);

                if (id_user2.HasValue)
                {
                    ALSessionUserDto sessionData = await _userRepository.UpdateSessionUserAsync(id_user2.Value);
                    CookieUtils.CreateSessionCookie(Response, sessionData);
                    return Ok(new ApiResponse { message = "Register finish", succes = true });
                }
                else
                {
                    return BadRequest(new ApiResponse { message = "Failed to create user", succes = false });
                }
            }
        }



        private async Task<IActionResult> CreateSessionLoginAndReturnResponseAsync(int Id_User)
        {
            ALSessionUserDto sessionData = await _userRepository.UpdateSessionUserAsync(Id_User);
            CookieUtils.CreateSessionCookie(Response, sessionData);
            return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/welcome");
        }
    }
}