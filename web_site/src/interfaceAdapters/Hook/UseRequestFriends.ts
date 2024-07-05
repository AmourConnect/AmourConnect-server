import { useCallback, useState } from "react";
import {GetRequestFriendsDto } from "@/entities/GetRequestFriendsDto";
import { apiClient, ApiError } from "@/services/apiClient";

export const UseRequestFriends = () =>
{
    const [requestFriendsDto, setRequestFriendsDto] = useState<GetRequestFriendsDto | null>(null);
    const [MessageApiR, setMessageApiR] = useState<string | null>(null);


    const GetRequestFriends = useCallback(() => {
        apiClient.FetchData<GetRequestFriendsDto>("/RequestFriends/GetRequestFriends")
            .then(response => setRequestFriendsDto(response))
            .catch(() => setRequestFriendsDto(null))
    }, []);


    const RequestFriendsAdd = useCallback((Id_User :number) => {
        apiClient.FetchData<GetRequestFriendsDto>("/RequestFriends/AddRequest/" + Id_User, { method: 'POST' })
            .then(response => {
                setRequestFriendsDto(response);
                setMessageApiR(null);
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    setMessageApiR(error.message);
                }
                setRequestFriendsDto(null)
            });
    }, []);
  

    const AcceptRequestFriends = useCallback((Id_User: number) => {
        apiClient.FetchData<GetRequestFriendsDto>("/RequestFriends/AcceptRequestFriends/" + Id_User, { method: 'PATCH' })
            .then(response => {
            })
            .catch(() => setRequestFriendsDto(null))
    }, []);

    return {
        AcceptRequestFriends,
        RequestFriendsAdd,
        GetRequestFriends,
        requestFriendsDto,
        MessageApiR
    }
} 