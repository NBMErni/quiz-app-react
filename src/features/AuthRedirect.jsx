// src/components/AuthRedirect.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirect = ({ children, redirectTo }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default AuthRedirect;
