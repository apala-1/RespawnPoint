import React, { useState } from "react";
import "./Forgot.css";

const Forgot = () => {
    const [email, setEmail] = useState(""); // To store the email entered by the user
    const [message, setMessage] = useState(""); // To store success or error message

    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update the email state as the user types
    };

    const requestPasswordReset = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/request-reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }), // Ensure `email` is passed correctly here
            });
            const data = await response.json();
            if (data.success) {
                setMessage("Password reset email sent. Please check your inbox.");
            } else {
                setMessage(data.message || "Error sending reset email.");
            }
        } catch (error) {
            console.error("Error:", error); // Log the error for more insights
            setMessage("Error sending password reset email.");
        }
    };
    

    return (
        <div className="forgot">
            <div className="forgotPassword-container">
                <h1 className="title">Password Reset Form</h1>
                <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button className="forgotPassBtn" onClick={requestPasswordReset}>
                    Reset Password
                </button>
                <a href="/login">Go to Log In</a>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Forgot;
