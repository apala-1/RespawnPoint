import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './updatetutorial.css'; // Ensure this is the correct path to your CSS

const UpdateTutorial = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState({
    name: '',
    youtube_url: '',
    tutorial_text: '',
  });
  const [isOwner, setIsOwner] = useState(false); // Check if the user is the tutorial owner
  const navigate = useNavigate();

  // Fetch the tutorial by ID
  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, user might not be logged in');
          return;
        }
    
        const response = await fetch(`http://localhost:5000/api/tutorials/${id}`, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        const data = await response.json();
        
        if (response.ok) {
          setTutorial(data);
          const user = JSON.parse(localStorage.getItem('user'));
          if (user?.id === data.user_id) {
            setIsOwner(true);
          }
        } else {
          console.error('Error fetching tutorial:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tutorial:', error);
      }
    };
    
    fetchTutorial();
  }, [id]);

  // Handle form submission to update the tutorial
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/tutorials/${id}`, {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: tutorial.name,
          youtube_url: tutorial.youtube_url,
          tutorial_text: tutorial.tutorial_text,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Tutorial updated successfully");
        navigate("/tutorials"); // Redirect to tutorials after successful update
      } else {
        console.error("Error updating tutorial:", data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Handle tutorial deletion
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found, cannot delete tutorial.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/tutorials/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
      });
  
      if (response.ok) {
        console.log('Tutorial deleted successfully');
        navigate('/tutorials'); // Redirect to tutorials after deletion
      } else {
        console.error('Error deleting tutorial');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <div className="update-tutorial-container">
      <h2 className="update-tutorial-heading">Update Tutorial</h2>
      <form className="update-tutorial-form" onSubmit={handleSubmit}>
        <div className="update-tutorial-input-container">
          <label className="update-tutorial-label" htmlFor="name">Name:</label>
          <input
            className="update-tutorial-input"
            id="name"
            type="text"
            value={tutorial.name}
            onChange={(e) => setTutorial({ ...tutorial, name: e.target.value })}
            required
          />
        </div>
        <div className="update-tutorial-input-container">
          <label className="update-tutorial-label" htmlFor="youtubeUrl">YouTube URL:</label>
          <input
            className="update-tutorial-input"
            id="youtubeUrl"
            type="text"
            value={tutorial.youtube_url}
            onChange={(e) => setTutorial({ ...tutorial, youtube_url: e.target.value })}
            required
          />
        </div>
        <div className="update-tutorial-input-container">
          <label className="update-tutorial-label" htmlFor="tutorialText">Description:</label>
          <textarea
            className="update-tutorial-textarea"
            id="tutorialText"
            value={tutorial.tutorial_text}
            onChange={(e) => setTutorial({ ...tutorial, tutorial_text: e.target.value })}
            required
          />
        </div>
        {isOwner && (
          <>
            <button className="update-tutorial-button" type="submit">Update Tutorial</button>
            <button className="delete-tutorial-button" type="button" onClick={handleDelete}>Delete Tutorial</button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateTutorial;
