import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTutorial = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState({
    name: '',
    youtube_url: '',
    tutorial_text: '',
  });
  const navigate = useNavigate();

  // Fetch the tutorial by ID
  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tutorials/${id}`);
        const data = await response.json();
        setTutorial(data);
      } catch (error) {
        console.error('Error fetching tutorial:', error);
      }
    };
    fetchTutorial();
  }, [id]);

  // Handle form submission to update the tutorial
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/tutorials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: tutorial.name,
        youtube_url: tutorial.youtube_url,
        tutorial_text: tutorial.tutorial_text,
      }),
    });

    if (response.ok) {
      navigate('/tutorials');
    } else {
      console.error('Error updating tutorial');
    }
  };

  // Handle tutorial deletion
    // Handle tutorial deletion
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/api/tutorials/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          navigate('/tutorials');  // Redirect to the tutorials list after deletion
        } else {
          console.error('Error deleting tutorial');
        }
      };

  return (
    <div>
      <h2>Update Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={tutorial.name}
            onChange={(e) => setTutorial({ ...tutorial, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>YouTube URL:</label>
          <input
            type="text"
            value={tutorial.youtube_url}
            onChange={(e) => setTutorial({ ...tutorial, youtube_url: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={tutorial.tutorial_text}
            onChange={(e) => setTutorial({ ...tutorial, tutorial_text: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Tutorial</button>
      </form>

      <button onClick={handleDelete}>Delete Tutorial</button>
    </div>
  );
};

export default UpdateTutorial;
