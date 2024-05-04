namespace server_api.Dto
{
    public class SessionDataDto
    {
        public string? Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}