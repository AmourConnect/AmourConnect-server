using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.SetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IUserCase
    {
        Task<ICollection<GetUserDto>> GetUsersToMach();
        Task<GetUserDto> GetUserOnly();
        Task UpdateUser(SetUserUpdateDto setUserUpdateDto);
        Task<GetUserDto> GetUser(int Id_User);
    }
}