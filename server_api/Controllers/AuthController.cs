using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server_api.Interfaces;
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
            if (response.Principal == null) return BadRequest();

            var nameGoogle = response.Principal.FindFirstValue(ClaimTypes.Name);
            var emailGoogle = response.Principal.FindFirstValue(ClaimTypes.Email);
            var userIdGoogle = response.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (_userRepository.UserExists(emailGoogle, userIdGoogle))
            {
                // TO DO, connect user exist, create cookie session and date expiration ect...
            }
            else
            {
                var userData = new
                {
                    Name = nameGoogle,
                    Email = emailGoogle,
                    GoogleId = userIdGoogle
                };

                var responseApi = new
                {
                    Message = "Please register to continue",
                    UserData = userData
                };

                return Ok(responseApi);
            }

            return Ok();
        }


        
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistrationDto userRegistrationDto)
        {
            if (string.IsNullOrEmpty(userRegistrationDto.GoogleId) ||
                string.IsNullOrEmpty(userRegistrationDto.NameGoogle) ||
                string.IsNullOrEmpty(userRegistrationDto.EmailGoogle))
            {
                return BadRequest("Google user data is required for registration");
            }

            if (string.IsNullOrEmpty(userRegistrationDto.DateOfBirth) || string.IsNullOrEmpty(userRegistrationDto.Sex) || string.IsNullOrEmpty(userRegistrationDto.City))
            {
                return BadRequest("Additional information is required");
            }

            // TO DO re check if user is already (true create session cookie) register else create User him and create session cookie

            return Ok();
        }
    }
}