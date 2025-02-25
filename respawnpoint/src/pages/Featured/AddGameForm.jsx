import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addGameForm.css";

const AddGameForm = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState({
    name: "",
    thumbnail: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    setGame({ ...game, images: Array.from(e.target.files) });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", game.name);
    formData.append("thumbnail", game.thumbnail); // Thumbnail is a URL, not a file
    formData.append("description", game.description);

    if (game.images.length > 0) {
        game.images.forEach((file) => formData.append("images", file));
    }

    try {
        const response = await axios.post("http://localhost:5000/api/games", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("✅ Response:", response.data);

        if (response.data.success) {
            alert("Game saved successfully!");
            setGame({ name: "", thumbnail: "", description: "", images: [] });
            navigate("/featured");
        }
    } catch (error) {
        console.error("❌ Error saving game:", error.response?.data || error.message);
        alert("Failed to save game.");
    }
};

  

  return (
    <div className="form-container">
      <h2>Add a New Game</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Game Name" value={game.name} onChange={handleChange} required />
        <input type="text" name="thumbnail" placeholder="Thumbnail URL" value={game.thumbnail} onChange={handleChange} required />
        <textarea name="description" placeholder="Game Description" value={game.description} onChange={handleChange} required />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddGameForm;
