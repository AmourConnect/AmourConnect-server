using AmourConnect.Domain.Dtos.SetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IAuthCase
    {
        Task<(bool success, string message)> ValidateGoogleLoginAsync();
        Task<(bool success, string message)> RegisterUserAsync(SetUserRegistrationDto setuserRegistrationDto, string userIdGoogle, string emailGoogle);
    }
}