import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  console.log("ProtectedRoute check:", { isAuthenticated, loading });

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
