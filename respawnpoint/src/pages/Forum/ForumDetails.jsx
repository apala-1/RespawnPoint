import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../Featured/featured.css";  // You can use the same CSS file

const ForumDetails = () => {
  const { gameId } = useParams();  // Use the gameId from the URL to fetch the game details
  const [gameDetails, setGameDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [profile, setProfile] = useState({ id: "", name: "", email: "", role: "" });

  // Fetch game details and comments
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await axios.get(`http://localhost:5000/api/games/${gameId}`);
        setGameDetails(gameResponse.data);

        // Fetch comments with token in the Authorization header
        const token = localStorage.getItem("token");

        const commentsResponse = await axios.get(
          `http://localhost:5000/comments/forum/${gameId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Include token in the GET request
            },
          }
        );

        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching game details or comments", error);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({ id: user.id, name: user.name, email: user.email, role: user.role });
    }

    fetchGameDetails();
  }, [gameId]);

  // Handle adding a comment
  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to post a comment.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/comments/forum",
        {
          game_id: gameId,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to delete a comment.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the deleted comment from the UI
      setComments(comments.filter((comment) => comment.id !== commentId));
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="forum-details-page">
      <h1>{gameDetails.name} - Forum</h1>
      <img
        src={gameDetails.thumbnail || "https://placehold.co/400"}
        alt={gameDetails.name}
        className="featured-thumbnail"
      />
      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><span>Name:</span> {profile.name || "N/A"}</p>
              <p><span>Email:</span> {profile.email || "N/A"}</p>
              <p><span>Role:</span> {profile.role || "N/A"}</p>
              <p>{comment.comment}</p>
              {/* Only show delete button if user is the owner of the comment or an admin */}
              {profile.id && (comment.user_id === profile.id || profile.role === "admin") && (
                <button onClick={() => handleDeleteComment(comment.id)} className="delete-btn">
                  Delete Comment
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}

        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;
