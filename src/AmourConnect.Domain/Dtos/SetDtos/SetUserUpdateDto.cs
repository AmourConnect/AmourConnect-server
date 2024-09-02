using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AmourConnect.Domain.Dtos.SetDtos
{
    public class SetUserUpdateDto
    {
        [Required]
        public IFormFile? Profile_picture { get; set; }

        [Required]
        public string? city { get; set; }

        [Required]
        public string? Description { get; set; }
        [Required]
        public string? sex { get; set; }
        [Required]
        public DateTime? date_of_birth { get; set; }
    }
}