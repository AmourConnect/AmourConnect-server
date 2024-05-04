using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_api.Models
{
    public class Swipe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_Swipe { get; set; }

        [Required]
        public int Id_User { get; set; }
        public User? User { get; set; }

        [Required]
        public int Id_User_which_was_Swiped { get; set; }
        public User? UserWhichWasSwiped { get; set; }

        [Required]
        public DateTime Date_of_swiping { get; set; }
    }
}