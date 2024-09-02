using System.Security.Claims;

namespace AmourConnect.App.Interfaces.Services
{
   public interface IJWTSessionUtils
   {
        string GenerateJwtToken(Claim[] claims, DateTime expirationValue);
   }
}