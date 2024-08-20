using AmourConnect.Domain.Entities;
using DotNetEnv;

namespace AmourConnect.App.Services.Email
{
    public class BodyEmail
    {
        private readonly static string _requestUrlPageRequest = $"{Env.GetString("IP_NOW_FRONTEND")}/request";
        private readonly static string _requestUrlWebSite = $"{Env.GetString("IP_NOW_FRONTEND")}";
        public readonly static string subjectRegister = "Bienvenu chez AmourConnect ❤️";
        public readonly static string subjectRequestFriend = "Demande de match ❤️";
        public readonly static string subjectAcceptFriend = " a accepté(e) le match ❤️";

        public static string _emailBodyRegister(string pseudo) =>
            $@"
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

        public static string _requestFriendBodyEmail(string pseudoReceiver, User dataUserIssuer) =>
            $@"
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

        public static string _acceptFriendBodyEmail(string pseudoReceiver, User dataUserIssuer) =>
            $@"
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
    }
}