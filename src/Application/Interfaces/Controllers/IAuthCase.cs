using Domain.Dtos.SetDtos;

namespace Application.Interfaces.Controllers
{
    public interface IAuthCase
    {
        Task<(bool success, string message)> ValidateGoogleLoginAsync();
        Task<(bool success, string message)> RegisterUserAsync(SetUserRegistrationDto setuserRegistrationDto);
    }
}