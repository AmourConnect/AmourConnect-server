/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Account, AuthStatus } from "./type";
import { apiFetch, ApiError } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";


export function UseAuth()
{
      const [account, setAccount] = useState<Account | null>(null);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      let status;



      switch (account) {
        case null:
          status = AuthStatus.Unauthenticated;
          break;
        default:
          status = AuthStatus.Authenticated;
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
  


      return {
        status,
        GetAllUsersToMatch,
        LoginGoogle,
        FinalRegister,
        account,
        errorMessage,
        GetUserOnly,
        PatchUser,
      };
}