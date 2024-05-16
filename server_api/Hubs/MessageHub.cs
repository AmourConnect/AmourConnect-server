using Microsoft.AspNetCore.SignalR;
using server_api.Filters;
using Microsoft.AspNetCore.Mvc;
using server_api.Dto.GetDto;
using server_api.Dto.SetDto;
using server_api.Interfaces;
using server_api.Dto.AppLayerDto;
using server_api.Models;
using server_api.Utils;
using server_api.Hubs;


namespace server_api.Hubs
{
    // [ServiceFilter(typeof(AuthorizeUserConnectAsync))]
    public class MessageHub : Hub
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestFriends _requestFriendsRepository;
        private readonly IMessage _messageRepository;

        public MessageHub(IUserRepository userRepository, IRequestFriends RequestFriendsRepository, IMessage MessageRepository)
        {
            _userRepository = userRepository;
            _requestFriendsRepository = RequestFriendsRepository;
            _messageRepository = MessageRepository;
        }

        public async Task JoinChat(TesteModelTchat conn)
        {
            await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{conn.pseudo} has joined");
        }

        public async Task SpecificChatRoom(TesteModelTchat conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.message);

            await Clients.Group(conn.message)
            .SendAsync("ReceiveMessage", "admin", $"{conn.pseudo} has joined {conn.message}");

        }
    }
}