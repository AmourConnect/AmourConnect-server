using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.AppLayerDtos;
using AmourConnect.Domain.Dtos.SetDtos;
using AmourConnect.Infra.Interfaces;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using AmourConnect.App.Interfaces.Controllers;
using Microsoft.AspNetCore.Authentication.Google;
namespace AmourConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _userRepository;

        private readonly IAuthCase _authCase;


        public AuthController(IUserRepository userRepository, IAuthCase authCase)
        {
            _userRepository = userRepository;
            _authCase = authCase;
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
            if (await _authCase.ValidateGoogleLoginAsync())
            {
                return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/welcome");
            }

            return Redirect(Env.GetString("IP_NOW_FRONTEND") + "/register");
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] SetUserRegistrationDto setuserRegistrationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (userIdGoogle, emailGoogle) = CookieUtils.GetGoogleUserFromCookie(Request);

            var registrationResult = await _authCase.RegisterUserAsync(setuserRegistrationDto, userIdGoogle, emailGoogle);

            if (registrationResult.success)
            {
                return Ok(new ApiResponseDto { message = registrationResult.message, succes = true });
            }

            return BadRequest(new ApiResponseDto { message = registrationResult.message, succes = false });
        }
    }
}