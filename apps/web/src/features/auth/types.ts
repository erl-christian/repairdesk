export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface AuthUser {
  username: string;
}

export interface AuthContextType {
    user: AuthUser | null
    token: string | null

    login: (token: string ) => void
    logout: () => void

    isAuthenticated: boolean
}