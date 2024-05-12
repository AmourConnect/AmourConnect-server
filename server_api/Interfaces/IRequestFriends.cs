using server_api.Dto.GetDto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IRequestFriends
    {
        ICollection<GetRequestFriendsDto> GetRequestFriends(int Id_User);
        RequestFriends GetRequestFriendById(int IdUserIssuer, int IdUserReceiver);
        void AddRequestFriend(RequestFriends requestFriends);
        RequestFriends GetUserFriendRequestById(int Id_User, int IdUserIssuer);
        void UpdateStatusRequestFriends(RequestFriends friendRequest);
        Task<RequestFriends> GetRequestFriendByIdAsync(int IdUserIssuer, int IdUserReceiver);
    }
}