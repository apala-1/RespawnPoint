import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GameDetails = () => {
    const { id } = useParams();  // ✅ Get game ID from URL
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/games/${id}`);
                setGame(response.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };

        fetchGameDetails();
    }, [id]);

    if (!game) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>{game.name}</h1>
            <p>{game.description}</p>
            <div>
                {game.images.map((image, index) => (
                    <img src={`http://localhost:5000/${image}`} alt={game.name} width="200" key={index} />
                ))}
            </div>
        </div>
    );
};

export default GameDetails;
