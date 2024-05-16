using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using DotNetEnv;
using server_api.Dto.AppLayerDto;
namespace server_api.Utils
{
    public static class CookieUtils
    {

        public static string GetCookieUser(HttpContext httpContext)
        {
            var cookie = httpContext.Request.Cookies["User-AmourConnect"];

            if (cookie == null || !RegexUtils.CheckCookieSession(cookie))
            {
                return string.Empty;
            }
            return cookie;
        }



        public static void CreateSessionCookie(HttpResponse Response, ALSessionUserDto sessionData)
        {
            DateTimeOffset dateExpiration = sessionData.date_token_session_expiration;
            DateTimeOffset currentDate = DateTimeOffset.UtcNow;
            TimeSpan maxAge = dateExpiration - currentDate;

            Response.Cookies.Append(
                "User-AmourConnect",
                sessionData.token_session_user,
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


        public static void CreateCookieToSaveIdGoogle(HttpResponse Response, string userIdGoogle, string EmailGoogle)
        {
            var issuer = Env.GetString("IP_NOW_FRONTEND");
            var audience = Env.GetString("IP_NOW_BACKENDAPI");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Env.GetString("SecretKeyJWT")));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("userIdGoogle", userIdGoogle),
                new Claim("EmailGoogle", EmailGoogle)
            };

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            Response.Cookies.Append(
                "GoogleUser-AmourConnect",
                jwt,
                new CookieOptions
                {
                    Path = "/",
                    MaxAge = TimeSpan.FromHours(1),
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production"
                }
            );
        }


        public static (string IdGoogle, string EmailGoogle) GetGoogleUserFromCookie(HttpRequest Request)
        {
            string cookieName = "GoogleUser-AmourConnect";
            string jwt;

            if (!Request.Cookies.TryGetValue(cookieName, out jwt))
            {
                return (null, null);
            }

            var issuer = Env.GetString("IP_NOW_FRONTEND");
            var audience = Env.GetString("IP_NOW_BACKENDAPI");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Env.GetString("SecretKeyJWT")));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securityKey,
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var principal = handler.ValidateToken(jwt, tokenValidationParameters, out var validatedToken);
                var claims = principal.Claims;

                string userIdGoogle = claims.FirstOrDefault(c => c.Type == "userIdGoogle")?.Value;
                string EmailGoogle = claims.FirstOrDefault(c => c.Type == "EmailGoogle")?.Value;

                return (userIdGoogle, EmailGoogle);
            }
            catch
            {
                return (null, null);
            }
        }
    }
}