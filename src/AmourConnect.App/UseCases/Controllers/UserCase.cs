using AmourConnect.API.Services;
using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.SetDtos;
using AmourConnect.Infra.Interfaces;
using AmourConnect.Domain.Mappers;

namespace AmourConnect.App.UseCases.Controllers
{
    internal class UserCase : IUserCase
    {
        private readonly IUserRepository _userRepository;

        public UserCase(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ICollection<GetUserDto>> GetUsersToMach(string token_session_user)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            ICollection<GetUserDto> users = await _userRepository.GetUsersToMatchAsync(dataUserNowConnect);

            return users;
        }

        public async Task<GetUserDto> GetUserOnly(string token_session_user)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            GetUserDto userDto = dataUserNowConnect.ToGetUserDto();

            return userDto;
        }

        public async Task UpdateUser(SetUserUpdateDto setUserUpdateDto, string token_session_user)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            var imageData = await MessUtils.ConvertImageToByteArrayAsync(setUserUpdateDto.Profile_picture);

            var newsValues = new
            {
                Profile_picture = RegexUtils.CheckPicture(setUserUpdateDto.Profile_picture)
                ? imageData
                                : dataUserNowConnect.Profile_picture,

                city = RegexUtils.CheckCity(setUserUpdateDto.city)
                ? setUserUpdateDto.city
                          : dataUserNowConnect.city,

                Description = RegexUtils.CheckDescription(setUserUpdateDto.Description)
                          ? setUserUpdateDto.Description
                          : dataUserNowConnect.Description,

                sex = RegexUtils.CheckSex(setUserUpdateDto.sex)
                ? setUserUpdateDto.sex
                : dataUserNowConnect.sex,

                date_of_birth = RegexUtils.CheckDate(setUserUpdateDto.date_of_birth)
                            ? setUserUpdateDto.date_of_birth ?? DateTime.MinValue
                            : dataUserNowConnect.date_of_birth,
            };

            dataUserNowConnect.Profile_picture = newsValues.Profile_picture;
            dataUserNowConnect.city = newsValues.city;
            dataUserNowConnect.sex = newsValues.sex;
            dataUserNowConnect.Description = newsValues.Description;
            dataUserNowConnect.date_of_birth = newsValues.date_of_birth;

            await _userRepository.UpdateUserAsync(dataUserNowConnect.Id_User, dataUserNowConnect);
        }

        public async Task<GetUserDto> GetUser(int Id_User)
        {
            User user = await _userRepository.GetUserByIdUserAsync(Id_User);

            if (user == null) 
            {
                return null;
            }

            GetUserDto userDto = user.ToGetUserDto();

            return userDto;
        }
    }
}