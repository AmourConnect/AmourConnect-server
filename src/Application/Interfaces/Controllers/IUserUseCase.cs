using Domain.Dtos.SetDtos;

namespace Application.Interfaces.Controllers
{
    public interface IUserUseCase
    {
        Task GetUsersToMach();
        Task GetUserConnected();
        Task UpdateUser(SetUserUpdateDto setUserUpdateDto);
        Task GetUser(int Id_User);
    }
}