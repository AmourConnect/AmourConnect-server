import { Account, AuthStatus } from "./type";
import { useCallback, useState } from "react";
import { apiFetch } from "./apiFetch";

export function useAuth() {
  const [account, setAccount] = useState<Account | null | undefined>(null);
  let status;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(() => {
    console.log('Authenticating...');
    apiFetch<Account>("/auth/get/SessionStatus")
      .then(response => setAccount(response))
      .catch(() => setAccount(null));
  }, []);
  

  return {
    status,
    account,
    authenticate
  };
}