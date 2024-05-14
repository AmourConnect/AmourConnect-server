using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Dto.GetDto;
using server_api.Interfaces;
using server_api.Mappers;
using server_api.Models;

namespace server_api.Repository
{
    public class RequestFriendsRepository : IRequestFriends
    {
        private readonly ApiDbContext _context;

        public RequestFriendsRepository(ApiDbContext context)
        {
            _context = context;
        }


        public async Task<ICollection<GetRequestFriendsDto>> GetRequestFriendsAsync(int Id_User)
        {
            return await _context.RequestFriends
                .Include(r => r.UserIssuer)
                .Include(r => r.UserReceiver)
                .Where(r => r.IdUserIssuer == Id_User || r.Id_UserReceiver == Id_User)
                .Select(r => r.ToGetRequestFriendsDto())
                .ToListAsync();
        }

        public async Task<RequestFriends> GetRequestFriendByIdAsync(int IdUserIssuer, int IdUserReceiver)
        {
            return await _context.RequestFriends
                    .Where(r => (r.IdUserIssuer == IdUserIssuer && r.Id_UserReceiver == IdUserReceiver)
                        || (r.IdUserIssuer == IdUserReceiver && r.Id_UserReceiver == IdUserIssuer))
                        .FirstOrDefaultAsync();
        }


        public async Task AddRequestFriendAsync(RequestFriends requestFriends)
        {
            await _context.RequestFriends.AddAsync(requestFriends);
            await _context.SaveChangesAsync();
        }


        public async Task<RequestFriends> GetUserFriendRequestByIdAsync(int Id_User, int IdUserIssuer)
        {
            return await _context.RequestFriends
        .Include(r => r.UserIssuer)
        .Include(r => r.UserReceiver)
        .FirstOrDefaultAsync(r =>
            (r.IdUserIssuer == IdUserIssuer && r.Id_UserReceiver == Id_User && r.Status == RequestStatus.Onhold));
        }



        public async Task UpdateStatusRequestFriendsAsync(RequestFriends friendRequest)
        {
            _context.Entry(friendRequest).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}