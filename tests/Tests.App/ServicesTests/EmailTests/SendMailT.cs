using AmourConnect.App.Interfaces.Services.Email;
using AmourConnect.App.Services.Email;
using AmourConnect.Domain.Entities;
using Moq;

namespace Tests.App.ServicesTests.EmailTests
{
    public class SendMailT
    {
        private readonly User nUserReceiver = new()
        {
            Pseudo = "testUserR",
            EmailGoogle = "testr@test.com",
        };
        private readonly User nUserSender = new()
        {
            Pseudo = "testUserS",
            EmailGoogle = "tests@test.com",
        };

        private readonly Mock<IConfigEmail> mockEmailSender = new();

        [Fact]
        public async Task MailRegisterAsync_ShouldCallConfigMailWithCorrectParameters()
        {
            var email = "test@test.com";
            var pseudo = "testUser";
            var sendMail = new SendMail(mockEmailSender.Object);

            await sendMail.MailRegisterAsync(email, pseudo);

            mockEmailSender.Verify(sender => sender.configMail(
                        email,
                        BodyEmail.subjectRegister,
                        BodyEmail._emailBodyRegister(pseudo)),
                        Times.Once);
        }

        [Fact]
        public async Task RequestFriendMailAsync_ShouldCallConfigMailWithCorrectParameters()
        {
            var sendMail = new SendMail(mockEmailSender.Object);

            await sendMail.RequestFriendMailAsync(nUserReceiver, nUserSender);

            mockEmailSender.Verify(sender => sender.configMail(
                        nUserReceiver.EmailGoogle,
                        BodyEmail.subjectRequestFriend,
                        BodyEmail._requestFriendBodyEmail(nUserReceiver.Pseudo, nUserSender)),
                        Times.Once);
        }

        [Fact]
        public async Task AcceptRequestFriendMailAsync_ShouldCallConfigMailWithCorrectParameters()
        {
            var sendMail = new SendMail(mockEmailSender.Object);

            await sendMail.AcceptRequestFriendMailAsync(nUserReceiver, nUserSender);

            mockEmailSender.Verify(sender => sender.configMail(
                        nUserReceiver.EmailGoogle,
                        nUserSender.Pseudo + BodyEmail.subjectAcceptFriend,
                        BodyEmail._acceptFriendBodyEmail(nUserReceiver.Pseudo, nUserSender)),
                        Times.Once);
        }
    }
}