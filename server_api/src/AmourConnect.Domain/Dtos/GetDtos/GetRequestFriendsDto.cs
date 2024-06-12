﻿using AmourConnect.Domain.Entities;

namespace AmourConnect.Domain.Dtos.GetDtos
{
    public class GetRequestFriendsDto
    {
        public int Id_RequestFriends { get; set; }
        public RequestStatus Status { get; set; }
        public DateTime Date_of_request { get; set; }
        public int Id_UserReceiver { get; set; }
        public int IdUserIssuer { get; set; }
        public string UserReceiverPseudo { get; set; }
        public string UserIssuerPseudo { get; set; }
    }
}