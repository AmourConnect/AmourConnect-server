using Domain.Dtos.GetDtos;
using Domain.Dtos.SetDtos;

namespace Application.Interfaces.Controllers
{
    public interface IUserCase
    {
        Task<(bool succes, string message, IEnumerable<GetUserDto> UsersToMatch)> GetUsersToMach();
        Task<(bool succes, string message, GetUserDto UserToMatch)> GetUserOnly();
        Task<(bool succes, string message)> UpdateUser(SetUserUpdateDto setUserUpdateDto);
        Task<(bool succes, string message, GetUserDto userID)> GetUser(int Id_User);
    }
}