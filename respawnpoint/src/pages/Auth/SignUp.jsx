import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; 
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullName = event.target.fullname.value;
        const email = event.target.email.value;
        const userName = event.target.username.value;
        const gender = event.target.gender.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm_password.value;

 
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
        
            await signup(fullName, email, password);

            alert("Sign Up Successful!");
            navigate("/login"); 
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h1>SignUp Form</h1>
                {error && <p className="error-message">{error}</p>} 
                <form onSubmit={handleSubmit}>
                    <input 
                        id="name"
                        type="text" 
                        name="fullname"
                        placeholder="Full Name" 
                        required
                    />
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        required
                    />
                    <input 
                        id="username" 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        required
                    />
                    <div className="gender-div">
                        <label className="gender">Gender:</label><br/>
                        <label className="radioBtn">
                            <input type="radio" name="gender" value="male" required /> Male
                        </label>
                        <label className="radioBtn">
                            <input type="radio" name="gender" value="female" /> Female
                        </label>
                        <label className="radioBtn">
                            <input type="radio" name="gender" value="other" /> Other
                        </label>
                    </div>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        minLength="6" 
                        required
                    />
                    <input 
                        id="confirmPassword" 
                        type="password" 
                        name="confirm_password" 
                        placeholder="Confirm Password" 
                        minLength="6" 
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <a href="/login" className="link">Already have an account?</a>
            </div>
        </div>
    );
};

export default SignUp;
