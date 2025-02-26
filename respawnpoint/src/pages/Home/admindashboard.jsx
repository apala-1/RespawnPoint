import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [gameId, setGameId] = useState(""); // Store gameId input
    const navigate = useNavigate();

    const handleUpdate = () => {
        if (!gameId) {
            alert("Please enter a Game ID to update.");
            return;
        }
        navigate(`/update-game/${gameId}`); // Navigate to update page with the gameId
    };

    const handleDelete = async () => {
        if (!gameId) {
            alert("Please enter a Game ID to delete.");
            return;
        }

        try {
            // Corrected route for delete API
            const response = await axios.delete(`http://localhost:5000/api/games/${gameId}`);
            alert("Game deleted successfully");
        } catch (error) {
            console.error("Error deleting game:", error);
            alert("Failed to delete the game");
        }
    };

    const handleCreate = () => {
        navigate("/create-game"); // Navigate to the page for creating a game
    };

    const handleLogout = () => {
  localStorage.removeItem("token"); // Remove JWT
  window.location.href = "/login"; // Redirect to login page
};

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>

            <a href="/profile">
  <button className="profile-btn">Profile</button>
</a>
                {/* Button for creating a new game */}
                <button onClick={handleCreate}>Create Game</button>
            </div>
        

            <div>
                <input
                    type="text"
                    placeholder="Enter Game ID"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                />
            </div>


            <div>
                {/* Button to update the game */}
                <button onClick={handleUpdate}>Update Game</button>

                {/* Button to delete the game */}
                <button onClick={handleDelete}>Delete Game</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
