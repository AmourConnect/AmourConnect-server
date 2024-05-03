using server_api.Models;

namespace server_api.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        bool UserExists(string emailGoogle, string googleId);
    }
}