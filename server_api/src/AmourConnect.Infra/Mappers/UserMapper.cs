using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.GetDtos;

namespace AmourConnect.Infra.Mappers
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
                Description = user.Description,
                Profile_picture = user.Profile_picture,
                city = user.city,
                sex = user.sex,
                date_of_birth = user.date_of_birth
            };
        }
    }
}