using Domain.Entities;
using Domain.Dtos.GetDtos;

namespace Infrastructure.Interfaces
{
    public interface IRequestFriendsRepository
    {
        Task<ICollection<GetRequestFriendsDto>> GetRequestFriendsAsync(int Id_User);
        Task<RequestFriends> GetRequestFriendByIdAsync(int IdUserIssuer, int IdUserReceiver);
        Task AddRequestFriendAsync(RequestFriends requestFriends);
        Task<RequestFriends> GetUserFriendRequestByIdAsync(int Id_User, int IdUserIssuer);
        Task UpdateStatusRequestFriendsAsync(RequestFriends friendRequest);
    }
}