import React from "react";
import { hasRole, isAuthenticated } from "../services/authService"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({requiredRole, redirectPath = '/login'}) => {
    const authenticated = isAuthenticated();

    // If the role is required, check if user has it
    const hasRequiredRole = requiredRole ? hasRole(requiredRole) : true;

    if(!authenticated || (requiredRole && !hasRequiredRole)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;