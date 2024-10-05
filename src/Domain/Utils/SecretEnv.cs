namespace Domain.Utils
{
    public class SecretEnv : ISecretEnv
    {
        public string SecretKeyJWT { get; set; }
        public string Ip_Now_Frontend { get; set; }
        public string Ip_Now_Backend { get; set; }

        public string PORT_SMTP { get; set; }

        public string SERVICE { get; set; }

        public string EMAIL_MDP { get; set; }
        public string EMAIL_USER { get; set; }
    }

    public interface ISecretEnv
    {
        string SecretKeyJWT { get; set; }
        string Ip_Now_Frontend { get; set; }
        string Ip_Now_Backend { get; set; }

        string PORT_SMTP {  get; set; }

        string SERVICE {  get; set; }

        string EMAIL_MDP { get; set; }
        string EMAIL_USER { get; set; }
    }
}