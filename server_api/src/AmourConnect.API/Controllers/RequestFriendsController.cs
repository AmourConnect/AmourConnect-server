using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.AppLayerDtos;
using AmourConnect.Domain.Dtos.GetDtos;
using Microsoft.AspNetCore.Mvc;
using AmourConnect.API.Filters;
using AmourConnect.App.Interfaces.Controllers;
namespace AmourConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUser))]
    public class RequestFriendsController : Controller
    {
        private readonly IRequestFriendsCase _requestFriendsCase;

        public RequestFriendsController(IRequestFriendsCase requestFriendsCase)
        {
            _requestFriendsCase = requestFriendsCase;
        }



        [HttpGet("GetRequestFriends")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ICollection<GetRequestFriendsDto>>))]
        public async Task<IActionResult> GetRequestFriends()
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            var result = await _requestFriendsCase.GetRequestFriendsAsync(token_session_user);

            if (result.success)
            {
                return Ok(result.requestFriends);
            }

            return BadRequest(new ApiResponseDto { message = result.message, succes = false });
        }



        [HttpPost("AddRequest/{IdUserReceiver}")]
        public async Task<IActionResult> RequestFriends([FromRoute] int IdUserReceiver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);

            var result = await _requestFriendsCase.RequestFriendsAsync(token_session_user, IdUserReceiver);

            if (result.success)
            {
                return Ok(new ApiResponseDto { message = result.message, succes = true });
            }

            if (result.message == "User receiver does not exist")
            {
                return BadRequest(new ApiResponseDto { message = result.message, succes = false });
            }

            if (result.message == "A friend request is already pending between these users")
            {
                return Conflict(new ApiResponseDto { message = result.message, succes = false });
            }

            return Conflict(new ApiResponseDto { message = result.message, succes = false });
        }


        [HttpPatch("AcceptRequestFriends/{IdUserIssuer}")]
        public async Task<IActionResult> AcceptFriendRequest([FromRoute] int IdUserIssuer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            var result = await _requestFriendsCase.AcceptFriendRequestAsync(token_session_user, IdUserIssuer);

            if (result.success)
            {
                return Ok(new ApiResponseDto { message = result.message, succes = true });
            }

            return NotFound(new ApiResponseDto { message = result.message, succes = false });
        }
    }
}