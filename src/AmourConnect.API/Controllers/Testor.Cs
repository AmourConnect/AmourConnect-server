using AmourConnect.App.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AmourConnect.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Testor(IJWTSessionUtils _IJWTSessionUtils) : ControllerBase
    {
        private readonly IJWTSessionUtils _iJWTSessionUtils = _IJWTSessionUtils;

        [HttpGet("toto")]
        public IActionResult Testo()
        {
            var claims = new[]
            {
                new Claim("userIdGoogle", "userIdGoogle"),
                new Claim("EmailGoogle", "EmailGoogle")
            };
            string jwt = _iJWTSessionUtils.GenerateJwtToken(claims, new DateTime());
            return Ok(jwt);
        }
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class Jaaj() : ControllerBase
    {
        [HttpGet("totoLogin")]
        public IActionResult TesteurSession()
        {
            return Ok("bienvenu");
        }
    }
}