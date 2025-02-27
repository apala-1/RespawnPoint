import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./creategame.css"; // Ensure to import the CSS

const CreateGame = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate(); // Initialize navigate hook

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("thumbnail", thumbnail);
        formData.append("description", description);
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/games", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Game Created:", response.data);

            // Show success message
            alert("Game created successfully!");

            // Navigate to the admin dashboard
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error creating game:", error);
            alert("Error creating the game. Please try again.");
        }
    };

    return (
        <div className="create-game-container">
            <h1 className="create-game-title">Create New Game</h1>
            <form onSubmit={handleSubmit} className="create-game-form">
                <div className="form-group">
                    <label htmlFor="game-name">Game Name</label>
                    <input
                        type="text"
                        id="game-name"
                        className="input-field"
                        placeholder="Game Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail URL</label>
                    <input
                        type="text"
                        id="thumbnail"
                        className="input-field"
                        placeholder="Thumbnail URL"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Game Description</label>
                    <textarea
                        id="description"
                        className="input-field"
                        placeholder="Game Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Game Images</label>
                    <input type="file" id="images" multiple onChange={handleImageChange} />
                </div>

                <button type="submit" className="create-game-btn">Create Game</button>
            </form>
        </div>
    );
};

export default CreateGame;
