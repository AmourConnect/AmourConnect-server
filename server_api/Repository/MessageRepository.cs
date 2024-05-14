using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Dto.GetDto;
using server_api.Interfaces;
using server_api.Mappers;
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
            await _context.Message.AddAsync(message);
            await _context.SaveChangesAsync();
        }


        public async Task<ICollection<GetMessageDto>> GetMessagesAsync(int idUserIssuer, int idUserReceiver)
        {
            return await _context.Message
                        .Include(m => m.UserIssuer)
                        .Include(m => m.UserReceiver)
                        .Where(m => (m.IdUserIssuer == idUserIssuer && m.Id_UserReceiver == idUserReceiver) ||
                                    (m.IdUserIssuer == idUserReceiver && m.Id_UserReceiver == idUserIssuer))
                        .Select(m => m.ToGetMessageDto())
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