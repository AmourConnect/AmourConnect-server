using AmourConnect.Domain.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using AmourConnect.App.Interfaces.Services;

namespace AmourConnect.App.Services
{
    public sealed class JWTSessionUtils(IJwtSecret _JwtSecret) : IJWTSessionUtils
    {
        private readonly SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_JwtSecret.Key));

        public string GenerateJwtToken(Claim[] claims, DateTime expirationValue)
        {
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _JwtSecret.Ip_Now_Frontend,
                _JwtSecret.Ip_Now_Backend,
                claims,
                expires: expirationValue,
                signingCredentials: credentials
            );

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}