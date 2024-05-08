namespace server_api.Dto
{ 
   public class UserUpdateDto
   {
        public byte[]? Profile_picture { get; set; }
        public string? city { get; set; }
        public string? sex { get; set; }
        public DateTime? date_of_birth { get; set; }
   }
}