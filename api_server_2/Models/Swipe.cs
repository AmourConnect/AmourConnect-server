using System.ComponentModel.DataAnnotations;

namespace api_server_2.Models
{
    public class Swipe
    {
        [Key]
        public int Id_Swipe { get; set; }

        public int Id_User { get; set; }

        public User User { get; set; }

        public int Id_User_Swiped { get; set; }

        public DateOnly Moment_of_swiping { get; set; }
    }
}