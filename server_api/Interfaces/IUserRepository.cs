using server_api.Dto.AppLayerDto;
using server_api.Dto.GetDto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IUserRepository
    {
        ICollection<GetUserDto> GetUsersToMatch(User data_user_now_connect);
        int? GetUserIdWithGoogleId(string EmailGoogle, string userIdGoogle);
        int? CreateUser(string userIdGoogle, string EmailGoogle, DateTime? date_of_birth, string sex, string Pseudo, string city);
        ALSessionUserDto UpdateSessionUser(int Id_User);
        bool GetUserByPseudo(string Pseudo);
        User GetUserWithCookie(string token_session_user);
        bool UpdateUser(int Id_User, User user);
        User GetUserByIdUser(int Id_User);
    }
}