using Domain.Dtos.GetDtos;
using Domain.Entities;
using Infrastructure.Interfaces;

namespace Infrastructure.DistributedCaching
{
    public class UserCaching(IUserRepository userRepository, IRedisCacheService RedisCacheService) : IUserCaching
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IRedisCacheService _redisCacheService = RedisCacheService;
        public async Task<User> GetUserWithCookieAsync(string token_session_user)
        {
            User userCache = await _redisCacheService.GetAsync<User>(token_session_user.ToString());
            if (userCache is null)
            {
                User user = await _userRepository.GetUserWithCookieAsync(token_session_user.ToString());

                await _redisCacheService.SetAsync(token_session_user.ToString(), user, TimeSpan.FromSeconds(30));

                return user;
            }
            return userCache;
        }

        public async Task<ICollection<GetUserDto>> GetUsersToMatchAsync(User dataUserNowConnect)
        {
            ICollection<GetUserDto> UsersCache = await _redisCacheService.GetAsync<ICollection<GetUserDto>>(dataUserNowConnect.Id_User.ToString());

            if (UsersCache is null)
            {
                ICollection<GetUserDto> getUserDto = await _userRepository.GetUsersToMatchAsync(dataUserNowConnect);

                await _redisCacheService.SetAsync(dataUserNowConnect.Id_User.ToString(), getUserDto, TimeSpan.FromSeconds(60));

                return getUserDto;
            }

            return UsersCache;
        }

        public async Task<User> GetUserByIdUserAsync(int Id_User)
        {
            User userCache = await _redisCacheService.GetAsync<User>(Id_User.ToString());
            if(userCache is null)
            {
                User user = await _userRepository.GetUserByIdUserAsync(Id_User);

                await _redisCacheService.SetAsync(Id_User.ToString(), user, TimeSpan.FromSeconds(15));

                return user;
            }
            return userCache;
        }
    }
}