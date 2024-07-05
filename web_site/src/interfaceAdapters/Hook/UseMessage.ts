import { useCallback, useState } from "react";
import {GetMessageDto } from "@/entities/GetMessageDto";
import {SetMessageDto } from "@/entities/SetMessageDto";
import { apiClient } from "@/services/apiClient";

export const UseMessage = () => 
{
    const [messageDto, setMessageDto] = useState<GetMessageDto | null>(null);

    const GetTchatID = useCallback((Id_User: number) => {
        apiClient.FetchData<GetMessageDto>("/Message/GetUserMessage/" + Id_User)
            .then(response => setMessageDto(response))
            .catch(() => setMessageDto(null))
    }, []);



    const SendMessage = useCallback((SetMessageDto: SetMessageDto) => {
        apiClient.FetchData<GetMessageDto>("/Message/SendMessage", { json: SetMessageDto })
            .then(response => {
            })
            .catch(() => setMessageDto(null))
    }, []);

    return {
        GetTchatID,
        SendMessage,
        messageDto
    }
}