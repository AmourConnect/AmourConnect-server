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
    public class MessageController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestFriends _requestFriendsRepository;
        private readonly IMessage _messageRepository;

        public MessageController(IUserRepository userRepository, IRequestFriends RequestFriendsRepository, IMessage MessageRepository)
        {
            _userRepository = userRepository;
            _requestFriendsRepository = RequestFriendsRepository;
            _messageRepository = MessageRepository;
        }



        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] SetMessageDto setmessageDto)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(data_user_now_connect.Id_User, setmessageDto.IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new { message = "There must be validation of the friend request to chat" });
                }

                if (!RegexUtils.CheckMessage(setmessageDto.MessageContent))
                {
                    return BadRequest(new { message = "Message no valid" });
                }

                var message = new Message
                {
                    IdUserIssuer = data_user_now_connect.Id_User,
                    Id_UserReceiver = setmessageDto.IdUserReceiver,
                    message_content = setmessageDto.MessageContent,
                    Date_of_request = DateTime.Now.ToUniversalTime(),
                };

                await _messageRepository.AddMessageAsync(message);

                return Ok("Message send succes");
            }
            return Conflict(new { message = "You are not friends to talk together" });
        }



        [HttpGet("GetUserMessage/{Id_UserReceiver}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetMessageDto>))]
        public async Task<IActionResult> GetUserMessage([FromRoute] int Id_UserReceiver)
        {
            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User data_user_now_connect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(data_user_now_connect.Id_User, Id_UserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new { message = "There must be validation of the friend request to chat" });
                }

                ICollection<GetMessageDto> msg = await _messageRepository.GetMessagesAsync(data_user_now_connect.Id_User, Id_UserReceiver);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var sortedMessages = msg.OrderBy(m => m.Date_of_request);

                if (sortedMessages.Count() > 50)
                {
                    var messagesToDelete = sortedMessages.Take(30);
                    foreach (var message in messagesToDelete)
                    {
                        await _messageRepository.DeleteMessageAsync(message.Id_Message);
                    }
                }

                return Ok(msg);
            }
            return Conflict(new { message = "You are not friends to talk together" });
        }
    }
}