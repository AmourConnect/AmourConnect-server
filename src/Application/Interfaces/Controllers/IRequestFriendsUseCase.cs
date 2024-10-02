namespace Application.Interfaces.Controllers
{
    public interface IRequestFriendsUseCase
    {
        Task GetRequestFriendsAsync();
        Task AcceptFriendRequestAsync(int IdUserIssuer);
        Task RequestFriendsAsync(int IdUserReceiver);
    }
}