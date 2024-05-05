import { useCallback, useState } from "react";
import { Account, AuthStatus, UserRegister } from "./type";
import { apiFetch } from "./apiFetch";
import { GOOGLE_LOGIN_URL } from "../lib/config";
import { useRouter } from 'next/navigation'

export function useAuth() {
    const [account, setAccount] = useState<Account | null | undefined>(null);
    const [error, setError] = useState('');
    const router = useRouter();
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
      apiFetch<Account>("/User")
      .then(response => setAccount(response))
      .catch(() => setAccount(null));
  }, []);


    const LoginGoogle = useCallback(() => {
        window.location.href = GOOGLE_LOGIN_URL;
    }, []);


    const FinalRegister = useCallback((pseudo: string, sex: string, city: string, dateOfBirth: string) => {
        apiFetch<UserRegister>("/Auth/register", { json: { pseudo, sex, city, dateOfBirth } })
            .then(response => {
                setAccount(response);
                setError('');
                router.push('/welcome');
            })
            .catch(error => {
                setAccount(null);
                setError(error.message);
            });
    }, []);
  

  return {
    status,
    authenticate,
    LoginGoogle,
    FinalRegister,
    error,
    account
  };
}