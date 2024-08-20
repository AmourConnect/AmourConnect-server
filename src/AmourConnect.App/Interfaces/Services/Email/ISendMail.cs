using AmourConnect.Domain.Entities;

namespace AmourConnect.App.Interfaces.Services.Email
{
    public interface ISendMail
    {
        Task MailRegisterAsync(string email, string pseudo);
        Task RequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer);
        Task AcceptRequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer);
    }
}