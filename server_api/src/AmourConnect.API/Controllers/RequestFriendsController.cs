using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.AppLayerDtos;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AmourConnect.API.Filters;
namespace AmourConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUser))]
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
                return BadRequest(new ApiResponseDto { message = "User receiver do not exist", succes = false });
            }


            if (dataUserNowConnect.Id_User == userReceiver.Id_User)
            {
                return BadRequest(new ApiResponseDto { message = "User cannot send a friend request to themselves", succes = false });
            }


            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new ApiResponseDto { message = "A friend request is already pending between these users", succes = false });
                }

                return Conflict(new ApiResponseDto { message = "These users are already friends", succes = false });
            }

            RequestFriends requestFriends = new RequestFriends
            {
                UserIssuer = dataUserNowConnect,
                UserReceiver = userReceiver,
                Status = RequestStatus.Onhold,
                Date_of_request = DateTime.Now.ToUniversalTime()
            };

            await _requestFriendsRepository.AddRequestFriendAsync(requestFriends);

            await EmailUtils.RequestFriendMailAsync(userReceiver.EmailGoogle, userReceiver.Pseudo, dataUserNowConnect.Pseudo);

            return Ok(new ApiResponseDto { message = "Request Friend carried out", succes = true });
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

            return Ok(new ApiResponseDto { message = "Request Friend accepted", succes = true });
        }
    }
}