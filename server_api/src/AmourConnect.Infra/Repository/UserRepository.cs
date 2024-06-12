using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.AppLayerDto;
using AmourConnect.Domain.Dtos.SetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using Microsoft.EntityFrameworkCore;
using AmourConnect.Infra.Persistence;
using AmourConnect.Infra.Mappers;
using AmourConnect.App.Services;
namespace AmourConnect.Infra.Repository
{
    internal class UserRepository(AmourConnectDbContext _context) : IUserRepository
    {
        public async Task<ICollection<GetUserDto>> GetUsersToMatchAsync(User dataUserNowConnect)
        {
            return await _context.User
            .Where(u =>
                u.city.ToLower() == dataUserNowConnect.city.ToLower() &&
                u.sex == (dataUserNowConnect.sex == "M" ? "F" : "M") &&
                u.date_of_birth >= (dataUserNowConnect.sex == "F" ?
                    dataUserNowConnect.date_of_birth.AddYears(-10) :
                    dataUserNowConnect.date_of_birth.AddYears(-1)) &&
                u.date_of_birth <= (dataUserNowConnect.sex == "M" ?
                    dataUserNowConnect.date_of_birth.AddYears(10) :
                    dataUserNowConnect.date_of_birth.AddYears(1)) &&
            !_context.RequestFriends.Any(r =>
                ((r.IdUserIssuer == u.Id_User && r.Id_UserReceiver == dataUserNowConnect.Id_User) ||
                (r.Id_UserReceiver == u.Id_User && r.IdUserIssuer == dataUserNowConnect.Id_User)) &&
                r.Status == RequestStatus.Accepted))
            .Select(u => u.ToGetUserDto())
            .ToListAsync();
        }



        public async Task<int?> GetUserIdWithGoogleIdAsync(string EmailGoogle, string userIdGoogle)
        {
            return await _context.User
                .Where(u => u.EmailGoogle == EmailGoogle && u.userIdGoogle == userIdGoogle)
                .Select(u => u.Id_User)
                .FirstOrDefaultAsync();
        }



        public async Task<int?> CreateUserAsync(string userIdGoogle, string EmailGoogle, SetUserRegistrationDto setUserRegistrationDto)
        {
            var user = new User
            {
                userIdGoogle = userIdGoogle,
                EmailGoogle = EmailGoogle,
                Description = setUserRegistrationDto.Description,
                date_of_birth = setUserRegistrationDto.date_of_birth.HasValue ? setUserRegistrationDto.date_of_birth.Value.ToUniversalTime() : DateTime.MinValue,
                sex = setUserRegistrationDto.sex,
                Pseudo = setUserRegistrationDto.Pseudo,
                city = setUserRegistrationDto.city,
                account_created_at = DateTime.Now.ToUniversalTime(),
            };

            await _context.User.AddAsync(user);
            var rowsAffected = _context.SaveChangesAsync();

            if (await rowsAffected > 0)
            {
                return user.Id_User;
            }
            return null;
        }



        public async Task<ALSessionUserDto> UpdateSessionUserAsync(int Id_User)
        {
            string newSessionToken;
            DateTime expirationDate;

            do
            {
                newSessionToken = MessUtils.GeneratePassword(64);
                expirationDate = DateTime.UtcNow.AddDays(7);

            } while (await _context.User.AnyAsync(u => u.token_session_user == newSessionToken));


            var user = await _context.User.FirstOrDefaultAsync(u => u.Id_User == Id_User);

            if (user != null)
            {
                user.token_session_user = newSessionToken;
                user.date_token_session_expiration = expirationDate;

                await _context.SaveChangesAsync();
            }

            return new ALSessionUserDto
            {
                token_session_user = newSessionToken,
                date_token_session_expiration = expirationDate
            };
        }



        public async Task<bool> GetUserByPseudoAsync(string Pseudo)
        {
            return await _context.User.AnyAsync(u => u.Pseudo.ToLower() == Pseudo.ToLower());
        }

        public async Task<User> GetUserWithCookieAsync(string token_session_user)
        {
            return await _context.User.FirstOrDefaultAsync(u => u.token_session_user == token_session_user);
        }

        public async Task<bool> UpdateUserAsync(int Id_User, User user)
        {
            User existingUser = await _context.User.FirstOrDefaultAsync(u => u.Id_User == Id_User);

            if (existingUser == null)
            {
                return false;
            }

            existingUser.date_of_birth = user.date_of_birth.ToUniversalTime();
            existingUser.sex = user.sex;
            existingUser.Profile_picture = user.Profile_picture;
            existingUser.city = user.city;

            _context.Entry(existingUser).State = EntityState.Modified;
            var rowsAffected = await _context.SaveChangesAsync();

            return rowsAffected > 0;
        }



        public async Task<User> GetUserByIdUserAsync(int Id_User)
        {
            return await _context.User
                .Where(u => u.Id_User == Id_User)
                .FirstOrDefaultAsync();
        }
    }
}
