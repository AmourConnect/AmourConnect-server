using Microsoft.AspNetCore.Mvc;
using server_api.Dto;
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



        [HttpGet("GetUsersToMach")]
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



        [HttpGet("GetUserOnly")]
        public IActionResult GetUserOnly()
        {
            string cookie_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(cookie_user);

            GetUserOnlyDto userDto = new GetUserOnlyDto
            {
                Id_User = data_user_now_connect.Id_User,
                Pseudo = data_user_now_connect.Pseudo,
                EmailGoogle = data_user_now_connect.EmailGoogle,
                Profile_picture = data_user_now_connect.Profile_picture,
                city = data_user_now_connect.city,
                sex = data_user_now_connect.sex,
                date_of_birth = data_user_now_connect.date_of_birth
            };
            return Ok(userDto);
        }


        [HttpPatch("UpdateUser")]
        public IActionResult UpdateUser([FromBody] UserUpdateDto userUpdateDto)
        {
            string cookie_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(cookie_user);

            var newsValues = new
            {
                ProfilePicture = RegexUtils.CheckPicture(userUpdateDto.ProfilePicture)
                                ? userUpdateDto.ProfilePicture
                                : data_user_now_connect.Profile_picture,

                City = RegexUtils.CheckCity(userUpdateDto.city)
                          ? userUpdateDto.city
                          : data_user_now_connect.city,

                Sex = RegexUtils.CheckSex(userUpdateDto.sex)
                         ? userUpdateDto.sex
                         : data_user_now_connect.sex,

                DateOfBirth = RegexUtils.CheckDate(userUpdateDto.DateOfBirth)
                            ? userUpdateDto.DateOfBirth ?? DateTime.MinValue
                            : data_user_now_connect.date_of_birth,
            };

            data_user_now_connect.Profile_picture = newsValues.ProfilePicture;
            data_user_now_connect.city = newsValues.City;
            data_user_now_connect.sex = newsValues.Sex;
            data_user_now_connect.date_of_birth = newsValues.DateOfBirth;

            _userRepository.UpdateUser(data_user_now_connect.Id_User, data_user_now_connect);

            return NoContent();
        }
    }
}