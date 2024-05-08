using server_api.Dto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers(User data_user_now_connect);
        int? SearchIdUserWithIdGoogle(string emailGoogle, string googleId);
        int? CreateUser(string GoogleId, string EmailGoogle, DateTime? DateOfBirth, string Sex, string Pseudo, string City);
        SessionDataDto UpdateSessionUser(int id_user);
        bool CheckIfPseudoAlreadyExist(string pseudo);
        User GetUserWithCookie(string cookie_user);
        bool UpdateUser(int userId, User user);
    }
}