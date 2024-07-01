import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./ProtectedRoutes";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireUser= ({ children }: RequireAuthProps) => {
  const auth = useAuth();
  if (!auth.user || !(auth.user.role === 'SELLER')) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequireUser;
