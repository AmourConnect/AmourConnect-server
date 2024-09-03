using AmourConnect.Domain.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using AmourConnect.App.Interfaces.Services;
using DotNetEnv;
namespace AmourConnect.App.Services
{
    public sealed class JWTSessionUtils(IJwtSecret _JwtSecret) : IJWTSessionUtils
    {
        // TODO FIX Dependance Injection Secret =>
        private readonly SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(Env.GetString("SecretKeyJWT")));
        public string GenerateJwtToken(Claim[] claims, DateTime expirationValue)
        {
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                Env.GetString("Ip_Now_Frontend"),
                Env.GetString("Ip_Now_Backend"),
                claims,
                expires: expirationValue,
                signingCredentials: credentials
            );

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}