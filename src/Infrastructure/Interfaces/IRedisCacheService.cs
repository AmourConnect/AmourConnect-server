namespace Infrastructure.Interfaces
{
    internal interface IRedisCacheService
    {
        Task<T> GetAsync<T>(string key);
        Task SetAsync<T>(string key, T value, TimeSpan? absoluteExpirationTime = null);
    }
}