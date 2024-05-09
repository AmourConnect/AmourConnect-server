using Microsoft.AspNetCore.Mvc;
using server_api.Dto;
using server_api.Filters;
using server_api.Interfaces;
using server_api.Models;
using server_api.Utils;
using static System.Net.Mime.MediaTypeNames;

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
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserOnlyDto>))]

        public IActionResult GetUsersToMach()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            var users = _userRepository.GetUsers(data_user_now_connect);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }



        [HttpGet("GetUserOnly")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserOnlyDto>))]
        public IActionResult GetUserOnly()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

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
        public async Task<IActionResult> UpdateUser([FromForm] UserUpdateDto userUpdateDto)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            var imageData = await MessUtils.ConvertImageToByteArray(userUpdateDto.Profile_picture);

            var newsValues = new
            {
                Profile_picture = RegexUtils.CheckPicture(userUpdateDto.Profile_picture)
                                ? imageData
                                : data_user_now_connect.Profile_picture,

                city = RegexUtils.CheckCity(userUpdateDto.city)
                          ? userUpdateDto.city
                          : data_user_now_connect.city,

                sex = RegexUtils.CheckSex(userUpdateDto.sex)
                         ? userUpdateDto.sex
                         : data_user_now_connect.sex,

                date_of_birth = RegexUtils.CheckDate(userUpdateDto.date_of_birth)
                            ? userUpdateDto.date_of_birth ?? DateTime.MinValue
                            : data_user_now_connect.date_of_birth,
            };

            data_user_now_connect.Profile_picture = newsValues.Profile_picture;
            data_user_now_connect.city = newsValues.city;
            data_user_now_connect.sex = newsValues.sex;
            data_user_now_connect.date_of_birth = newsValues.date_of_birth;

            _userRepository.UpdateUser(data_user_now_connect.Id_User, data_user_now_connect);

            return NoContent();
        }
    }
}