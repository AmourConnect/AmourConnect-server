using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.SetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IUserCase
    {
        Task<ICollection<GetUserDto>> GetUsersToMach(string token_session_user);
        Task<GetUserDto> GetUserOnly(string token_session_user);
        Task UpdateUser(SetUserUpdateDto setUserUpdateDto, string token_session_user);
        Task<GetUserDto> GetUser(int Id_User);
    }
}