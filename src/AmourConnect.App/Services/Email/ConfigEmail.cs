using System.Net.Mail;
using DotNetEnv;
namespace AmourConnect.App.Services.Email
{
    internal abstract class ConfigEmail
    {
        protected static async Task _configMail(string toEmail, string subject, string body)
        {
            MailMessage mail = new();
            SmtpClient SmtpServer = new(Env.GetString("SERVICE"));

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
    }
}