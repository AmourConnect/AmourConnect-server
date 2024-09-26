﻿using Domain.Entities;
using Domain.Dtos.GetDtos;

namespace Infrastructure.Interfaces
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message Message);
        Task<ICollection<GetMessageDto>> GetMessagesAsync(int idUserIssuer, int idUserReceiver);
        Task<bool> DeleteMessageAsync(int Id_Message);
    }
}