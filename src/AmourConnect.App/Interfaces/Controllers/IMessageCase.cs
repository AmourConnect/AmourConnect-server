using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.SetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IMessageCase
    {
        Task<(bool success, string message)> SendMessageAsync(SetMessageDto setmessageDto);
        Task<(bool success, string message, IEnumerable<GetMessageDto> messages)> GetUserMessagesAsync(int Id_UserReceiver);
    }
}