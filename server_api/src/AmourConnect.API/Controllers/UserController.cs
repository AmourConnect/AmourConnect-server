using AmourConnect.API.Services;
using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Api.Dtos.SetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AmourConnect.API.Filters;
using AmourConnect.Infra.Mappers;
namespace AmourConnect.API.Controllers
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
        public async Task<IActionResult> GetUsersToMach()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            ICollection<GetUserDto> users = await _userRepository.GetUsersToMatchAsync(dataUserNowConnect);

            return Ok(users);
        }



        [HttpGet("GetUserConnected")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUserOnly()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            GetUserDto userDto = dataUserNowConnect.ToGetUserDto();
            return Ok(userDto);
        }


        [HttpPatch("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm] SetUserUpdateDto setUserUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            var imageData = await CookieUtils.ConvertImageToByteArrayAsync(setUserUpdateDto.Profile_picture);

            var newsValues = new
            {
                Profile_picture = RegexUtils.CheckPicture(setUserUpdateDto.Profile_picture)
                                ? imageData
                                : dataUserNowConnect.Profile_picture,

                city = RegexUtils.CheckCity(setUserUpdateDto.city)
                          ? setUserUpdateDto.city
                          : dataUserNowConnect.city,

                Description = RegexUtils.CheckDescription(setUserUpdateDto.Description)
                          ? setUserUpdateDto.Description
                          : dataUserNowConnect.Description,

                sex = RegexUtils.CheckSex(setUserUpdateDto.sex)
                         ? setUserUpdateDto.sex
                         : dataUserNowConnect.sex,

                date_of_birth = RegexUtils.CheckDate(setUserUpdateDto.date_of_birth)
                            ? setUserUpdateDto.date_of_birth ?? DateTime.MinValue
                            : dataUserNowConnect.date_of_birth,
            };

            dataUserNowConnect.Profile_picture = newsValues.Profile_picture;
            dataUserNowConnect.city = newsValues.city;
            dataUserNowConnect.sex = newsValues.sex;
            dataUserNowConnect.Description = newsValues.Description;
            dataUserNowConnect.date_of_birth = newsValues.date_of_birth;

            await _userRepository.UpdateUserAsync(dataUserNowConnect.Id_User, dataUserNowConnect);

            return NoContent();
        }


        [HttpGet("GetUser/{Id_User}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUser([FromRoute] int Id_User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User user = await _userRepository.GetUserByIdUserAsync(Id_User);

            if (user == null)
            {
                return NotFound();
            }

            GetUserDto userDto = user.ToGetUserDto();

            return Ok(userDto);
        }
    }
}