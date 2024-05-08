namespace server_api.Dto
{ 
   public class UserUpdateDto
   {
        public byte[]? ProfilePicture { get; set; }
        public string? city { get; set; }
        public string? sex { get; set; }
        public DateTime? DateOfBirth { get; set; }
   }
}