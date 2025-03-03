const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticate = require("../middleware/authenticateUser");

// Add a comment
// Add a comment to a specific game
router.post("/game", authenticate, async (req, res) => {
    try {
        const { id, review } = req.body;  // Use "id" instead of "game_id"
        const user_id = req.user.id;

        if (!id || !review) {
            return res.status(400).json({ error: "Game ID and review are required." });
        }

        // Check if the game exists in featured_games
        const gameCheck = await pool.query("SELECT id FROM featured_games WHERE id = $1", [id]);
        if (gameCheck.rows.length === 0) {
            return res.status(400).json({ error: "Game does not exist." });
        }

        // Insert review if the game exists
        const newReview = await pool.query(
            "INSERT INTO reviews (game_id, user_id, review) VALUES ($1, $2, $3) RETURNING *",
            [id, user_id, review] // Use "id" instead of "game_id"
        );

        res.json(newReview.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

  
// Get comments for a specific game
router.get("/game/:gameId", async (req, res) => {
    try {
        const { gameId } = req.params;
        const result = await pool.query("SELECT * FROM reviews WHERE game_id = $1", [gameId]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Server error" });
    }
  });
  

// Delete a comment
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;  // Fix here
        const user_id = req.user.id;
        const user_role = req.user.role; 

        // Check if review exists
        const review = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);  // Fix here
        if (review.rows.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Allow only admin or the user who posted the review to delete it
        if (review.rows[0].user_id !== user_id && user_role !== "admin") {
            return res.status(403).json({ error: "Unauthorized to delete this review" });
        }

        await pool.query("DELETE FROM reviews WHERE id = $1", [id]);  // Fix here
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
