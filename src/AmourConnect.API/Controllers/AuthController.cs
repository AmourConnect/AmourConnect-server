using AmourConnect.Domain.Dtos.AppLayerDtos;
using AmourConnect.Domain.Dtos.SetDtos;
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
        private readonly IAuthCase _authCase;


        public AuthController(IAuthCase authCase)
        {
            _authCase = authCase;
        }


        [HttpGet("login")]
        public IActionResult Login()
        {
            var props = new AuthenticationProperties { RedirectUri = Env.GetString("IP_NOW_BACKENDAPI") + "/api/Auth/signin-google" };
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }



        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleLogin()
        {
                var result = await _authCase.ValidateGoogleLoginAsync();
                return Redirect(result.message);
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] SetUserRegistrationDto setuserRegistrationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var registrationResult = await _authCase.RegisterUserAsync(setuserRegistrationDto);

            if (registrationResult.success)
            {
                return Ok(new ApiResponseDto { message = registrationResult.message, succes = true });
            }

            return BadRequest(new ApiResponseDto { message = registrationResult.message, succes = false });
        }
    }
}