import { Account } from "./type.ts";
import { useAccountStore } from "../store.ts";
import { useCallback } from "react";
import { apiFetch } from "../utils/api.ts";

export function useAuth() {
  const { account, setAccount } = useAccountStore();
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
    apiFetch<Account>("/me")
      .then(setAccount)
      .catch(() => setAccount(null));
  }, []);

  const login = useCallback((username: string, password: string) => {
    apiFetch<Account>("/login", { json: { username, password } }).then(
      setAccount
    );
  }, []);

  const logout = useCallback(() => {
    apiFetch<Account>("/logout", { method: "DELETE" }).then(setAccount);
  }, []);

  return {
    status,
    authenticate,
    login,
    logout,
  };
}