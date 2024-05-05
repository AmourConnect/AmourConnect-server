/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Account, AuthStatus, UserRegister } from "./type";
import { apiFetch } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";



export function UseAuth()
{
      const [account, setAccount] = useState<Account | null | UserRegister>(null);
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
        apiFetch<Account>("/User")
            .then(response => setAccount(response))
            .catch(() => setAccount(null));
      }, []);


      const FinalRegister = useCallback((pseudo: string, sex: string, city: string, dateOfBirth: string) => {
            apiFetch<UserRegister>("/Auth/register", { json: { pseudo, sex, city, dateOfBirth } })
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
        account
      };
}