using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace api_server_2.Models
{
    public class User
    {
        [Key]
        public int Id_User { get; set; }

        public string Pseudo { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public Byte Profile_picture { get; set; }

        public string grade { get; set; }

        public DateTime date_token_session_expiration { get; set; }

        public string token_session_user { get; set; }

        public string city { get; set; }

        public string sex { get; set; }

        public DateOnly date_of_birth { get; set; }

        public DateTime account_created_at { get; set; }
    }
}
