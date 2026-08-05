import { useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import type { AuthUser } from "./types";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const storedToken = typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;

    const [token, setToken] = useState<string | null>(() => {
        if (typeof window === "undefined") return null
        return window.localStorage.getItem("token")
    })

    const [user, setUser] = useState<AuthUser | null>(
        storedToken
            ? {
                username: "Admin",
            }
            : null
        );

    const login = (jwt: string) => {
        localStorage.setItem("token", jwt);

        setToken(jwt);
        setUser({
            username: "Admin",
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const value = useMemo(() => ({
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
    }),[token, user],);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
