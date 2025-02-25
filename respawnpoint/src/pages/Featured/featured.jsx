import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import "./featured.css";

const Featured = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games");
        console.log("Fetched games:", response.data); // ✅ Log the entire response
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
  
    fetchGames();
  }, []);
  

  return (
    <div className="entire-page">
      <div className="navbar">
        <div className="navbar-left">
          <h1>RESPAWN POINT</h1>
        </div>
        <div className="navbar-center">
          <ul>
            <li>Home</li>
            <li>Tutorials</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className="navbar-right">
          <div className="items-right">
            <a href="/profile"><button className="logIn">Profile</button></a>
            <a href="/settings"><button className="signUp">Settings</button></a>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>

      <div className="title">
        <h1 className="h1">Featured Games</h1>
      </div>

      <div className="featured-section">
      {games.length > 0 ? (
  games.map((game) => {
    console.log("Game name:", game.name);
    console.log("Thumbnail URL:", game.thumbnail);

    return (
      <div
  className="featured-card"
  key={game.id}
  onClick={() => navigate(`/game/${game.id}`)}
>

        <img
          src={game.thumbnail ? game.thumbnail : "https://placehold.co/400"}
          alt={game.name}
          className="featured-thumbnail"
        />
        <h2>{game.name}</h2>
        <p>{game.description}</p>
      </div>
    );
  })
) : (
  <p>No games available</p>
)}

      </div>
    </div>
  );
};

export default Featured;
