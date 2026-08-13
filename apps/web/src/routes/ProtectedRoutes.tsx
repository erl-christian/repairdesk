import { Navigate } from "react-router-dom"

import { useAuth } from "@/features/auth/useAuth"

type Props = {
    children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;