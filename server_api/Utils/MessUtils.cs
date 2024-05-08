using System.Text;

namespace server_api.Utils
{
    public static class MessUtils
    {
        public static string GeneratePassword(int length)
        {
            const string allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random rand = new Random();
            StringBuilder password = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                password.Append(allowedChars[rand.Next(allowedChars.Length)]);
            }

            return password.ToString();
        }
    }
}