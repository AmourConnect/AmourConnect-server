namespace server_api.Dto
{
    public class SessionUserDto
    {
        public string token_session_user { get; set; }
        public DateTime date_token_session_expiration { get; set; }
    }
}