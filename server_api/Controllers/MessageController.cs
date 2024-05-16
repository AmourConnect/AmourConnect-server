using Microsoft.AspNetCore.Mvc;
using server_api.Dto.GetDto;
using server_api.Dto.SetDto;
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, setmessageDto.IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new ALApiResponse { message = "There must be validation of the friend request to chat", succes = false });
                }

                if (!RegexUtils.CheckMessage(setmessageDto.MessageContent))
                {
                    return BadRequest(new ALApiResponse { message = "Message no valid", succes = false });
                }

                var message = new Message
                {
                    IdUserIssuer = dataUserNowConnect.Id_User,
                    Id_UserReceiver = setmessageDto.IdUserReceiver,
                    message_content = setmessageDto.MessageContent,
                    Date_of_request = DateTime.Now.ToUniversalTime(),
                };

                await _messageRepository.AddMessageAsync(message);

                return Ok(new ALApiResponse { message = "Message send succes", succes = true});
            }
            return Conflict(new ALApiResponse { message = "You are not friends to talk together", succes = false });
        }



        [HttpGet("GetUserMessage/{Id_UserReceiver}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetMessageDto>))]
        public async Task<IActionResult> GetUserMessage([FromRoute] int Id_UserReceiver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string token_session_user = CookieUtils.GetCookieUser(HttpContext);
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, Id_UserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return Conflict(new ALApiResponse { message = "There must be validation of the friend request to chat", succes = false });
                }

                ICollection<GetMessageDto> msg = await _messageRepository.GetMessagesAsync(dataUserNowConnect.Id_User, Id_UserReceiver);

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
            return Conflict(new ALApiResponse { message = "You are not friends to talk together", succes = false });
        }
    }
}