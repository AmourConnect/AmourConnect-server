namespace server_api.Dto
{
    public class UserRegistrationDto
    {
        public string? Pseudo { get; set; }
        public DateTime? date_of_birth { get; set; }
        public string? sex { get; set; }
        public string? city { get; set; }
    }
}