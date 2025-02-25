import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Use this hook to get the game ID from the URL

const GameDetail = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams(); // Get the game ID from the URL

  useEffect(() => {
    // Fetch the game details from the backend
    fetch(`http://localhost:5000/api/games/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          // If there is a "message" field, it means the game wasn't found
          console.log(data.message);
        } else {
          setGame(data); // Set the game details
        }
      })
      .catch((err) => console.error("Error fetching game:", err));
  }, [id]);

  if (!game) return <p>Loading...</p>; // Show a loading state while fetching data

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.thumbnail} alt={game.name} />
      <p>{game.description}</p>
      {/* Add any additional game details or buttons here */}
    </div>
  );
};

export default GameDetail;
