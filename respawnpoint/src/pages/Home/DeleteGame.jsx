import React from "react";
import axios from "axios";

const DeleteGame = ({ gameId }) => {
    const handleDelete = async () => {
        try {
            // Correct API endpoint (no need for 'delete' in the URL)
            await axios.delete(`http://localhost:5000/api/games/${gameId}`);
            alert("Game deleted successfully");
        } catch (error) {
            console.error("Error deleting game:", error);
            alert("Failed to delete game");
        }
    };

    return <button onClick={handleDelete}>Delete Game</button>;
};

export default DeleteGame;
