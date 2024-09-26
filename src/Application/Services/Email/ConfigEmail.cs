using System.Net.Mail;
using Application.Interfaces.Services.Email;
using DotNetEnv;
namespace Application.Services.Email
{
    public class ConfigEmail() : IConfigEmail
    {
        public async Task configMail(string toEmail, string subject, string body)
        {
            MailMessage mail = new();

            SmtpClient smtpClient = new(Env.GetString("SERVICE"));

            mail.From = new MailAddress(Env.GetString("EMAIL_USER"));
            mail.To.Add(toEmail);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            smtpClient.Port = int.Parse(Env.GetString("PORT_SMTP"));
            smtpClient.Credentials = new System.Net.NetworkCredential(Env.GetString("EMAIL_USER"), Env.GetString("EMAIL_MDP"));
            smtpClient.EnableSsl = true;

            try
            {
                await smtpClient.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email to {toEmail}: {ex.Message}");
            }
        }
    }
}