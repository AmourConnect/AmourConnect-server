using AmourConnect.Domain.Dtos.GetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IRequestFriendsCase
    {
        Task<(bool success, string message, IEnumerable<GetRequestFriendsDto> requestFriends)> GetRequestFriendsAsync();
        Task<(bool success, string message)> AcceptFriendRequestAsync(int IdUserIssuer);
        Task<(bool success, string message)> RequestFriendsAsync(int IdUserReceiver);
    }
}