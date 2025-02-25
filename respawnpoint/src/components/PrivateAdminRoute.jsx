import React from "react";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) {
        // If no admin in localStorage, redirect to login
        return <Navigate to="/login" />;
    }
    return children; // Render the children (AdminDashboard) if logged in as admin
};

export default PrivateAdminRoute;
