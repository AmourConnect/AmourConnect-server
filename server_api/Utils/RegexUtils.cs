using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace server_api.Utils
{
    public static class RegexUtils
    {
        public static readonly Regex DateOfBirthRegex = new Regex(@"^\d{4}-\d{2}-\d{2}$", RegexOptions.Compiled); // (format : YYYY-MM-DD)
        public static readonly Regex CityRegex = new Regex(@"^[a-zA-Z\s]{1,50}$", RegexOptions.Compiled);
        public static readonly Regex PseudoRegex = new Regex(@"^[a-zA-Z0-9_]{1,15}$", RegexOptions.Compiled);


        public static IActionResult CheckBodyAuthRegister(ControllerBase controller, string DateOfBirth, string Sex, string City, string Pseudo)
        {
            if (string.IsNullOrEmpty(DateOfBirth) || string.IsNullOrEmpty(Sex) || string.IsNullOrEmpty(City) || string.IsNullOrEmpty(Pseudo))
            {
                return controller.BadRequest("Additional information is required");
            }
            if (!DateOfBirthRegex.IsMatch(DateOfBirth))
            {
                return controller.BadRequest("Invalid date of birth format");
            }
            if (!new[] { "M", "F" }.Contains(Sex, StringComparer.OrdinalIgnoreCase))
            {
                return controller.BadRequest("Invalid sex value");
            }

            if (!CityRegex.IsMatch(City))
            {
                return controller.BadRequest("Invalid city format");
            }

            if (!PseudoRegex.IsMatch(Pseudo))
            {
                return controller.BadRequest("Invalid pseudo format");
            }
            return controller.Ok();
        }
    }
}