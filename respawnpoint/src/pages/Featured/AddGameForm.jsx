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
    formData.append("thumbnail", game.thumbnail); // Should be a valid URL
    formData.append("description", game.description);
  
    for (const file of game.images) {
      formData.append("images", file);
    }
  
    // 🔍 Log FormData entries to verify
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/games", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        alert("Game saved successfully!");
      }
    } catch (error) {
      console.error("Error saving game:", error.response?.data || error.message);
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
