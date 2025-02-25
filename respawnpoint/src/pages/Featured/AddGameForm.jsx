import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addGameForm.css";

const AddGameForm = () => {
  const [game, setGame] = useState({
    name: "",
    thumbnail: "",
    description: "",
    photos: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setGame({ ...game, photos: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Use the state to access the values
    const { name, thumbnail, description, photos } = game;
  
    fetch("http://localhost:5000/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, thumbnail, description, photos }), // Ensure this matches your backend expectations
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add game");
        return res.json();
      })
      .then(() => navigate("/featured")) // ✅ Redirect after saving
      .catch((err) => console.error("Error:", err));
  };
  


  return (
    <div className="form-container">
      <h2>Add a New Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Game Name"
          value={game.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={game.thumbnail}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Game Description"
          value={game.description}
          onChange={handleChange}
          required
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddGameForm;
