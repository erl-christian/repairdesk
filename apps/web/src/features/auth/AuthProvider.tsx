import { useMemo, useState, type ReactNode } from "react";

import { AuthContext } from "./auth-context";
import type { AuthUser } from "./types";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.localStorage.getItem("token");

    if (!stored) return null;

    try {
      const [, payload] = stored.split(".");
      if (!payload) return stored;

      const decoded = JSON.parse(atob(payload));

      // `exp` is in seconds since epoch
      if (decoded && typeof decoded.exp === "number") {
        const now = Date.now() / 1000;
        if (now >= decoded.exp) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");
          return null;
        }
      }

      return stored;
    } catch {
      // If token is malformed, clear it
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      return null;
    }
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = window.localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      window.localStorage.removeItem("user");
      return null;
    }
  });

  const login = (jwt: string, authUser: AuthUser) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(authUser));

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
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
