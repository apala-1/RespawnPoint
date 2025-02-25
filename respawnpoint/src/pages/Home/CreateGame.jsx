import React, { useState } from "react";
import axios from "axios";

const CreateGame = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

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
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Game Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                required
            />
            <textarea
                placeholder="Game Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input type="file" multiple onChange={handleImageChange} />
            <button type="submit">Create Game</button>
        </form>
    );
};

export default CreateGame;
