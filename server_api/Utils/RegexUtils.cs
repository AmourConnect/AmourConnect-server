using Microsoft.AspNetCore.Mvc;
using server_api.Dto.SetDto;
using server_api.Dto.AppLayerDto;
using System.Text.RegularExpressions;

namespace server_api.Utils
{
    public static class RegexUtils
    {
        private static readonly Regex DateRegex = new Regex(@"^\d{4}-\d{2}-\d{2}$", RegexOptions.Compiled); // (format : YYYY-MM-DD)
        private static readonly Regex CityRegex = new Regex(@"^[a-zA-Z\s]{1,50}$", RegexOptions.Compiled);
        private static readonly Regex PseudoRegex = new Regex(@"^[a-zA-Z0-9_]{1,15}$", RegexOptions.Compiled);
        private static readonly Regex MessageRegex = new Regex(@"^.{1,200}$", RegexOptions.Compiled);

        private static readonly Regex DescriptionRegex = new Regex(@"^.{1,100}$", RegexOptions.Compiled);

        private static readonly Regex CookieSessionRegex = new Regex(@"^[a-zA-Z0-9_]{1,64}$", RegexOptions.Compiled);


        public static IActionResult CheckBodyAuthRegister(ControllerBase controller, SetUserRegistrationDto setUserRegistrationDto)
        {
            if (!CheckDate(setUserRegistrationDto.date_of_birth))
                return controller.BadRequest(new ALApiResponse { message = "Invalid date of birth format or length", succes = false });

            if (!CheckSex(setUserRegistrationDto.sex))
                return controller.BadRequest(new ALApiResponse { message = "Invalid sex value or length", succes = false });

            if (!CheckCity(setUserRegistrationDto.city))
                return controller.BadRequest(new ALApiResponse { message = "Invalid city format or length", succes = false });

            if (!CheckPseudo(setUserRegistrationDto.Pseudo))
                return controller.BadRequest(new ALApiResponse { message = "Invalid pseudo format or length", succes = false });

            if (!CheckDescription(setUserRegistrationDto.Description))
                return controller.BadRequest(new ALApiResponse { message = "Invalid description format or length", succes = false });
            
            return null; // the check regex is okay :)
        }



        public static bool CheckPicture(IFormFile Profile_picture)
        {

            if (Profile_picture == null || Profile_picture.Length == 0)
                return false;

            const int maxSize = 1 * 1024 * 1024; // 1 Mo

            if (Profile_picture.Length > maxSize)
                return false;

            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };

            if (!allowedTypes.Contains(Profile_picture.ContentType))
                return false;

            return true;
        }



        public static bool CheckCity(string city)
        {
            if (string.IsNullOrEmpty(city))
                return false;
            
            if (!CityRegex.IsMatch(city))
                return false;
            
            return true;
        }

        public static bool CheckCookieSession(string cookie)
        {
            if(string.IsNullOrEmpty(cookie))
                return false;
            
            if(!CookieSessionRegex.IsMatch(cookie))
                return false;
            
            return true;
        }

        public static bool CheckSex(string sex)
        {
            if (string.IsNullOrEmpty(sex))
                return false;
            
            if (!new[] { "M", "F" }.Contains(sex, StringComparer.OrdinalIgnoreCase))
                return false;
            
            return true;
        }



        public static bool CheckDate(DateTime? date)
        {
            if (!date.HasValue)
                return false;

            string dateString = date.Value.ToString("yyyy-MM-dd");

            if (string.IsNullOrEmpty(dateString))
                return false;

            if (!DateRegex.IsMatch(dateString))
                return false;
            
            return true;
        }



        public static bool CheckPseudo(string Pseudo)
        {
            if (string.IsNullOrEmpty(Pseudo))
                return false;
            
            if (!PseudoRegex.IsMatch(Pseudo))
                return false;
            
            return true;
        }

        public static bool CheckDescription(string Description)
        {
            if (string.IsNullOrEmpty(Description))
                return false;
            
            if (!DescriptionRegex.IsMatch(Description))
                return false;
            
            return true;
        }


        public static bool CheckMessage(string Message)
        {
            if(string.IsNullOrEmpty(Message))
              return false;

            if(!MessageRegex.IsMatch(Message))
               return false;

            return true;
        }
    }
}