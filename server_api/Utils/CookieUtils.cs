using server_api.Dto;
using System.Text.Json;

namespace server_api.Utils
{
    public static class CookieUtils
    {

        public static string GetCookieUser(HttpContext httpContext)
        {
            var cookie = httpContext.Request.Cookies["User-AmourConnect"];

            if (cookie == null)
            {
                return string.Empty;
            }
            return cookie;
        }



        public static void CreateSessionCookie(HttpResponse Response, SessionDataDto sessionData)
        {
            DateTimeOffset dateExpiration = sessionData.ExpirationDate;
            DateTimeOffset currentDate = DateTimeOffset.UtcNow;
            TimeSpan maxAge = dateExpiration - currentDate;

            Response.Cookies.Append(
                "User-AmourConnect",
                sessionData.Token,
                new CookieOptions
                {
                    Path = "/",
                    MaxAge = maxAge,
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production"
                }
            );
        }


        public static void CreateCookieToSaveIdGoogle(HttpResponse Response, string idGoogle, string emailGoogle)
        {
            DateTimeOffset dateExpiration = DateTime.UtcNow.AddDays(1);
            DateTimeOffset currentDate = DateTimeOffset.UtcNow;
            TimeSpan maxAge = dateExpiration - currentDate;
            var value = new
            {
                IdGoogle = idGoogle,
                EmailGoogle = emailGoogle,
            };

            string jsonValue = JsonSerializer.Serialize(value);

            Response.Cookies.Append(
                "GoogleUser-AmourConnect",
                jsonValue,
                new CookieOptions
                {
                    Path = "/",
                    MaxAge = maxAge,
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production"
                }
            );
        }


        public static (string IdGoogle, string EmailGoogle) GetGoogleUserFromCookie(HttpRequest Request)
        {
            string cookieName = "GoogleUser-AmourConnect";
            string jsonValue;

            if (!Request.Cookies.TryGetValue(cookieName, out jsonValue))
            {
                return (null, null);
            }

            var value = JsonSerializer.Deserialize<GoogleUserValueDto>(jsonValue);

            return (value.IdGoogle, value.EmailGoogle);
        }
    }
}