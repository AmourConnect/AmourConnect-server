import { useCallback, useState } from "react";
import {GetUserDto } from "@/entities/GetUserDto";
import { apiClient } from "@/services/apiClient";


export const UseUser = () =>
{
    const [usersDto, setUsersDto] = useState<GetUserDto | null>(null);
    const [userIDDto, setUserIDDto] = useState<GetUserDto | null>(null);

    const UserGetUsersToMach = useCallback(() => {
        apiClient.FetchData<GetUserDto>("/User/GetUsersToMach")
            .then(response => setUsersDto(response))
            .catch(() => setUsersDto(null))
    }, []);

    const UserPatch = useCallback((formData: FormData) => {
        apiClient.FetchData<GetUserDto>("/User/UpdateUser", { formData, method: 'PATCH' })
            .then(response => {
            })
            .catch(response => {
                window.location.reload();
            })
    }, []);


    const UserGetUserID = useCallback((Id_User: number) => {
        apiClient.FetchData<GetUserDto>("/User/GetUser/" + Id_User)
            .then(response => setUserIDDto(response))
            .catch(() => setUserIDDto(null))
    }, []);

    return {
        usersDto,
        UserGetUsersToMach,
        UserPatch,
        userIDDto,
        UserGetUserID,
    }
}