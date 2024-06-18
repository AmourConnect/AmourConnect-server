using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;

namespace AmourConnect.App.UseCases.Controllers
{
    internal class RequestFriendsCase : IRequestFriendsCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestFriendsRepository _requestFriendsRepository;

        public RequestFriendsCase(IUserRepository userRepository, IRequestFriendsRepository requestFriendsRepository)
        {
            _userRepository = userRepository;
            _requestFriendsRepository = requestFriendsRepository;
        }

        public async Task<(bool success, string message, IEnumerable<GetRequestFriendsDto> requestFriends)> GetRequestFriendsAsync(string token_session_user)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            ICollection<GetRequestFriendsDto> requestFriends = await _requestFriendsRepository.GetRequestFriendsAsync(dataUserNowConnect.Id_User);

            return (true, "Request friends retrieved successfully", requestFriends);
        }

        public async Task<(bool success, string message)> AcceptFriendRequestAsync(string token_session_user, int IdUserIssuer)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            RequestFriends friendRequest = await _requestFriendsRepository.GetUserFriendRequestByIdAsync(dataUserNowConnect.Id_User, IdUserIssuer);

            if (friendRequest == null)
            {
                return (false, "Friend request not found");
            }

            friendRequest.Status = RequestStatus.Accepted;

            await _requestFriendsRepository.UpdateStatusRequestFriendsAsync(friendRequest);

            await EmailUtils.AcceptRequestFriendMailAsync(friendRequest.UserIssuer.EmailGoogle, friendRequest.UserIssuer.Pseudo, dataUserNowConnect.Pseudo);

            return (true, "Request friend accepted");
        }

        public async Task<(bool success, string message)> RequestFriendsAsync(string token_session_user, int IdUserReceiver)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            User userReceiver = await _userRepository.GetUserByIdUserAsync(IdUserReceiver);

            if (userReceiver == null)
            {
                return (false, "User receiver does not exist");
            }

            if (dataUserNowConnect.Id_User == userReceiver.Id_User)
            {
                return (false, "User cannot send a friend request to themselves");
            }

            RequestFriends existingRequest = await _requestFriendsRepository.GetRequestFriendByIdAsync(dataUserNowConnect.Id_User, IdUserReceiver);

            if (existingRequest != null)
            {
                if (existingRequest.Status == RequestStatus.Onhold)
                {
                    return (false, "A friend request is already pending between these users");
                }

                return (false, "These users are already friends");
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

            return (true, "Request friend carried out");
        }
    }
}