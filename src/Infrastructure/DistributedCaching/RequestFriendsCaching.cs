using Domain.Dtos.GetDtos;
using Infrastructure.Interfaces;

namespace Infrastructure.DistributedCaching
{
    public class RequestFriendsCaching(IRequestFriendsRepository requestFriendsRepository, IRedisCacheService redisCacheService) : IRequestFriendsCaching
    {
        private readonly IRequestFriendsRepository _requestFriendsRepository = requestFriendsRepository;
        private readonly IRedisCacheService _redisCacheService = redisCacheService;

        public async Task<ICollection<GetRequestFriendsDto>> GetRequestFriendsAsync(int Id_User)
        {
            ICollection<GetRequestFriendsDto> getRequestFriendsDtos = await _redisCacheService.GetAsync<ICollection<GetRequestFriendsDto>>(Id_User.ToString());
            if(getRequestFriendsDtos is null)
            {
                ICollection<GetRequestFriendsDto> getRequestFriendsDtosR = await _requestFriendsRepository.GetRequestFriendsAsync(Id_User);

                await _redisCacheService.SetAsync(Id_User.ToString(), getRequestFriendsDtosR, TimeSpan.FromSeconds(15));

                return getRequestFriendsDtosR;
            }

            return getRequestFriendsDtos;
        }
    }
}