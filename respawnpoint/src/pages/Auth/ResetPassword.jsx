import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        console.log("Sending request to reset password..."); // Debugging log
    
        try {
            const res = await axios.post(`http://localhost:5000/auth/reset-password/${token}`, {
                newPassword,
            });
    
            console.log("Response:", res.data); // Debugging log
            setMessage(res.data.message);
        } catch (error) {
            console.error("Error:", error.response?.data?.message || error);
            setMessage(error.response?.data?.message || "Error resetting password");
        }
    };
    

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleReset}>
                <input 
                    type="password" 
                    placeholder="New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
