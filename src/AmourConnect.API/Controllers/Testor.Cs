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

            DateTime dtm = DateTime.UtcNow.AddHours(1);

            string jwt = _iJWTSessionUtils.GenerateJwtToken(claims, dtm);
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