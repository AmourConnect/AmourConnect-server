using Microsoft.AspNetCore.Mvc;
using server_api.Dto.GetDto;
using server_api.Filters;
using server_api.Interfaces;
using server_api.Dto.AppLayerDto;
using server_api.Models;
using server_api.Utils;


namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUserConnectAsync))]
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
        public async Task<IActionResult> GetRequestFriends()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            ICollection<GetRequestFriendsDto> requestFriends = await _requestFriendsRepository.GetRequestFriendsAsync(dataUserNowConnect.Id_User);

            return Ok(requestFriends);
        }



        [HttpPost("AddRequest/{IdUserReceiver}")]
        public async Task<IActionResult> RequestFriends([FromRoute] int IdUserReceiver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);


            User userReceiver = await _userRepository.GetUserByIdUserAsync(IdUserReceiver);


            if (userReceiver == null)
            {
                return BadRequest(new ALApiResponse { message = "User receiver do not exist", succes = false });
            }


            if (dataUserNowConnect.Id_User == userReceiver.Id_User)
            {
                return BadRequest(new ALApiResponse { message = "User cannot send a friend request to themselves", succes = false });
            }


            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new ALApiResponse { message = "A friend request is already pending between these users", succes = false });
                }
                
                return Conflict(new ALApiResponse { message = "These users are already friends", succes = false });
            }

            RequestFriends requestFriends = new RequestFriends
            {
                UserIssuer = dataUserNowConnect,
                UserReceiver = userReceiver,
                Status = RequestStatus.Onhold,
                Date_of_request = DateTime.Now.ToUniversalTime()
            };

            await _requestFriendsRepository.AddRequestFriendAsync(requestFriends);

            await EmailUtils.RequestFriendMailAsync(userReceiver.EmailGoogle, userReceiver.Pseudo , dataUserNowConnect.Pseudo);

            return Ok(new ALApiResponse { message = "Request Friend carried out", succes = true });
        }


        [HttpPatch("AcceptRequestFriends/{IdUserIssuer}")]
        public async Task<IActionResult> AcceptFriendRequest([FromRoute] int IdUserIssuer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends friendRequest = await _requestFriendsRepository.GetUserFriendRequestByIdAsync(dataUserNowConnect.Id_User, IdUserIssuer);

            if (friendRequest == null)
            {
                return NotFound();
            }

            friendRequest.Status = RequestStatus.Accepted;

            await _requestFriendsRepository.UpdateStatusRequestFriendsAsync(friendRequest);

            await EmailUtils.AcceptRequestFriendMailAsync(friendRequest.UserIssuer.EmailGoogle, friendRequest.UserIssuer.Pseudo, dataUserNowConnect.Pseudo);

            return Ok(new ALApiResponse { message = "Request Friend accepted", succes = true });
        }
    }
}