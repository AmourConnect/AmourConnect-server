using server_api.Data;
using server_api.Interfaces;
using server_api.Models;
using server_api.Dto;
using System.Text;

namespace server_api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApiDbContext _context;

        public UserRepository(ApiDbContext context) 
        { 
            _context = context;
        }

        public ICollection<User> GetUsers(User user_data)
        {
            return _context.User
            .Where(u =>
                u.city.ToLower() == user_data.city.ToLower() &&
                u.sex == (user_data.sex == "M" ? "F" : "M") &&
                u.date_of_birth >= (user_data.sex == "F" ?
                    user_data.date_of_birth.AddYears(-10) :
                    user_data.date_of_birth.AddYears(-1)) &&
                u.date_of_birth <= (user_data.sex == "M" ?
                    user_data.date_of_birth.AddYears(10) :
                    user_data.date_of_birth.AddYears(1)))
            .Select(u => new User
            {
                Id_User = u.Id_User,
                Pseudo = u.Pseudo,
                Profile_picture = u.Profile_picture,
                city = u.city,
                sex = u.sex,
                date_of_birth = u.date_of_birth,
                account_created_at = u.account_created_at,
            })
            .ToList();
        }

        public int? SearchIdUserWithIdGoogle(string emailGoogle, string googleId)
        {
            return _context.User
                .Where(u => u.EmailGoogle == emailGoogle && u.userIdGoogle == googleId)
                .Select(u => u.Id_User)
                .FirstOrDefault();
        }

        public int? CreateUser(string googleId, string emailGoogle, string dateOfBirth, string sex, string pseudo, string city)
        {
            var user = new User
            {
                userIdGoogle = googleId,
                EmailGoogle = emailGoogle,
                date_of_birth = DateTime.Parse(dateOfBirth).ToUniversalTime(),
                sex = sex,
                Pseudo = pseudo,
                city = city,
                account_created_at = DateTime.Now.ToUniversalTime(),
            };

            _context.User.Add(user);
            var rowsAffected = _context.SaveChanges();

            if (rowsAffected > 0)
            {
                return user.Id_User;
            }

            return null;
        }

        public SessionDataDto UpdateSessionUser(int id_user)
        {
            string newSessionToken;
            DateTime expirationDate;

            do
            {
                newSessionToken = GenerateNewSessionToken(64);
                expirationDate = DateTime.UtcNow.AddDays(7);

            } while (_context.User.Any(u => u.token_session_user == newSessionToken));


            var user = _context.User.FirstOrDefault(u => u.Id_User == id_user);

            if (user != null)
            {
                user.token_session_user = newSessionToken;
                user.date_token_session_expiration = expirationDate;

                _context.SaveChanges();
            }

            return new SessionDataDto
            {
                Token = newSessionToken,
                ExpirationDate = expirationDate
            };
        }

        public bool CheckIfPseudoAlreadyExist(string pseudo)
        {
            return _context.User.Any(u => u.Pseudo.ToLower() == pseudo.ToLower());
        }

        private string GenerateNewSessionToken(int length)
        {
            const string allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random rand = new Random();
            StringBuilder sessionToken = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                sessionToken.Append(allowedChars[rand.Next(allowedChars.Length)]);
            }

            return sessionToken.ToString();
        }

        public User GetUserWithCookie(string cookie_user)
        {
            return _context.User.FirstOrDefault(u => u.token_session_user == cookie_user);
        }
    }
}