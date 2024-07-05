using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.SetDtos;

namespace AmourConnect.App.Interfaces.Controllers
{
    public interface IMessageCase
    {
        Task<(bool success, string message)> SendMessageAsync(string token_session_user, SetMessageDto setmessageDto);
        Task<(bool success, string message, IEnumerable<GetMessageDto> messages)> GetUserMessagesAsync(string token_session_user, int Id_UserReceiver);
    }
}