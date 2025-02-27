import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './updategame.css';  // Ensure to import the CSS

const UpdateGame = () => {
    const [game, setGame] = useState({ name: "", thumbnail: "", description: "" });
    const { gameId } = useParams(); // Get the gameId from the URL
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
                setGame(response.data);
            } catch (error) {
                console.error("Error fetching game:", error);
            }
        };
        fetchGame();
    }, [gameId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/games/${gameId}`,
                {
                    name: game.name,
                    thumbnail: game.thumbnail,
                    description: game.description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Game Updated:", response.data);
            // Show success message
            alert("Game updated successfully!");

            // Navigate back to the admin dashboard
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error updating game:", error);
            alert("Error updating the game. Please try again.");
        }
    };

    return (
        <div className="update-game-container">
            <h1 className="update-game-title">Update Game</h1>
            <form onSubmit={handleSubmit} className="update-game-form">
                <div className="form-group">
                    <label htmlFor="game-name">Game Name</label>
                    <input
                        type="text"
                        id="game-name"
                        className="input-field"
                        value={game.name}
                        onChange={(e) => setGame({ ...game, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail URL</label>
                    <input
                        type="text"
                        id="thumbnail"
                        className="input-field"
                        value={game.thumbnail}
                        onChange={(e) => setGame({ ...game, thumbnail: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Game Description</label>
                    <textarea
                        id="description"
                        className="input-field"
                        value={game.description}
                        onChange={(e) => setGame({ ...game, description: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="update-game-btn">Update Game</button>
            </form>
        </div>
    );
};

export default UpdateGame;
