using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.AppLayerDtos;
using AmourConnect.Domain.Dtos.SetDtos;
namespace AmourConnect.Infra.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<GetUserDto>> GetUsersToMatchAsync(User dataUserNowConnect);
        Task<int?> GetUserIdWithGoogleIdAsync(string EmailGoogle, string userIdGoogle);
        Task<int?> CreateUserAsync(string userIdGoogle, string EmailGoogle, SetUserRegistrationDto setUserRegistrationDto);
        Task UpdateSessionUserAsync(int Id_User, SessionUserDto JWTGenerate);
        Task<bool> GetUserByPseudoAsync(string Pseudo);
        Task<bool> UpdateUserAsync(int Id_User, User user);
        Task<User> GetUserByIdUserAsync(int Id_User);
        Task<User> GetUserWithCookieAsync(string token_session_user);
    }
}