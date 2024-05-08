using server_api.Dto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers(User data_user_now_connect);
        int? SearchIdUserWithIdGoogle(string EmailGoogle, string userIdGoogle);
        int? CreateUser(string userIdGoogle, string EmailGoogle, DateTime? date_of_birth, string sex, string Pseudo, string city);
        SessionUserDto UpdateSessionUser(int Id_User);
        bool CheckIfPseudoAlreadyExist(string Pseudo);
        User GetUserWithCookie(string token_session_user);
        bool UpdateUser(int Id_User, User user);
    }
}