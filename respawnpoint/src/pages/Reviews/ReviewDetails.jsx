import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./ReviewDetails.css";

const ReviewDetails = () => {
  const { gameId } = useParams();  // Get the gameId from URL
  const [gameDetails, setGameDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [profile, setProfile] = useState({ id: "", name: "", email: "", role: "" });

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await axios.get(`http://localhost:5000/api/games/${gameId}`);
        setGameDetails(gameResponse.data);

        const token = localStorage.getItem("token");
        const reviewsResponse = await axios.get(`http://localhost:5000/reviews/game/${gameId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching game details or reviews", error);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({ id: user.id, name: user.name, email: user.email, role: user.role });
    }

    fetchGameDetails();
  }, [gameId]);

  const handleAddReview = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to post a review.");
        return;
      }

      const response = await axios.post("http://localhost:5000/reviews/game", {
        id: gameId,  // Change from "game_id" to "id"
        review: newReview,
    }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    

      setReviews([...reviews, response.data]);
      setNewReview('');
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to delete a review.");
        return;
      }

      const response = await axios.delete(`http://localhost:5000/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(reviews.filter((review) => review.id !== reviewId));
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  return (
    <div className="review-details-page">
      <h1>{gameDetails.name} - Reviews</h1>
      <img
        src={gameDetails.thumbnail || "https://placehold.co/400"}
        alt={gameDetails.name}
        className="featured-thumbnail"
      />
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p><span>Name:</span> {profile.name || "N/A"}</p>
              <p><span>Email:</span> {profile.email || "N/A"}</p>
              <p><span>Role:</span> {profile.role || "N/A"}</p>
              <p>{review.review}</p>
              {profile.id && (review.user_id === profile.id || profile.role === "admin") && (
                <button onClick={() => handleDeleteReview(review.id)} className="delete-btn">
                  Delete Review
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        <div className="add-review">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
          />
          <button onClick={handleAddReview}>Post Review</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;