using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Dto.GetDto;
using server_api.Interfaces;
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


        public ICollection<GetRequestFriendsDto> GetRequestFriends(int Id_User)
        {
            return _context.RequestFriends
                .Where(r => r.IdUserIssuer == Id_User || r.Id_UserReceiver == Id_User)
                .Include(r => r.UserIssuer)
                .Include(r => r.UserReceiver)
                .Select(r => new GetRequestFriendsDto
                {
                    Id_RequestFriends = r.Id_RequestFriends,
                    IdUserIssuer = r.IdUserIssuer,
                    UserIssuerPseudo = r.UserIssuer.Pseudo,
                    Id_UserReceiver = r.Id_UserReceiver,
                    UserReceiverPseudo = r.UserReceiver.Pseudo,
                    Status = r.Status,
                    Date_of_request = r.Date_of_request
                })
                .ToList();
        }



        public RequestFriends GetRequestFriendById(int IdUserIssuer, int IdUserReceiver)
        {
            return _context.RequestFriends
            .Where(r => (r.IdUserIssuer == IdUserIssuer && r.Id_UserReceiver == IdUserReceiver)
                || (r.IdUserIssuer == IdUserReceiver && r.Id_UserReceiver == IdUserIssuer))
                .FirstOrDefault();
        }


        public void AddRequestFriend(RequestFriends requestFriends)
        {
            _context.RequestFriends.Add(requestFriends);
            _context.SaveChanges();
        }


        public RequestFriends GetUserFriendRequestById(int Id_User, int IdUserIssuer)
        {
            return _context.RequestFriends
        .FirstOrDefault(r =>
            (r.IdUserIssuer == IdUserIssuer && r.Id_UserReceiver == Id_User && r.Status == RequestStatus.Onhold));
        }



        public void UpdateStatusRequestFriends(RequestFriends friendRequest)
        {
            _context.Entry(friendRequest).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}