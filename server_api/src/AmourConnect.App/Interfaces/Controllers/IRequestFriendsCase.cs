using AmourConnect.Domain.Dtos.GetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IRequestFriendsCase
    {
        Task<(bool success, string message, IEnumerable<GetRequestFriendsDto> requestFriends)> GetRequestFriendsAsync(string token_session_user);
        Task<(bool success, string message)> AcceptFriendRequestAsync(string token_session_user, int IdUserIssuer);
        Task<(bool success, string message)> RequestFriendsAsync(string token_session_user, int IdUserReceiver);
    }
}