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
    public class AuthController(IAuthCase authCase) : Controller
    {
        private readonly IAuthCase _authCase = authCase;

        [HttpGet("login")]
        public IActionResult Login() => Challenge(new AuthenticationProperties { RedirectUri = Env.GetString("IP_NOW_BACKENDAPI") + "/api/Auth/signin-google" }, GoogleDefaults.AuthenticationScheme);



        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleLogin() => Redirect((await _authCase.ValidateGoogleLoginAsync()).message);



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] SetUserRegistrationDto setuserRegistrationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message) = await _authCase.RegisterUserAsync(setuserRegistrationDto);

            return (success)
            ? Ok(new ApiResponseDto { message = message, succes = true })
            : BadRequest(new ApiResponseDto { message = message, succes = false });
        }
    }
}