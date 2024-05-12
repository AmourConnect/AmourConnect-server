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

        public async Task AddMessageAsync(Message message)
        {
            _context.Message.Add(message);
            await _context.SaveChangesAsync();
        }


        public async Task<ICollection<GetMessageDto>> GetMessagesAsync(int idUserIssuer, int idUserReceiver)
        {
            return await _context.Message
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
                        .ToListAsync();
        }


        public async Task<bool> DeleteMessageAsync(int id)
        {
            var message = await _context.Message.FirstOrDefaultAsync(m => m.Id_Message == id);

            if (message != null)
            {
                try
                {
                    _context.Message.Remove(message);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (DbUpdateConcurrencyException)
                {
                    _context.Entry(message).Reload();
                    if (message == null)
                    {
                        return true;
                    }
                    return await DeleteMessageAsync(id);
                }
            }

            return false;
        }
    }
}