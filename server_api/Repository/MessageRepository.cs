using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Dto.GetDto;
using server_api.Interfaces;
using server_api.Models;

namespace server_api.Repository
{
    public class MessageRepository : IMessage
    {
        private readonly ApiDbContext _context;

        public MessageRepository(ApiDbContext context)
        {
            _context = context;
        }

        public void AddMessage(Message Message)
        {
            _context.Message.Add(Message);
            _context.SaveChangesAsync();
        }


        public ICollection<GetMessageDto> GetMessages(int idUserIssuer, int idUserReceiver)
        {
            return _context.Message
                .Where(m => (m.IdUserIssuer == idUserIssuer && m.Id_UserReceiver == idUserReceiver) ||
                            (m.IdUserIssuer == idUserReceiver && m.Id_UserReceiver == idUserIssuer))
                .Select(m => new GetMessageDto
                {
                    Id_Message = m.Id_Message,
                    message_content = m.message_content,
                    IdUserIssuer = m.IdUserIssuer,
                    UserIssuerPseudo = m.UserIssuer.Pseudo,
                    Id_UserReceiver = m.Id_UserReceiver,
                    UserReceiverPseudo = m.UserReceiver.Pseudo,
                    Date_of_request = m.Date_of_request
                })
                .ToList();
        }


        public bool DeleteMessage(int id)
        {
            var message = _context.Message.FirstOrDefault(m => m.Id_Message == id);

            if (message != null)
            {
                try
                {
                    _context.Message.Remove(message);
                    _context.SaveChanges();
                    return true;
                }
                catch (DbUpdateConcurrencyException)
                {
                    _context.Entry(message).Reload();
                    if (message == null)
                    {
                        return true;
                    }
                    return DeleteMessage(id);
                }
            }

            return false;
        }
    }
}