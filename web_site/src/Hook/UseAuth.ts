import { useCallback, useState } from "react";
import { Account, AuthStatus, UserRegister } from "./type";
import { apiFetch } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";

export function useAuth() {
  const [account, setAccount] = useState<Account | null | undefined>(null);
  let status;

  switch (account) {
    case null:
      status = AuthStatus.Unauthenticated;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }


  const authenticate = useCallback(() => {
      apiFetch<Account>("User")
      .then(response => setAccount(response))
      .catch(() => setAccount(null));
  }, []);


    const LoginGoogle = useCallback(() => {
        window.location.href = GOOGLE_LOGIN_URL;
    }, []);


    const FinalRegister = useCallback((pseudo: UserRegister, sex: UserRegister, city: UserRegister, dateOfBirthday: UserRegister) => {
        apiFetch<Account>("Auth/register", { json: { pseudo, sex, city, dateOfBirthday } }).then(
      setAccount
    );
  }, []);
  

  return {
    status,
    authenticate,
    LoginGoogle,
    FinalRegister
  };
}