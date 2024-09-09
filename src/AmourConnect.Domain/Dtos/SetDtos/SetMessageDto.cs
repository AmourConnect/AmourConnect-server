﻿using System.ComponentModel.DataAnnotations;

namespace AmourConnect.Domain.Dtos.SetDtos
{
    public class SetMessageDto
    {
        [Required]
        public int IdUserReceiver { get; set; }

        [Required]
        public string MessageContent { get; set; }
    }
}
