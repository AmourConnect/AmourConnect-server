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
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserOnlyDto>))]

        public IActionResult GetUsersToMach()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            var users = _userRepository.GetUsersToMatch(data_user_now_connect);

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
                Profile_picture = data_user_now_connect.Profile_picture,
                city = data_user_now_connect.city,
                sex = data_user_now_connect.sex,
                date_of_birth = data_user_now_connect.date_of_birth
            };
            return Ok(userDto);
        }



        [HttpGet("GetRequestFriends")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ICollection<GetRequestFriendsDto>>))]
        public ActionResult GetRequestFriends()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            ICollection<GetRequestFriendsDto> requestFriends = _userRepository.GetRequestFriends(data_user_now_connect.Id_User);

            return Ok(requestFriends);
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



        [HttpPost("RequestFriends/{IdUserReceiver}")]
        public IActionResult RequestFriends([FromRoute] int IdUserReceiver)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);


            User userReceiver = _userRepository.SearchUserWithIdUser(IdUserReceiver);


            if (userReceiver == null)
            {
                return BadRequest(new { message = "User receiver do not exist" });
            }


            if (data_user_now_connect.Id_User == userReceiver.Id_User)
            {
                return BadRequest(new { message = "User cannot send a friend request to themselves" });
            }


            RequestFriends existingRequest = _userRepository.SearchRequestFriend(data_user_now_connect.Id_User, IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new { message = "A friend request is already pending between these users" });
                }
                else
                {
                    return Conflict(new { message = "These users are already friends" });
                }
            }

            RequestFriends requestFriends = new RequestFriends
            {
                UserIssuer = data_user_now_connect,
                UserReceiver = userReceiver,
                Status = RequestStatus.Onhold,
                Date_of_request = DateTime.Now.ToUniversalTime()
            };

            _userRepository.AddRequestFriend(requestFriends);

            return Ok(new { message = "Request Friend carried out" });
        }


        [HttpPatch("AcceptRequestFriends/{IdUserIssuer}")]
        public IActionResult AcceptFriendRequest([FromRoute] int IdUserIssuer)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            RequestFriends friendRequest = _userRepository.SearchUserFriendRequest(data_user_now_connect.Id_User, IdUserIssuer);

            if (friendRequest == null)
            {
                return NotFound();
            }

            friendRequest.Status = RequestStatus.Accepted;

            _userRepository.UpdateStatusRequestFriends(friendRequest);

            return Ok(new { message = "Request Friend accepted" });
        }


        [HttpGet("GetUser/{Id_User}")]
        public IActionResult GetUser([FromRoute] int Id_User)
        {
            User user = _userRepository.SearchUserWithIdUser(Id_User);

            if (user == null)
            {
                return NotFound();
            }

            GetUserOnlyDto userDto = new GetUserOnlyDto
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