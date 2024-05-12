using server_api.Dto.GetDto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IMessage
    {
        Task AddMessageAsync(Message Message);
        Task<ICollection<GetMessageDto>> GetMessagesAsync(int idUserIssuer, int idUserReceiver);
        Task<bool> DeleteMessageAsync(int Id_Message);
    }
}