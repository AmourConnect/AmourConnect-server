using Microsoft.AspNetCore.Mvc;
using server_api.Dto.GetDto;
using server_api.Dto.SetDto;
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
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public IActionResult GetUsersToMach()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            ICollection<GetUserDto> users = _userRepository.GetUsersToMatch(data_user_now_connect);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }



        [HttpGet("GetUserConnected")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public IActionResult GetUserOnly()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            GetUserDto userDto = new GetUserDto
            {
                Id_User = data_user_now_connect.Id_User,
                Pseudo = data_user_now_connect.Pseudo,
                Profile_picture = data_user_now_connect.Profile_picture,
                city = data_user_now_connect.city,
                sex = data_user_now_connect.sex,
                date_of_birth = data_user_now_connect.date_of_birth
            };
            return Ok(userDto);
        }


        [HttpPatch("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm] SetUserUpdateDto setUserUpdateDto)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            var imageData = await MessUtils.ConvertImageToByteArray(setUserUpdateDto.Profile_picture);

            var newsValues = new
            {
                Profile_picture = RegexUtils.CheckPicture(setUserUpdateDto.Profile_picture)
                                ? imageData
                                : data_user_now_connect.Profile_picture,

                city = RegexUtils.CheckCity(setUserUpdateDto.city)
                          ? setUserUpdateDto.city
                          : data_user_now_connect.city,

                sex = RegexUtils.CheckSex(setUserUpdateDto.sex)
                         ? setUserUpdateDto.sex
                         : data_user_now_connect.sex,

                date_of_birth = RegexUtils.CheckDate(setUserUpdateDto.date_of_birth)
                            ? setUserUpdateDto.date_of_birth ?? DateTime.MinValue
                            : data_user_now_connect.date_of_birth,
            };

            data_user_now_connect.Profile_picture = newsValues.Profile_picture;
            data_user_now_connect.city = newsValues.city;
            data_user_now_connect.sex = newsValues.sex;
            data_user_now_connect.date_of_birth = newsValues.date_of_birth;

            await _userRepository.UpdateUser(data_user_now_connect.Id_User, data_user_now_connect);

            return NoContent();
        }


        [HttpGet("GetUser/{Id_User}")]
        public IActionResult GetUser([FromRoute] int Id_User)
        {
            User user = _userRepository.GetUserByIdUser(Id_User);

            if (user == null)
            {
                return NotFound();
            }

            GetUserDto userDto = new GetUserDto
            {
                Id_User = user.Id_User,
                Pseudo = user.Pseudo,
                Profile_picture = user.Profile_picture,
                city = user.city,
                sex = user.sex,
                date_of_birth = user.date_of_birth
            };
            return Ok(userDto);
        }
    }
}