using Domain.Dtos.GetDtos;
using Domain.Dtos.SetDtos;

namespace Application.Interfaces.Controllers
{
    public interface IMessageCase
    {
        Task<(bool success, string message)> SendMessageAsync(SetMessageDto setmessageDto);
        Task<(bool success, string message, IEnumerable<GetMessageDto> messages)> GetUserMessagesAsync(int Id_UserReceiver);
    }
}