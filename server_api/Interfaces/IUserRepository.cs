using server_api.Models;

namespace server_api.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
    }
}