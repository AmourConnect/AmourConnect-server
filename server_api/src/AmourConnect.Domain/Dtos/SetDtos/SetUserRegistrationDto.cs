namespace AmourConnect.Domain.Dtos.SetDtos
{
    public class SetUserRegistrationDto
    {
        public string? Pseudo { get; set; }
        public string? Description { get; set; }
        public DateTime? date_of_birth { get; set; }
        public string? sex { get; set; }
        public string? city { get; set; }
    }
}