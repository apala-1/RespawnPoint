import React, { useEffect, useState } from "react";
import axios from "axios";
import "./featured.css";

const AdminFeatured = () => {
    const [games, setGames] = useState([]);

    // Fetch the games from the backend when the component mounts
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

            <div className="title"><h1 className="h1">Featured Games</h1></div>

            <a href="/addgame"><button className="addBtn">Add Games +</button></a>

            <div className="featured-section">
                {/* Dynamically display games */}
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="featured-card"
                        onClick={() => window.location.href = `/game/${game.id}`}
                    >
                        <img
                            src={`http://localhost:5000/${game.thumbnail}`} // Use game thumbnail dynamically
                            alt={game.name}
                            className="featured-thumbnail"
                        />
                        <h2>{game.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminFeatured;
