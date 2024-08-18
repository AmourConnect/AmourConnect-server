using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using AmourConnect.Infra.Persistence;
using Microsoft.EntityFrameworkCore;
using AmourConnect.Domain.Mappers;

namespace AmourConnect.Infra.Repository
{
    internal class RequestFriendsRepository(AmourConnectDbContext _context) : IRequestFriendsRepository
    {
        public async Task<ICollection<GetRequestFriendsDto>> GetRequestFriendsAsync(int Id_User) =>
            await _context.RequestFriends
                .Include(r => r.UserIssuer)
                .Include(r => r.UserReceiver)
                .Where(r => r.IdUserIssuer == Id_User || r.Id_UserReceiver == Id_User)
                .Select(r => r.ToGetRequestFriendsDto())
                .ToListAsync();

        public async Task<RequestFriends> GetRequestFriendByIdAsync(int IdUserIssuer, int IdUserReceiver) =>
            await _context.RequestFriends
                    .Where(r => (r.IdUserIssuer == IdUserIssuer && r.Id_UserReceiver == IdUserReceiver)
                        || (r.IdUserIssuer == IdUserReceiver && r.Id_UserReceiver == IdUserIssuer))
                        .FirstOrDefaultAsync();


        public async Task AddRequestFriendAsync(RequestFriends requestFriends)
        {
            await _context.RequestFriends.AddAsync(requestFriends);
            await _context.SaveChangesAsync();
        }


        public async Task<RequestFriends> GetUserFriendRequestByIdAsync(int Id_User, int IdUserIssuer) =>
            await _context.RequestFriends
        .Include(r => r.UserIssuer)
        .Include(r => r.UserReceiver)
        .FirstOrDefaultAsync(r =>
            (r.IdUserIssuer == IdUserIssuer && r.Id_UserReceiver == Id_User && r.Status == RequestStatus.Onhold));



        public async Task UpdateStatusRequestFriendsAsync(RequestFriends friendRequest)
        {
            _context.Entry(friendRequest).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}