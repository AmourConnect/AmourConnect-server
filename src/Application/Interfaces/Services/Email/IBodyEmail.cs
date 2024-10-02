using Domain.Entities;

namespace Application.Interfaces.Services.Email
{
    public interface IBodyEmail
    {
        string _acceptFriendBodyEmail(string pseudoReceiver, User dataUserIssuer);
        string _requestFriendBodyEmail(string pseudoReceiver, User dataUserIssuer);
        string _emailBodyRegister(string pseudo);

        string subjectAcceptFriend { get; }
        string subjectRequestFriend { get; }
        string subjectRegister { get; }
    }
}