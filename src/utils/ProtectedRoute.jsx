// ProtectedRoute.js

import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
