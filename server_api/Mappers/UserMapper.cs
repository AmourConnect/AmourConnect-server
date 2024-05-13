using server_api.Dto.GetDto;
using server_api.Models;

namespace server_api.mappers
{
    public static class UserMapper
    {
        public static GetUserDto ToGetUserDto(this User user)
        {
            if (user == null)
            {
                return null;
            }

            return new GetUserDto
            {
                Id_User = user.Id_User,
                Pseudo = user.Pseudo,
                Profile_picture = user.Profile_picture,
                city = user.city,
                sex = user.sex,
                date_of_birth = user.date_of_birth
            };
        }
    }
}