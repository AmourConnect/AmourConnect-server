using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.AspNetCore.Http;

namespace AmourConnect.App.UseCases.Controllers
{
    internal class RequestFriendsCase : IRequestFriendsCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestFriendsRepository _requestFriendsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private string token_session_user;


        public RequestFriendsCase(IUserRepository userRepository, IRequestFriendsRepository requestFriendsRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _requestFriendsRepository = requestFriendsRepository;
            _httpContextAccessor = httpContextAccessor;
            token_session_user = CookieUtils.GetCookieUser(_httpContextAccessor.HttpContext);
        }

        public async Task<(bool success, string message, IEnumerable<GetRequestFriendsDto> requestFriends)> GetRequestFriendsAsync()
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            ICollection<GetRequestFriendsDto> requestFriends = await _requestFriendsRepository.GetRequestFriendsAsync(dataUserNowConnect.Id_User);

            List<GetRequestFriendsDto> filteredRequestFriends = new List<GetRequestFriendsDto>();

            foreach(GetRequestFriendsDto requestFriend in requestFriends)
            {
                if (dataUserNowConnect.Id_User == requestFriend.Id_UserReceiver)
                {
                    requestFriend.UserReceiverPictureProfile = null;
                }
                else
                {
                    requestFriend.UserIssuerPictureProfile = null;
                }

                filteredRequestFriends.Add(requestFriend);
            }

            requestFriends = filteredRequestFriends;

            return (true, "Request friends retrieved successfully", requestFriends);
        }

        public async Task<(bool success, string message)> AcceptFriendRequestAsync(int IdUserIssuer)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends friendRequest = await _requestFriendsRepository.GetUserFriendRequestByIdAsync(dataUserNowConnect.Id_User, IdUserIssuer);

            if (friendRequest == null)
            {
                return (false, "Match request not found");
            }

            friendRequest.Status = RequestStatus.Accepted;

            await _requestFriendsRepository.UpdateStatusRequestFriendsAsync(friendRequest);

            await EmailUtils.AcceptRequestFriendMailAsync(friendRequest.UserIssuer, dataUserNowConnect);

            return (true, "Request match accepted");
        }

        public async Task<(bool success, string message)> RequestFriendsAsync(int IdUserReceiver)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            User userReceiver = await _userRepository.GetUserByIdUserAsync(IdUserReceiver);

            if (userReceiver == null)
            {
                return (false, "User receiver does not exist");
            }

            if (dataUserNowConnect.Id_User == userReceiver.Id_User)
            {
                return (false, "User cannot send a match request to themselves");
            }

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return (false, "A match request is already pending between these users");
                }

                return (false, "You have already matched with this user");
            }

            RequestFriends requestFriends = new()
            {
                UserIssuer = dataUserNowConnect,
                UserReceiver = userReceiver,
                Status = RequestStatus.Onhold,
                Date_of_request = DateTime.Now.ToUniversalTime()
            };

            await _requestFriendsRepository.AddRequestFriendAsync(requestFriends);

            await EmailUtils.RequestFriendMailAsync(userReceiver, dataUserNowConnect);

            return (true, "Your match request has been made successfully 💕");
        }
    }
}