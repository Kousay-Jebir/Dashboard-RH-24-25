import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;