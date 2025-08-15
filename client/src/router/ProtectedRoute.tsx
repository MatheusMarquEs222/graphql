import { authStorage } from "@/services/authStorage";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
    const location = useLocation();
    const isAuth = Boolean(authStorage.accessToken);
    
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return <Outlet />;
}