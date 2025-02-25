import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import "./featured.css";

const Featured = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games");
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

      <div className="featured">
        <div className="shown-games">
          {games.length > 0 ? (
            games.map((game, index) => (
              <div 
                className={index % 2 === 0 ? "first-game-shown" : "second-game-shown"} 
                key={game.id}
                style={{ backgroundImage: `url(${game.thumbnail})` }}
                onClick={() => navigate(`/game/${game.id}`)}  // Navigate to the game details
              >
                <h1>{game.name}</h1>
                <p>{game.description}</p>
              </div>
            ))
          ) : (
            <p>No games available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Featured;
