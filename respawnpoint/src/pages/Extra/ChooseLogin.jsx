import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChooseLogin.css";

const ChooseLogin = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="title">Choose Login Type</h1>
            <div className="button-group">
                <button className="user-button" onClick={() => navigate("/login")}>Login as User</button>
                <button className="admin-button" onClick={() => navigate("/adminlogin")}>Login as Admin</button>
            </div>
        </div>
    );
};

export default ChooseLogin;
