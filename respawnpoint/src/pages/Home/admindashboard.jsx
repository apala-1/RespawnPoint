import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admindashboard.css";

const AdminDashboard = () => {
  const [gameId, setGameId] = useState(""); // Store gameId input
  const [commentId, setCommentId] = useState(""); // Store commentId input for deletion
  const [tutorialId, setTutorialId] = useState(""); // Store tutorialId input for deletion
  const navigate = useNavigate();

  // Navigate to update game page
  const handleUpdate = () => {
    if (!gameId) {
      alert("Please enter a Game ID to update.");
      return;
    }
    navigate(`/update-game/${gameId}`); // Navigate to update page with the gameId
  };

  // Delete game by gameId
  const handleDeleteGame = async () => {
    if (!gameId) {
      alert("Please enter a Game ID to delete.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/games/${gameId}`);
      alert("Game deleted successfully");
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("Failed to delete the game");
    }
  };

  // Delete comment by commentId
  const handleDeleteComment = async () => {
    if (!commentId) {
      alert("Please enter a Comment ID to delete.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to delete a comment.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete the comment");
    }
  };

  // Delete tutorial by tutorialId
  const handleDeleteTutorial = async () => {
    if (!tutorialId) {
      alert("Please enter a Tutorial ID to delete.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, cannot delete tutorial.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/tutorials/${tutorialId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Tutorial deleted successfully");
        alert("Tutorial deleted successfully!");
        navigate("/admin-dashboard");
      } else {
        console.error("Error deleting tutorial");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Navigate to create game page
  const handleCreate = () => {
    navigate("/create-game"); // Navigate to the page for creating a game
  };

  // Logout admin
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
        <button onClick={handleUpdate}>Update Game</button>
        <button onClick={handleDeleteGame}>Delete Game</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter Comment ID"
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
        />
        <button onClick={handleDeleteComment}>Delete Comment</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter Tutorial ID"
          value={tutorialId}
          onChange={(e) => setTutorialId(e.target.value)}
        />
        <button onClick={handleDeleteTutorial}>Delete Tutorial</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
