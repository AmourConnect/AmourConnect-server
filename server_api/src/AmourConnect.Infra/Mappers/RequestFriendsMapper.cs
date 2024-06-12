using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.GetDtos;

namespace AmourConnect.Infra.Mappers
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