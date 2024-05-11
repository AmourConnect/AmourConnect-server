using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace server_api.Utils
{
    public static class RegexUtils
    {
        public static readonly Regex DateRegex = new Regex(@"^\d{4}-\d{2}-\d{2}$", RegexOptions.Compiled); // (format : YYYY-MM-DD)
        public static readonly Regex CityRegex = new Regex(@"^[a-zA-Z\s]{1,50}$", RegexOptions.Compiled);
        public static readonly Regex PseudoRegex = new Regex(@"^[a-zA-Z0-9_]{1,15}$", RegexOptions.Compiled);
        public static readonly Regex MessageRegex = new Regex(@"^.{1,200}$", RegexOptions.Compiled);


        public static IActionResult CheckBodyAuthRegister(ControllerBase controller, DateTime? date_of_birth, string sex, string city, string Pseudo)
        {
            if (!CheckDate(date_of_birth))
            {
                return controller.BadRequest(new { message = "Invalid date of birth format" });
            }
            if (!CheckSex(sex))
            {
                return controller.BadRequest(new { message = "Invalid sex value" });
            }

            if (!CheckCity(city))
            {
                return controller.BadRequest(new { message = "Invalid city format" });
            }

            if (!CheckPseudo(Pseudo))
            {
                return controller.BadRequest(new { message = "Invalid pseudo format" });
            }
            return null; // the check regex is okay :)
        }



        public static bool CheckPicture(IFormFile Profile_picture)
        {

            if (Profile_picture == null || Profile_picture.Length == 0)
            {
                return false;
            }

            const int maxSize = 1 * 1024 * 1024; // 1 Mo

            if (Profile_picture.Length > maxSize)
            {
                return false;
            }

            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };

            if (!allowedTypes.Contains(Profile_picture.ContentType))
            {
                return false;
            }

            return true;
        }



        public static bool CheckCity(string city)
        {
            if (string.IsNullOrEmpty(city))
            {
                return false;
            }
            if (!CityRegex.IsMatch(city))
            {
                return false;
            }
            return true;
        }



        public static bool CheckSex(string sex)
        {
            if (string.IsNullOrEmpty(sex))
            {
                return false;
            }
            if (!new[] { "M", "F" }.Contains(sex, StringComparer.OrdinalIgnoreCase))
            {
                return false;
            }
            return true;
        }



        public static bool CheckDate(DateTime? date)
        {
            if (!date.HasValue)
            {
                return false;
            }

            string dateString = date.Value.ToString("yyyy-MM-dd");

            if (string.IsNullOrEmpty(dateString))
            {
                return false;
            }

            if (!DateRegex.IsMatch(dateString))
            {
                return false;
            }
            return true;
        }



        public static bool CheckPseudo(string Pseudo)
        {
            if (string.IsNullOrEmpty(Pseudo))
            {
                return false;
            }
            if (!PseudoRegex.IsMatch(Pseudo))
            {
                return false;
            }
            return true;
        }


        public static bool CheckMessage(string Message)
        {
            if(string.IsNullOrEmpty(Message))
            { return false; }

            if(!MessageRegex.IsMatch(Message))
            { return false; }

            return true;
        }
    }
}