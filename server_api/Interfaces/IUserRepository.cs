using server_api.Dto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IUserRepository
    {
        ICollection<GetUserOnlyDto> GetUsersToMatch(User data_user_now_connect);
        int? SearchIdUserWithIdGoogle(string EmailGoogle, string userIdGoogle);
        int? CreateUser(string userIdGoogle, string EmailGoogle, DateTime? date_of_birth, string sex, string Pseudo, string city);
        SessionUserDto UpdateSessionUser(int Id_User);
        bool CheckIfPseudoAlreadyExist(string Pseudo);
        User GetUserWithCookie(string token_session_user);
        bool UpdateUser(int Id_User, User user);
        User SearchUserWithIdUser(int Id_User);
        RequestFriends SearchRequestFriend(int IdUserIssuer, int IdUserReceiver);
        void AddRequestFriend(RequestFriends requestFriends);
        ICollection<GetRequestFriendsDto> GetRequestFriends(int Id_User);
        RequestFriends SearchUserFriendRequest(int Id_User, int IdUserIssuer);
        void UpdateStatusRequestFriends(RequestFriends friendRequest);
        void AddMessage(Message Message);
        ICollection<GetMessageDto> GetMessages(int idUserIssuer, int idUserReceiver);
    }
}