namespace Domain.Utils
{
    public class JwtSecret : IJwtSecret
    {
        public string Key { get; set; }
        public string Ip_Now_Frontend { get; set; }
        public string Ip_Now_Backend { get; set; }
    }

    public interface IJwtSecret
    {
        string Key { get; set; }
        string Ip_Now_Frontend { get; set; }
        string Ip_Now_Backend { get; set; }
    }
}