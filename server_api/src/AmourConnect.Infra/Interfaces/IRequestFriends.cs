using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.GetDtos;

namespace AmourConnect.Infra.Interfaces
{
    public interface IRequestFriends
    {
        Task<ICollection<GetRequestFriendsDto>> GetRequestFriendsAsync(int Id_User);
        Task<RequestFriends> GetRequestFriendByIdAsync(int IdUserIssuer, int IdUserReceiver);
        Task AddRequestFriendAsync(RequestFriends requestFriends);
        Task<RequestFriends> GetUserFriendRequestByIdAsync(int Id_User, int IdUserIssuer);
        Task UpdateStatusRequestFriendsAsync(RequestFriends friendRequest);
    }
}