import { Navigate } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";

type Props = {
  children: React.ReactNode;
};

export function PublicRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}