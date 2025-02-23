import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // user will be in context

  if (!user || user.role !== "admin") {
    // Redirect to login page if not admin or not logged in
    return <Navigate to="/admin-dashboard" />;
  }

  return children; // If admin, render the children (admin dashboard in this case)
};

export default PrivateAdminRoute;
