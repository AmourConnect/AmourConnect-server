using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AmourConnect.App.Services;
using AmourConnect.Domain.Utils;
using Moq;
using Microsoft.Extensions.Options;
namespace Tests.App.ServicesTests.JwtSession
{
    public class JWTSessionUtilsTests
    {
        private readonly Mock<IOptions<JwtSecret>> _mockJwtSecretOptions;
        private readonly JWTSessionUtils _jwtSessionUtils;

        public JWTSessionUtilsTests()
        {
            _mockJwtSecretOptions = new Mock<IOptions<JwtSecret>>();
            _mockJwtSecretOptions.Setup(x => x.Value).Returns(new JwtSecret
            {
                Key = "sdzwqsdcszedswqsazdfcdxswqszdcfg",
                Ip_Now_Frontend = "http://frontend",
                Ip_Now_Backend = "http://backend"
            });

            _jwtSessionUtils = new JWTSessionUtils(_mockJwtSecretOptions.Object);
        }

        [Fact]
        public void GenerateJwtToken_ShouldReturnValidToken()
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, "test-user"),
                new Claim(ClaimTypes.Role, "admin")
            };
            var expirationValue = DateTime.UtcNow.AddMinutes(30);

            var token = _jwtSessionUtils.GenerateJwtToken(claims, expirationValue);

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            Assert.Equal("test-user", jwtToken.Claims.First(c => c.Type == ClaimTypes.Name).Value);
            Assert.Equal("admin", jwtToken.Claims.First(c => c.Type == ClaimTypes.Role).Value);
            Assert.Equal("http://frontend", jwtToken.Issuer);
            Assert.Equal("http://backend", jwtToken.Audiences.Single());
            Assert.True(jwtToken.ValidTo > DateTime.UtcNow);
        }
    }
}
