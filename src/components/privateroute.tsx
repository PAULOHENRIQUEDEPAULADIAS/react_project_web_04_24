import React from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  element: React.ReactElement;
  isAuthenticated: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;