using System.ComponentModel.DataAnnotations;

namespace server_api.Models
{
    public class User
    {
        [Key]
        public int Id_User { get; set; }

        [Required]
        public string? userIdGoogle { get; set; }

        [Required]
        public string? NameGoogle { get; set; }

        [Required]
        public string? EmailGoogle { get; set; }

        public byte[]? Profile_picture { get; set; }

        public DateTime? date_token_session_expiration { get; set; }

        public string? token_session_user { get; set; }

        [Required]
        public string? grade { get; set; }

        [Required]
        public string? city { get; set; }

        [Required]
        public string? sex { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime date_of_birth { get; set; }

        [Required]
        public DateTime account_created_at { get; set; }

        public virtual ICollection<Swipe> Swipes { get; set; } = new HashSet<Swipe>();

        public virtual ICollection<Swipe> SwipesReceived { get; set; } = new HashSet<Swipe>();

    }
}
