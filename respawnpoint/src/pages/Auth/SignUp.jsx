import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullName = event.target.fullname.value; // Get fullName
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm_password.value;
    
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/auth/register", {
                name: fullName,  // Send name here
                email,
                password,
            });
    
            alert("Sign Up Successful!");
            navigate("/login"); // Redirect to login after successful signup
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
