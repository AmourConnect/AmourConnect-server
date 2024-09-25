using Domain.Dtos.AppLayerDtos;
using Domain.Dtos.GetDtos;
using Microsoft.AspNetCore.Mvc;
using API.Filters;
using Application.Interfaces.Controllers;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUser))]
    public class RequestFriendsController(IRequestFriendsCase requestFriendsCase) : ControllerBase
    {
        private readonly IRequestFriendsCase _requestFriendsCase = requestFriendsCase;


        [HttpGet("GetRequestFriends")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ICollection<GetRequestFriendsDto>>))]
        public async Task<IActionResult> GetRequestFriends()
        {
            var (success, message, requestFriends) = await _requestFriendsCase.GetRequestFriendsAsync();

            return success
            ? Ok(requestFriends)
            : BadRequest(new ApiResponseDto { message = message, succes = false });
        }



        [HttpPost("AddRequest/{IdUserReceiver}")]
        public async Task<IActionResult> RequestFriends([FromRoute] int IdUserReceiver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message) = await _requestFriendsCase.RequestFriendsAsync(IdUserReceiver);

            return message == "User receiver does not exist"
            ? BadRequest(new ApiResponseDto { message = message, succes = false })
            : success
                ? Ok(new ApiResponseDto { message = message, succes = true })
                : Conflict(new ApiResponseDto { message = message, succes = false });
        }


        [HttpPatch("AcceptRequestFriends/{IdUserIssuer}")]
        public async Task<IActionResult> AcceptFriendRequest([FromRoute] int IdUserIssuer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message) = await _requestFriendsCase.AcceptFriendRequestAsync(IdUserIssuer);

            return success
            ? Ok(new ApiResponseDto { message = message, succes = true })
            : NotFound(new ApiResponseDto { message = message, succes = false });
        }
    }
}