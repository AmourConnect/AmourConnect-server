using AmourConnect.Domain.Dtos.AppLayerDtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using DotNetEnv;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace AmourConnect.App.Services
{
    public static class CookieUtils
    {
        public static string nameCookieGoogle = "GoogleUser-AmourConnect";
        public static string nameCookieUserConnected = "User-AmourConnect";
        private static SymmetricSecurityKey _securityKey = new(Encoding.UTF8.GetBytes(Env.GetString("SecretKeyJWT")));

        public static string GetValueClaimsCookieUser(HttpContext httpContext, string nameOfCookie)
        {
            var claims = GetClaimsFromCookieJWT(httpContext, nameOfCookie);

            string userC = claims?.FirstOrDefault(c => c.Type == "userConnected")?.Value;

            if (userC == null)
                return null;

            return userC;
        }


        private static void SetSessionCookie(HttpResponse Response, string nameOfCookie, SessionUserDto sessionData)
        {
            DateTimeOffset dateExpiration = sessionData.date_token_session_expiration;
            DateTimeOffset currentDate = DateTimeOffset.UtcNow;
            TimeSpan maxAge = dateExpiration - currentDate;

            Response.Cookies.Append(
                nameOfCookie,
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

        private static string SetJWTSession(Claim[] claims, DateTime expirationValue)
        {
            var credentials = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                Env.GetString("IP_NOW_FRONTEND"),
                Env.GetString("IP_NOW_BACKENDAPI"),
                claims,
                expires: expirationValue,
                signingCredentials: credentials
            );

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


        public static void SetCookieToSaveIdGoogle(HttpResponse Response, string userIdGoogle, string EmailGoogle)
        {
            DateTime expirationCookieGoogle = DateTime.UtcNow.AddHours(1);

            var claims = new[]
            {
                new Claim("userIdGoogle", userIdGoogle),
                new Claim("EmailGoogle", EmailGoogle)
            };
            
            string jwt = SetJWTSession(claims, expirationCookieGoogle);

            SessionUserDto sessionData = new()
            {
                token_session_user = jwt,
                date_token_session_expiration = expirationCookieGoogle,
            };

            SetSessionCookie(Response, nameCookieGoogle, sessionData);
        }


        public static IEnumerable<Claim> GetClaimsFromCookieJWT(HttpContext httpContext, string nameOfCookie)
        {
            string jwt;

            if (!httpContext.Request.Cookies.TryGetValue(nameOfCookie, out jwt))
            {
                return null;
            }

            var handler = new JwtSecurityTokenHandler();

            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _securityKey,
                    ValidateIssuer = true,
                    ValidIssuer = Env.GetString("IP_NOW_FRONTEND"),
                    ValidateAudience = true,
                    ValidAudience = Env.GetString("IP_NOW_BACKENDAPI"),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = handler.ValidateToken(jwt, tokenValidationParameters, out var validatedToken);
                var claims = principal.Claims;

                if (claims == null)
                    return null;

                return claims;
            }
            catch
            {
                return null;
            }
        }

        public static void SetSessionUser(HttpResponse Response, SessionUserDto SessionUserDto)
        {
            var claims = new[]
            {
                new Claim("userConnected", SessionUserDto.token_session_user),
            };

            string jwt = SetJWTSession(claims, SessionUserDto.date_token_session_expiration);

            SessionUserDto sessionData = new()
            {
                token_session_user = jwt,
                date_token_session_expiration = SessionUserDto.date_token_session_expiration,
            };

            SetSessionCookie(Response, nameCookieUserConnected, sessionData);
        }
    }
}