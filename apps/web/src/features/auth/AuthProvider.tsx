import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "./auth-context";
import type { AuthUser } from "./types";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({
  children,
}: Props) => {
  const [token, setToken] = useState<string | null>(
    () => {
      if (typeof window === "undefined") {
        return null;
      }

      return window.localStorage.getItem("token");
    }
  );

  const [user, setUser] = useState<AuthUser | null>(
    () => {
      if (typeof window === "undefined") {
        return null;
      }

      const storedUser =
        window.localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      try {
        return JSON.parse(storedUser) as AuthUser;
      } catch {
        window.localStorage.removeItem("user");
        return null;
      }
    }
  );

  const login = (
    jwt: string,
    authUser: AuthUser
  ) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem(
      "user",
      JSON.stringify(authUser)
    );

    setToken(jwt);
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};