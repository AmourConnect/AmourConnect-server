﻿using server_api.Dto;
using System.Text.Json;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using DotNetEnv;
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
            var issuer = Env.GetString("IP_NOW_FRONTEND");
            var audience = Env.GetString("IP_NOW_BACKENDAPI");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Env.GetString("SecretKeyJWT")));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("IdGoogle", idGoogle),
                new Claim("EmailGoogle", emailGoogle)
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

                string idGoogle = claims.FirstOrDefault(c => c.Type == "IdGoogle")?.Value;
                string emailGoogle = claims.FirstOrDefault(c => c.Type == "EmailGoogle")?.Value;

                return (idGoogle, emailGoogle);
            }
            catch
            {
                return (null, null);
            }
        }
    }
}