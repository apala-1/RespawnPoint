import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateGame = () => {
    const [game, setGame] = useState({ name: "", thumbnail: "", description: "" });
    const { gameId } = useParams(); // Get the gameId from the URL

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

        // Sending data as application/json
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
        } catch (error) {
            console.error("Error updating game:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={game.name}
                onChange={(e) => setGame({ ...game, name: e.target.value })}
                required
            />
            <input
                type="text"
                value={game.thumbnail}
                onChange={(e) => setGame({ ...game, thumbnail: e.target.value })}
                required
            />
            <textarea
                value={game.description}
                onChange={(e) => setGame({ ...game, description: e.target.value })}
                required
            />
            <button type="submit">Update Game</button>
        </form>
    );
};

export default UpdateGame;
