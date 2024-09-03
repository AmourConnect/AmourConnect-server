using AmourConnect.Domain.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using AmourConnect.App.Interfaces.Services;
using Microsoft.Extensions.Options;
namespace AmourConnect.App.Services
{
    public sealed class JWTSessionUtils(IOptions<JwtSecret> jwtSecret) : IJWTSessionUtils
    {
        private readonly SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(jwtSecret.Value.Key));
        private readonly string ip_Now_Frontend = jwtSecret.Value.Ip_Now_Frontend;
        private readonly string ip_Now_Backend = jwtSecret.Value.Ip_Now_Backend;

        public string GenerateJwtToken(Claim[] claims, DateTime expirationValue)
        {
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                ip_Now_Frontend,
                ip_Now_Backend,
                claims,
                expires: expirationValue,
                signingCredentials: credentials
            );

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}