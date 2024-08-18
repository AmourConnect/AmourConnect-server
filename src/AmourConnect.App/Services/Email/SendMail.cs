using AmourConnect.Domain.Entities;

namespace AmourConnect.App.Services.Email
{
    internal class SendMail : ConfigEmail
    {
        public static async Task MailRegisterAsync(string email, string pseudo)
        => await _configMail(email, "Bienvenu chez AmourConnect ❤️", BodyEmail._emailBodyRegister(pseudo));

        public static async Task RequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer)
        => await _configMail(dataUserReceiver.EmailGoogle, "Demande de match ❤️", BodyEmail._requestFriendBodyEmail(dataUserReceiver.Pseudo, dataUserIssuer));

        public static async Task AcceptRequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer) 
        => await _configMail(dataUserReceiver.EmailGoogle, dataUserIssuer.Pseudo + " a accepté(e) le match ❤️", BodyEmail._acceptFriendBodyEmail(dataUserReceiver.Pseudo, dataUserIssuer));
    }
}