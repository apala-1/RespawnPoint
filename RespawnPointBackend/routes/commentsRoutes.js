const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticate = require("../middleware/authenticateUser");

// Add a comment
// Add a comment to a specific game
router.post("/forum", authenticate, async (req, res) => {
    try {
      const { game_id, comment } = req.body;
      const user_id = req.user.id;
  
      if (!game_id || !comment) {
        return res.status(400).json({ error: "Game ID and comment are required." });
      }
  
      const newComment = await pool.query(
        "INSERT INTO comments (game_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *",
        [game_id, user_id, comment]
      );
  
      res.json(newComment.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

// Get comments for a specific game
// Get comments for a specific game
router.get("/forum/:gameId", async (req, res) => {
    try {
      const { gameId } = req.params;
      const comments = await pool.query(
          `SELECT comments.*, "Users"."name" 
           FROM comments 
           JOIN "Users" ON comments.user_id = "Users".id 
           WHERE game_id = $1 
           ORDER BY comments.created_at DESC`, 
          [gameId]
        );
        
      res.json(comments.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

// Delete a comment
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const user_role = req.user.role;

    // Check if the comment belongs to the user or if they are an admin
    const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);

    if (comment.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (comment.rows[0].user_id !== user_id && user_role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this comment." });
    }

    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    res.json({ message: "Comment deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
