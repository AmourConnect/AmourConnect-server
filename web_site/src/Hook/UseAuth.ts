/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Account, AuthStatus, RequestFriends } from "./type";
import { apiFetch, ApiError } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";


export function UseAuth()
{
      const [account, setAccount] = useState<Account | null>(null);
      const [account2, setAccount2] = useState<null | RequestFriends>(null);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let status;
    let status2;



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



      const LoginGoogle = useCallback(() => {
            window.location.href = GOOGLE_LOGIN_URL;
      }, []);



      const GetAllUsersToMatch = useCallback(() => {
       apiFetch<Account>("/User/GetUsersToMach")
            .then(response => setAccount(response))
            .catch(() => setAccount(null));
      }, []);



    const GetUserOnly = useCallback(() => {
        apiFetch<Account>("/User/GetUserOnly")
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
        apiFetch<RequestFriends>("/User/GetRequestFriends")
            .then(response => setAccount2(response))
            .catch(() => setAccount2(null));
    }, []);



    const RequestFriends = useCallback((Id_User :number) => {
        apiFetch<Account>("/User/RequestFriends/" + Id_User, { method: 'POST' })
            .then(response => {
                setAccount(response);
            })
            .catch(error => {
                setAccount(null);
            });
    }, []);
  


    const AcceptRequestFriends = useCallback((Id_User: number) => {
        apiFetch<Account>("/User/AcceptRequestFriends/" + Id_User, { method: 'PATCH' })
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
        GetUserID
      };
}