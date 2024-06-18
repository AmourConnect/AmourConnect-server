using AmourConnect.API.Services;
using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.SetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;

namespace AmourConnect.App.UseCases.Controllers
{
    internal class MessageCase : IMessageCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestFriendsRepository _requestFriendsRepository;
        private readonly IMessageRepository _messageRepository;

        public MessageCase(IUserRepository userRepository, IRequestFriendsRepository RequestFriendsRepository, IMessageRepository MessageRepository)
        {
            _userRepository = userRepository;
            _requestFriendsRepository = RequestFriendsRepository;
            _messageRepository = MessageRepository;
        }

        public async Task<(bool success, string message)> SendMessageAsync(string token_session_user, SetMessageDto setmessageDto)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, setmessageDto.IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return (false, "There must be validation of the friend request to chat");
                }

                if (!RegexUtils.CheckMessage(setmessageDto.MessageContent))
                {
                    return (false, "Message no valid");
                }

                var message = new Message
                {
                    IdUserIssuer = dataUserNowConnect.Id_User,
                    Id_UserReceiver = setmessageDto.IdUserReceiver,
                    message_content = setmessageDto.MessageContent,
                    Date_of_request = DateTime.Now.ToUniversalTime(),
                };

                await _messageRepository.AddMessageAsync(message);

                return (true, "Message send succes");
            }
            return (false, "You are not friends to talk together");
        }

        public async Task<(bool success, string message, IEnumerable<GetMessageDto> messages)> GetUserMessagesAsync(string token_session_user, int Id_UserReceiver)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, Id_UserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return (false, "There must be validation of the friend request to chat", null);
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

                return (true, "Messages retrieved successfully", msg);
            }
            return (false, "You are not friends to talk together", null);
        }

    }
}