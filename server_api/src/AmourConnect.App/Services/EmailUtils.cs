using System.Net.Mail;
using AmourConnect.Domain.Entities;
using DotNetEnv;
namespace AmourConnect.App.Services
{
    public static class EmailUtils
    {
        private readonly static string _requestUrlPageRequest = $"{Env.GetString("IP_NOW_FRONTEND")}/request";
        private readonly static string _requestUrlWebSite = $"{Env.GetString("IP_NOW_FRONTEND")}";

        private static async Task _configMail(string toEmail, string subject, string body)
        {
            MailMessage mail = new ();
            SmtpClient SmtpServer = new (Env.GetString("SERVICE"));

            mail.From = new MailAddress(Env.GetString("EMAIL_USER"));
            mail.To.Add(toEmail);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            SmtpServer.Port = int.Parse(Env.GetString("PORT_SMTP"));
            SmtpServer.Credentials = new System.Net.NetworkCredential(Env.GetString("EMAIL_USER"), Env.GetString("EMAIL_MDP"));
            SmtpServer.EnableSsl = true;

            try
            {
                await SmtpServer.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email to {toEmail}: {ex.Message}");
            }
        }


        public static async Task MailRegisterAsync(string email, string pseudo)
        {
            string body = _emailBodyRegister(pseudo);
            await _configMail(email, "Bienvenu chez AmourConnect ❤️", body);
        }

        public static async Task RequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer)
        {
            string body = _requestFriendBodyEmail(dataUserReceiver.Pseudo, dataUserIssuer);
            await _configMail(dataUserReceiver.EmailGoogle, "Demande de match ❤️", body);
        }

        public static async Task AcceptRequestFriendMailAsync(User dataUserReceiver, User dataUserIssuer)
        {
            string body = _acceptFriendBodyEmail(dataUserReceiver.Pseudo, dataUserIssuer);
            await _configMail(dataUserReceiver.EmailGoogle, dataUserIssuer.Pseudo + " a accepté(e) le match ❤️", body);
        }

        private static string _emailBodyRegister(string pseudo)
        {
            string htmlBody = $@"
            <html>
            <head>
                <title>Bienvenu chez AmourConnect 😍❤️</title>
            </head>
            <body style=""font-family: Arial, sans-serif; background-color: #f9e9f9;"">
                <div style=""max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;"">
                    <h1 style=""color: #d33469; text-align: center;"">Bonjour {pseudo},</h1>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;"">Merci d'avoir validé ton inscription et bienvenu sur notre site de rencontre. Nous sommes ravis de t'accueillir dans notre communauté dédiée à l'amour et aux belles rencontres. N'hésite pas à compléter ton profil et à découvrir les profils des autres membres.</p>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;"">Cordialement,</p>
                    <p style=""color: #d33469; text-align: justify; line-height: 1.6;""><a href=""{_requestUrlWebSite}"">L'équipe AmourConnect</a></p>
                </div>
            </body>
            </html>
            ";
            return htmlBody;
        }

        private static string _requestFriendBodyEmail(string pseudoReceiver, User dataUserIssuer)
        {
            string htmlBody = $@"
            <html>
            <head>
                <title>Demande de match ❤️</title>
            </head>
            <body style=""font-family: Arial, sans-serif; background-color: #f9e9f9;"">
                <div style=""max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;"">
                    <h1 style=""color: #d33469; text-align: center;"">Bonjour {pseudoReceiver},</h1>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;""><strong><span style=""color: #ff69b4;"">{dataUserIssuer.Pseudo}</span></strong> aimerait faire ta connaissance et te propose un match sur AmourConnect. Clique sur le lien ci-dessous pour accepter cette demande :</p>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;""><a href=""{_requestUrlPageRequest}"">Accepter la demande</a></p>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;"">Bonne chance dans tes rencontres et à bientôt sur AmourConnect !</p>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;"">Cordialement,</p>
                    <p style=""color: #d33469; text-align: justify; line-height: 1.6;""><a href=""{_requestUrlWebSite}"">L'équipe AmourConnect</a></p>
                </div>
            </body>
            </html>
            ";
            return htmlBody;
        }

        private static string _acceptFriendBodyEmail(string pseudoReceiver, User dataUserIssuer)
        {
            string htmlBody = $@"
            <html>
            <head>
                <title>Demande de match acceptée ❤️</title>
            </head>
            <body style=""font-family: Arial, sans-serif; background-color: #f9e9f9;"">
                <div style=""max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;"">
                    <h1 style=""color: #d33469; text-align: center;"">Bonjour {pseudoReceiver},</h1>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;""><strong><span style=""color: #ff69b4;"">{dataUserIssuer.Pseudo}</span></strong> est ravi(e) ! Ta demande de match a été acceptée sur AmourConnect. Tu peux maintenant discuter et faire connaissance avec {dataUserIssuer.Pseudo}.</p>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;"">Bonne chance dans tes rencontres et à bientôt sur AmourConnect !</p>
                    <p style=""color: #333; text-align: justify; line-height: 1.6;"">Cordialement,</p>
                    <p style=""color: #d33469; text-align: justify; line-height: 1.6;""><a href=""{_requestUrlWebSite}"">L'équipe AmourConnect</a></p>
                </div>
            </body>
            </html>
            ";

            return htmlBody;
        }
    }
}