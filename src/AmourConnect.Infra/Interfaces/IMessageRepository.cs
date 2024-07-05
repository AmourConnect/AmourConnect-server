using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.GetDtos;

namespace AmourConnect.Infra.Interfaces
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message Message);
        Task<ICollection<GetMessageDto>> GetMessagesAsync(int idUserIssuer, int idUserReceiver);
        Task<bool> DeleteMessageAsync(int Id_Message);
    }
}