using AmourConnect.App.Interfaces.Controllers;
using AmourConnect.App.Services;
using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Entities;
using AmourConnect.Domain.Dtos.SetDtos;
using AmourConnect.Infra.Interfaces;
using AmourConnect.Domain.Mappers;
using Microsoft.AspNetCore.Http;

namespace AmourConnect.App.UseCases.Controllers
{
    internal class UserCase(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor) : IUserCase
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly string token_session_user = CookieUtils.GetValueClaimsCookieUser(httpContextAccessor.HttpContext, CookieUtils.nameCookieUserConnected);


        public async Task<(bool succes, string message, IEnumerable<GetUserDto> UsersToMatch)> GetUsersToMach()
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            if (dataUserNowConnect == null)
            {
                return (false, "user JWT deconnected", null);
            }

            ICollection<GetUserDto> users = await _userRepository.GetUsersToMatchAsync(dataUserNowConnect);

            return (true, "yes good", users);
        }

        public async Task<(bool succes, string message, GetUserDto UserToMatch)> GetUserOnly()
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            if (dataUserNowConnect == null)
            {
                return (false, "user JWT deconnected", null);
            }

            GetUserDto userDto = dataUserNowConnect.ToGetUserDto();

            return (true, "yes good", userDto);
        }

        public async Task<(bool succes, string message)> UpdateUser(SetUserUpdateDto setUserUpdateDto)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            if (dataUserNowConnect == null)
            {
                return (false, "user JWT deconnected");
            }

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

            return (true, "yes good");
        }

        public async Task<(bool succes, string message, GetUserDto userID)> GetUser(int Id_User)
        {
            User dataUserNowConnect = await _userRepository.GetUserWithCookieAsync(token_session_user);

            if (dataUserNowConnect == null)
            {
                return (false, "user JWT deconnected", null);
            }

            User user = await _userRepository.GetUserByIdUserAsync(Id_User);

            if (user == null) 
            {
                return (false, "no found :/", null);
            }

            GetUserDto userDto = user.ToGetUserDto();

            return (true, "found", userDto);
        }
    }
}