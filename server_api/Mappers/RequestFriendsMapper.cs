using server_api.Dto.GetDto;
using server_api.Models;

namespace server_api.Mappers
{
    public static class UserMapperRequestFriendsMapper
    {
        public static GetRequestFriendsDto ToGetRequestFriendsDto(this RequestFriends requestFriends)
        {
            if (requestFriends == null)
            {
                return null;
            }

            return new GetRequestFriendsDto
            {
                Id_RequestFriends = requestFriends.Id_RequestFriends,
                IdUserIssuer = requestFriends.IdUserIssuer,
                UserIssuerPseudo = requestFriends.UserIssuer.Pseudo,
                Id_UserReceiver = requestFriends.Id_UserReceiver,
                UserReceiverPseudo = requestFriends.UserReceiver.Pseudo,
                Status = requestFriends.Status,
                Date_of_request = requestFriends.Date_of_request
            };
        }
    }
}