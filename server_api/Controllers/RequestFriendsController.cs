using Microsoft.AspNetCore.Mvc;
using server_api.Dto.GetDto;
using server_api.Filters;
using server_api.Interfaces;
using server_api.Models;
using server_api.Utils;


namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUserConnect))]
    public class RequestFriendsController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestFriends _requestFriendsRepository;

        public RequestFriendsController(IUserRepository userRepository, IRequestFriends RequestFriendsRepository)
        {
            _userRepository = userRepository;
            _requestFriendsRepository = RequestFriendsRepository;
        }



        [HttpGet("GetRequestFriends")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ICollection<GetRequestFriendsDto>>))]
        public IActionResult GetRequestFriends()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            ICollection<GetRequestFriendsDto> requestFriends = _requestFriendsRepository.GetRequestFriends(data_user_now_connect.Id_User);

            return Ok(requestFriends);
        }



        [HttpPost("AddRequest/{IdUserReceiver}")]
        public IActionResult RequestFriends([FromRoute] int IdUserReceiver)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);


            User userReceiver = _userRepository.GetUserByIdUser(IdUserReceiver);


            if (userReceiver == null)
            {
                return BadRequest(new { message = "User receiver do not exist" });
            }


            if (data_user_now_connect.Id_User == userReceiver.Id_User)
            {
                return BadRequest(new { message = "User cannot send a friend request to themselves" });
            }


            RequestFriends existingRequest = _requestFriendsRepository.GetRequestFriendById(data_user_now_connect.Id_User, IdUserReceiver);

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

            _requestFriendsRepository.AddRequestFriend(requestFriends);

            return Ok(new { message = "Request Friend carried out" });
        }


        [HttpPatch("AcceptRequestFriends/{IdUserIssuer}")]
        public IActionResult AcceptFriendRequest([FromRoute] int IdUserIssuer)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = _userRepository.GetUserWithCookie(token_session_user);

            RequestFriends friendRequest = _requestFriendsRepository.GetUserFriendRequestById(data_user_now_connect.Id_User, IdUserIssuer);

            if (friendRequest == null)
            {
                return NotFound();
            }

            friendRequest.Status = RequestStatus.Accepted;

            _requestFriendsRepository.UpdateStatusRequestFriends(friendRequest);

            return Ok(new { message = "Request Friend accepted" });
        }
    }
}