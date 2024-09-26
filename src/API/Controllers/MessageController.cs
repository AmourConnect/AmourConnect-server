using Domain.Dtos.GetDtos;
using Domain.Dtos.SetDtos;
using Domain.Dtos.AppLayerDtos;
using Microsoft.AspNetCore.Mvc;
using API.Filters;
using Application.Interfaces.Controllers;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUser))]
    public class MessageController(IMessageCase MessageCase) : ControllerBase
    {
        private readonly IMessageCase _messageCase = MessageCase;

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] SetMessageDto setmessageDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message) = await _messageCase.SendMessageAsync(setmessageDto);

            return message == "There must be validation of the friend request to chat"
            ? Conflict(new ApiResponseDto { message = message, succes = false })
            : success
                ? Ok(new ApiResponseDto { message = message, succes = true })
                : BadRequest(new ApiResponseDto { message = message, succes = false });
        }



        [HttpGet("GetUserMessage/{Id_UserReceiver}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetMessageDto>))]
        public async Task<IActionResult> GetUserMessage([FromRoute] int Id_UserReceiver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message, messages) = await _messageCase.GetUserMessagesAsync(Id_UserReceiver);

            return success
            ? Ok(messages) 
            : Conflict(new ApiResponseDto { message = message, succes = false });
        }
    }
}