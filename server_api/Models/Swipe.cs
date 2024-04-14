using System.ComponentModel.DataAnnotations;

namespace server_api.Models
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