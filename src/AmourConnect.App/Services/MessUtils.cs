using Microsoft.AspNetCore.Http;

namespace AmourConnect.App.Services
{
    public static class MessUtils
    {
        public static async Task<byte[]> ConvertImageToByteArrayAsync(IFormFile image)
        {
            if (image == null)
                return null;
            
            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}