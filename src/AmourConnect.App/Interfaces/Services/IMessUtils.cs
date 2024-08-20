using Microsoft.AspNetCore.Http;

namespace AmourConnect.App.Interfaces.Services
{
    internal interface IMessUtils
    {
        Task<byte[]> ConvertImageToByteArrayAsync(IFormFile image);
    }
}