/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { GetUserDto, AuthStatus, GetMessageDto, GetRequestFriendsDto, AccountState } from "./type";
import { apiFetch, ApiError } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";


export function UseAuth() {

    const [accountState, setAccountState] = useState<AccountState>({
        userDto: null,
        requestFriendsDto: null,
        messageDto: null,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    let status: AuthStatus;


    switch (accountState.userDto) {
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



    const AuthRegister = useCallback((pseudo: string, sex: string, city: string, date_of_birth: Date) => {
        apiFetch<GetUserDto>("/Auth/register", { json: { pseudo, sex, city, date_of_birth } })
            .then(response => {
                setAccountState({ ...accountState, userDto: response })
                setErrorMessage(null);
                window.location.reload();
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    setErrorMessage(error.message);
                }
                setAccountState({ ...accountState, userDto: null })
            });
    }, []);



    const UserGetUsersToMach = useCallback(() => {
       apiFetch<GetUserDto>("/User/GetUsersToMach")
           .then(response => setAccountState({...accountState, userDto: response}))
           .catch(() => setAccountState({...accountState, userDto: null}))
      }, []);



    const UserGetConnected = useCallback(() => {
        apiFetch<GetUserDto>("/User/GetUserConnected")
            .then(response => {
                setAccountState({ ...accountState, userDto: response });
            })
            .catch(() => {
                setAccountState({ ...accountState, userDto: null });
            });
    }, []);



    const UserPatch = useCallback((formData: FormData) => {
        apiFetch<GetUserDto>("/User/UpdateUser", { formData, method: 'PATCH' })
            .then(response => {
                setAccountState({ ...accountState, userDto: response })
                window.location.reload();
            })
            .catch(error => {
                setAccountState({ ...accountState, userDto: null })
            });
    }, []);



    const UserGetUserID = useCallback((Id_User: number) => {
        apiFetch<GetUserDto>("/User/GetUser/" + Id_User)
            .then(response => setAccountState({ ...accountState, userDto: response }))
            .catch(() => setAccountState({ ...accountState, userDto: null }))
    }, []);



    const GetRequestFriends = useCallback(() => {
        apiFetch<GetRequestFriendsDto>("/RequestFriends/GetRequestFriends")
            .then(response => {
                setAccountState({ ...accountState, requestFriendsDto: response })
            })
            .catch(() => {
                setAccountState({ ...accountState, requestFriendsDto: null })
            })
    }, []);



    const RequestFriendsAdd = useCallback((Id_User :number) => {
        apiFetch<GetRequestFriendsDto>("/RequestFriends/AddRequest/" + Id_User)
            .then(response => {
                setAccountState({ ...accountState, requestFriendsDto: response })
            })
            .catch(error => {
                setAccountState({ ...accountState, requestFriendsDto: null })
            });
    }, []);
  


    const AcceptRequestFriends = useCallback((Id_User: number) => {
        apiFetch<GetRequestFriendsDto>("/RequestFriends/AcceptRequestFriends/" + Id_User, { method: 'PATCH' })
            .then(response => {
                setAccountState({ ...accountState, requestFriendsDto: response })
                window.location.reload();
            })
            .catch(error => {
                setAccountState({ ...accountState, requestFriendsDto: null })
            });
    }, []);



    const GetTchatID = useCallback((Id_User: number) => {
        apiFetch<GetMessageDto>("/Message/GetUserMessage/" + Id_User)
            .then(response => setAccountState({ ...accountState, messageDto: response }))
            .catch(() => setAccountState({ ...accountState, messageDto: null }))
    }, []);



    const SendMessage = useCallback((idUserReceiver: number, messageContent: string) => {
        apiFetch<GetMessageDto>("/Message/SendMessage", { json: { idUserReceiver, messageContent } })
            .then(response => {
                setAccountState({ ...accountState, messageDto: response })
                window.location.reload();
            })
            .catch(error => {
                setAccountState({ ...accountState, messageDto: null })
            });
    }, []);


      return {
        status,
        errorMessage,
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
        accountState
      };
}