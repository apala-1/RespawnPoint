import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./PlaythroughDetails.css";

const getVideoIdFromUrl = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*\?v=|(?:v|e(?:mbed)?)\/)([\w-]+)|youtu\.be\/([\w-]+))/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };  
  
  const PlaythroughDetails = () => {
    const { gameId } = useParams();
    const [gameDetails, setGameDetails] = useState({});
    const [playthroughs, setPlaythroughs] = useState([]);
    const [newPlaythrough, setNewPlaythrough] = useState({ title: "", url: "" });
    const [profile, setProfile] = useState({ id: "", name: "", email: "", role: "" });
  
    useEffect(() => {
      const fetchGameDetails = async () => {
        try {
          const gameResponse = await axios.get(`http://localhost:5000/api/games/${gameId}`);
          setGameDetails(gameResponse.data);
  
          const token = localStorage.getItem("token");
          const playthroughResponse = await axios.get(`http://localhost:5000/playthroughs/game/${gameId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          setPlaythroughs(playthroughResponse.data);
        } catch (error) {
          console.error("Error fetching game details or playthroughs", error);
        }
      };
  
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setProfile({ id: user.id, name: user.name, email: user.email, role: user.role });
      }
  
      fetchGameDetails();
    }, [gameId]);
  
    const handleAddPlaythrough = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to be logged in to add a playthrough.");
          return;
        }
  
        const response = await axios.post(`http://localhost:5000/playthroughs/game/${gameId}`, {
          title: newPlaythrough.title,
          url: newPlaythrough.url,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setPlaythroughs([...playthroughs, response.data]);
        setNewPlaythrough({ title: "", url: "" });
      } catch (error) {
        console.error("Error adding playthrough:", error);
      }
    };
  
    const handleDeletePlaythrough = async (playthroughId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to be logged in to delete a playthrough.");
          return;
        }
  
        await axios.delete(`http://localhost:5000/playthroughs/${playthroughId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setPlaythroughs(playthroughs.filter((p) => p.id !== playthroughId));
      } catch (error) {
        console.error("Error deleting playthrough:", error);
      }
    };
  
    return (
      <div className="playthrough-details-page">
        <h1>{gameDetails.name} - Playthroughs</h1>
        <img
          src={gameDetails.thumbnail || "https://placehold.co/400"}
          alt={gameDetails.name}
          className="featured-thumbnail"
        />
        <div className="playthroughs-section">
          <h2>Playthroughs</h2>
          {playthroughs.length > 0 ? (
            playthroughs.map((playthrough) => {
              const videoId = getVideoIdFromUrl(playthrough.url); // Extract video ID
              return (
                <div key={playthrough.id} className="playthrough">
                  <h3>{playthrough.title}</h3>
                  {videoId ? (
                    <iframe
                      className="tutorial-video"
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder="0"
                      allowFullScreen
                      title={playthrough.title}
                    ></iframe>
                  ) : (
                    <p className="loading">Invalid YouTube URL</p>
                  )}
  
                  {profile.id && (playthrough.user_id === profile.id || profile.role === "admin") && (
                    <button onClick={() => handleDeletePlaythrough(playthrough.id)} className="delete-btn">
                      Delete Playthrough
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No playthroughs yet.</p>
          )}
  
          <div className="add-playthrough">
            <input
              type="text"
              value={newPlaythrough.title}
              onChange={(e) => setNewPlaythrough({ ...newPlaythrough, title: e.target.value })}
              placeholder="Playthrough title..."
            />
            <input
              type="text"
              value={newPlaythrough.url}
              onChange={(e) => setNewPlaythrough({ ...newPlaythrough, url: e.target.value })}
              placeholder="YouTube URL..."
            />
            <button onClick={handleAddPlaythrough}>Add Playthrough</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PlaythroughDetails;
  