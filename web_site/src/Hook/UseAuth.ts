/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Account, AuthStatus, GetMessageDto, RequestFriends } from "./type";
import { apiFetch, ApiError } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";


export function UseAuth()
{
      const [account, setAccount] = useState<Account | null>(null);
    const [account2, setAccount2] = useState<null | RequestFriends>(null);
    const [account3, setAccount3] = useState<null | GetMessageDto>(null);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let status;
    let status2;
    let status3;



      switch (account) {
        case null:
          status = AuthStatus.Unauthenticated;
          break;
        default:
          status = AuthStatus.Authenticated;
          break;
      }


        switch (account2) {
            case null:
                status2 = AuthStatus.Unauthenticated;
                break;
            default:
                status2 = AuthStatus.Authenticated;
                break;
    }


    switch (account3) {
        case null:
            status3 = AuthStatus.Unauthenticated;
            break;
        default:
            status3 = AuthStatus.Authenticated;
            break;
    }



      const LoginGoogle = useCallback(() => {
            window.location.href = GOOGLE_LOGIN_URL;
      }, []);



      const GetAllUsersToMatch = useCallback(() => {
       apiFetch<Account>("/User/GetUsersToMach")
            .then(response => setAccount(response))
            .catch(() => setAccount(null));
      }, []);



    const GetUserOnly = useCallback(() => {
        apiFetch<Account>("/User/GetUserConnected")
            .then(response => setAccount(response))
            .catch(() => setAccount(null));
    }, []);



    const FinalRegister = useCallback((pseudo: string, sex: string, city: string, date_of_birth: Date) => {
        apiFetch<Account>("/Auth/register", { json: { pseudo, sex, city, date_of_birth } })
                .then(response => {
                    setAccount(response);
                    setErrorMessage(null); 
                    window.location.reload();
                })
                .catch(error => {
                    if (error instanceof ApiError) {
                        setErrorMessage(error.message);
                    }
                    setAccount(null);
                });
      }, []);



    const PatchUser = useCallback((formData: FormData) => {
        apiFetch<Account>("/User/UpdateUser", { formData, method: 'PATCH' })
            .then(response => {
                setAccount(response);
                window.location.reload();
            })
            .catch(error => {
                setAccount(null);
            });
    }, []);



    const GetRequestFriends = useCallback(() => {
        apiFetch<RequestFriends>("/RequestFriends/GetRequestFriends")
            .then(response => setAccount2(response))
            .catch(() => setAccount2(null));
    }, []);



    const RequestFriends = useCallback((Id_User :number) => {
        apiFetch<Account>("/RequestFriends/AddRequest/" + Id_User, { method: 'POST' })
            .then(response => {
                setAccount(response);
            })
            .catch(error => {
                setAccount(null);
            });
    }, []);
  


    const AcceptRequestFriends = useCallback((Id_User: number) => {
        apiFetch<Account>("/RequestFriends/AcceptRequestFriends/" + Id_User, { method: 'PATCH' })
            .then(response => {
                setAccount(response);
                window.location.reload();
            })
            .catch(error => {
                setAccount(null);
            });
    }, []);



    const GetUserID = useCallback((Id_User: number) => {
        apiFetch<Account>("/User/GetUser/" + Id_User)
            .then(response => setAccount(response))
            .catch(() => setAccount(null));
    }, []);


    
    const GetTchatID = useCallback((Id_User: number) => {
        apiFetch<GetMessageDto>("/Message/GetUserMessage/" + Id_User)
            .then(response => setAccount3(response))
            .catch(() => setAccount3(null));
    }, []);


    const SendMessage = useCallback((idUserReceiver: number, messageContent: string) => {
        apiFetch<Account>("/Message/SendMessage", { json: { idUserReceiver, messageContent } })
            .then(response => {
                setAccount(response);
                window.location.reload();
            })
            .catch(error => {
                setAccount(null);
            });
    }, []);


      return {
       status,
       status2,
        GetAllUsersToMatch,
        LoginGoogle,
        FinalRegister,
        account,
        errorMessage,
        GetUserOnly,
        PatchUser,
        GetRequestFriends,
        RequestFriends,
        AcceptRequestFriends,
        account2,
        GetUserID,
       account3,
          SendMessage,
          GetTchatID,
       status3
      };
}