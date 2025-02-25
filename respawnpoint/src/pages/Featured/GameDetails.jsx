import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./gameDetails.css"; // Add styles if needed

const GameDetails = () => {
  const { id } = useParams(); // Get game ID from URL
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

  if (!game) {
    return <p>Loading...</p>;
  }

  // Access the first image from the 'images' array and format the path
  const imageUrl = game.images && game.images.length > 0 
    ? `http://localhost:5000/${game.images[0].replace(/\\/g, '/')}`
    : 'https://placehold.co/600x400';

  return (
    <div className="game-details">
      <h1>{game.name}</h1>
      <img src={game.thumbnail} alt={game.name} className="game-thumbnail" />
      <p>{game.description}</p>
      <img
        src={imageUrl}
        alt={game.name}
        className="game-image"
      />
    </div>
  );
};

export default GameDetails;
