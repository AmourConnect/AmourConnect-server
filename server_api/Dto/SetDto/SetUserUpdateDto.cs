﻿namespace server_api.Dto.SetDto
{
    public class SetUserUpdateDto
    {
        public IFormFile? Profile_picture { get; set; }
        public string? city { get; set; }
        public string? sex { get; set; }
        public DateTime? date_of_birth { get; set; }
    }
}