/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { GetUserDto, AuthStatus, GetMessageDto, GetRequestFriendsDto } from "./type";
import { apiFetch, ApiError } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";


export function UseAuth() {

    const [userDto, setUserDto] = useState<GetUserDto | null>(null);
    const [requestFriendsDto, setRequestFriendsDto] = useState<GetRequestFriendsDto | null>(null);
    const [messageDto, setMessageDto] = useState<GetMessageDto | null>(null);
    const [MessageApi, setMessageApi] = useState<string | null>(null);

    let status: AuthStatus;


    switch (userDto) {
        case null:
          status = AuthStatus.Unauthenticated;
          break;
        default:
          status = AuthStatus.Authenticated;
          break;
    }



    const AuthLoginGoogle = useCallback(() => {
            window.location.href = GOOGLE_LOGIN_URL;
    }, []);



    const AuthRegister = useCallback((pseudo: string, sex: string, city: string, date_of_birth: Date, description: string) => {
        apiFetch<GetUserDto>("/Auth/register", { json: { pseudo, sex, city, date_of_birth, description } })
            .then(response => {
                setUserDto(response);
                setMessageApi(null);
                window.location.reload();
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    setMessageApi(error.message);
                }
                setUserDto(null)
            });
    }, []);



    const UserGetUsersToMach = useCallback(() => {
        apiFetch<GetUserDto>("/User/GetUsersToMach")
            .then(response => setUserDto(response))
            .catch(() => setUserDto(null))
    }, []);



    const UserGetConnected = useCallback(() => {
        apiFetch<GetUserDto>("/User/GetUserConnected")
            .then(response => setUserDto(response))
            .catch(() => setUserDto(null))
    }, []);



    const UserPatch = useCallback((formData: FormData) => {
        apiFetch<GetUserDto>("/User/UpdateUser", { formData, method: 'PATCH' })
            .then(response => {
                setUserDto(response);
                window.location.reload();
            })
            .catch(() => setUserDto(null))
    }, []);



    const UserGetUserID = useCallback((Id_User: number) => {
        apiFetch<GetUserDto>("/User/GetUser/" + Id_User)
            .then(response => setUserDto(response))
            .catch(() => setUserDto(null))
    }, []);



    const GetRequestFriends = useCallback(() => {
        apiFetch<GetRequestFriendsDto>("/RequestFriends/GetRequestFriends")
            .then(response => setRequestFriendsDto(response))
            .catch(() => setRequestFriendsDto(null))
    }, []);



    const RequestFriendsAdd = useCallback((Id_User :number) => {
        apiFetch<GetRequestFriendsDto>("/RequestFriends/AddRequest/" + Id_User, { method: 'POST' })
            .then(response => {
                setRequestFriendsDto(response);
                setMessageApi(null);
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    setMessageApi(error.message);
                }
                setRequestFriendsDto(null)
            });
    }, []);
  


    const AcceptRequestFriends = useCallback((Id_User: number) => {
        apiFetch<GetRequestFriendsDto>("/RequestFriends/AcceptRequestFriends/" + Id_User, { method: 'PATCH' })
            .then(response => {
            })
            .catch(() => setRequestFriendsDto(null))
    }, []);



    const GetTchatID = useCallback((Id_User: number) => {
        apiFetch<GetMessageDto>("/Message/GetUserMessage/" + Id_User)
            .then(response => setMessageDto(response))
            .catch(() => setMessageDto(null))
    }, []);



    const SendMessage = useCallback((idUserReceiver: number, messageContent: string) => {
        apiFetch<GetMessageDto>("/Message/SendMessage", { json: { idUserReceiver, messageContent } })
            .then(response => {
            })
            .catch(() => setMessageDto(null))
    }, []);


      return {
        status,
        MessageApi,
        GetRequestFriends,
        AcceptRequestFriends,
        SendMessage,
        GetTchatID,
        RequestFriendsAdd,
        AuthLoginGoogle,
        AuthRegister,
        UserGetUsersToMach,
        UserGetConnected,
        UserPatch,
        UserGetUserID,
        userDto,
        messageDto,
        requestFriendsDto
      };
}