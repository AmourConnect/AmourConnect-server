using server_api.Dto.GetDto;
using server_api.Models;

namespace server_api.Interfaces
{
    public interface IMessage
    {
        void AddMessage(Message Message);
        ICollection<GetMessageDto> GetMessages(int idUserIssuer, int idUserReceiver);
        bool DeleteMessage(int Id_Message);
    }
}