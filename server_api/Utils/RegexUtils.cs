using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace server_api.Utils
{
    public static class RegexUtils
    {
        public static readonly Regex DateRegex = new Regex(@"^\d{4}-\d{2}-\d{2}$", RegexOptions.Compiled); // (format : YYYY-MM-DD)
        public static readonly Regex CityRegex = new Regex(@"^[a-zA-Z\s]{1,50}$", RegexOptions.Compiled);
        public static readonly Regex PseudoRegex = new Regex(@"^[a-zA-Z0-9_]{1,15}$", RegexOptions.Compiled);


        public static IActionResult CheckBodyAuthRegister(ControllerBase controller, DateTime? DateOfBirth, string Sex, string City, string Pseudo)
        {
            if (!CheckDate(DateOfBirth))
            {
                return controller.BadRequest(new { message = "Invalid date of birth format" });
            }
            if (!CheckSex(Sex))
            {
                return controller.BadRequest(new { message = "Invalid sex value" });
            }

            if (!CheckCity(City))
            {
                return controller.BadRequest(new { message = "Invalid city format" });
            }

            if (!CheckPseudo(Pseudo))
            {
                return controller.BadRequest(new { message = "Invalid pseudo format" });
            }
            return null; // the check regex is okay :)
        }



        public static bool CheckPicture(byte[] picture)
        {
            const int maxSize = 5 * 1024 * 1024; // 5 Mo

            if (picture == null || picture.Length == 0)
            {
                return false;
            }

            if (picture.Length > maxSize)
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



        public static bool CheckPseudo(string pseudo)
        {
            if (string.IsNullOrEmpty(pseudo))
            {
                return false;
            }
            if (!PseudoRegex.IsMatch(pseudo))
            {
                return false;
            }
            return true;
        }
    }
}