using Microsoft.AspNetCore.Mvc;
using server_api.Filters;
using server_api.Interfaces;
using server_api.Models;
using server_api.Utils;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUserConnect))]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]

        public IActionResult GetUsersToMach()
        {
            string cookie_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(cookie_user);

            var users = _userRepository.GetUsers(data_user_now_connect);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }
    }
}