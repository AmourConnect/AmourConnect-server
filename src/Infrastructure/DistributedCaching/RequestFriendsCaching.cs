using Domain.Dtos.GetDtos;
using Infrastructure.Interfaces;

namespace Infrastructure.DistributedCaching
{
    public class RequestFriendsCaching(IRequestFriendsRepository requestFriendsRepository, ICacheService CacheService) : IRequestFriendsCaching
    {
        private readonly IRequestFriendsRepository _requestFriendsRepository = requestFriendsRepository;
        private readonly ICacheService _cacheService = CacheService;

        public async Task<ICollection<GetRequestFriendsDto>> GetRequestFriendsAsync(int Id_User)
        {
            ICollection<GetRequestFriendsDto> getRequestFriendsDtos = await _cacheService.GetAsync<ICollection<GetRequestFriendsDto>>(Id_User.ToString() + "GetRequestFriends");
            if(getRequestFriendsDtos is null)
            {
                ICollection<GetRequestFriendsDto> getRequestFriendsDtosR = await _requestFriendsRepository.GetRequestFriendsAsync(Id_User);

                await _cacheService.SetAsync(Id_User.ToString() + "GetRequestFriends", getRequestFriendsDtosR, TimeSpan.FromSeconds(10));

                return getRequestFriendsDtosR;
            }

            return getRequestFriendsDtos;
        }
    }
}