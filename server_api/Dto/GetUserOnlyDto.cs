namespace server_api.Dto
{
    public class GetUserOnlyDto
    {
        public int Id_User { get; set; }
        public string Pseudo { get; set; }
        public string EmailGoogle { get; set; }
        public byte[] Profile_picture { get; set; }
        public string city { get; set; }
        public string sex { get; set; }
        public DateTime date_of_birth { get; set; }
    }
}