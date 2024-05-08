namespace server_api.Dto
{
    public class UserRegistrationDto
    {
        public string? Pseudo { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Sex { get; set; }
        public string? City { get; set; }
    }
}