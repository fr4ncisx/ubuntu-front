import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";

interface ProtectedRouteProps {
  roles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRole = user.rol;

  if (!userRole || !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
