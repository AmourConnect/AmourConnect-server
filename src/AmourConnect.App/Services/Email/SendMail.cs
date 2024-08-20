using AmourConnect.App.Interfaces.Services.Email;
using AmourConnect.Domain.Entities;

namespace AmourConnect.App.Services.Email
{
    public class SendMail(IConfigEmail cEmail) : ISendMail
    {
        private readonly IConfigEmail _cEmail = cEmail;

        public async Task MailRegisterAsync(string email, string pseudo)
        => await _cEmail.configMail(email, BodyEmail.subjectRegister, BodyEmail._emailBodyRegister(pseudo));

        public async Task RequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer)
        => await _cEmail.configMail(dataUserReceiver.EmailGoogle, BodyEmail.subjectRequestFriend, BodyEmail._requestFriendBodyEmail(dataUserReceiver.Pseudo, dataUserIssuer));

        public async Task AcceptRequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer) 
        => await _cEmail.configMail(dataUserReceiver.EmailGoogle, dataUserIssuer.Pseudo + BodyEmail.subjectAcceptFriend, BodyEmail._acceptFriendBodyEmail(dataUserReceiver.Pseudo, dataUserIssuer));
    }
}