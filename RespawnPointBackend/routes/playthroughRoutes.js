const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticate = require("../middleware/authenticateUser");

// Get all playthroughs for a specific game
router.get("/game/:gameId", async (req, res) => {
    const { gameId } = req.params;
    try {
        const result = await pool.query(
            "SELECT p.id, p.title, p.url, p.user_id, u.name AS username FROM playthroughs p JOIN \"Users\" u ON p.user_id = u.id WHERE p.game_id = $1", // Corrected "Users"
            [gameId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching playthroughs:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Add a new playthrough
router.post("/game/:gameId", authenticate, async (req, res) => {
    const { gameId } = req.params;
    const { title, url } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            "INSERT INTO playthroughs (game_id, user_id, title, url) VALUES ($1, $2, $3, $4) RETURNING *",
            [gameId, userId, title, url]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error adding playthrough:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a playthrough
router.delete("/:playthroughId", authenticate, async (req, res) => {
    const { playthroughId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role; // Ensure role is properly retrieved

    try {
        // Check if the playthrough exists and if the user owns it or is an admin
        const playthrough = await pool.query("SELECT user_id FROM playthroughs WHERE id = $1", [playthroughId]);

        if (playthrough.rows.length === 0) {
            return res.status(404).json({ error: "Playthrough not found" });
        }

        if (playthrough.rows[0].user_id !== userId && userRole !== "admin") {
            return res.status(403).json({ error: "Not authorized to delete this playthrough" });
        }

        await pool.query("DELETE FROM playthroughs WHERE id = $1", [playthroughId]);
        res.json({ message: "Playthrough deleted successfully" });
    } catch (error) {
        console.error("Error deleting playthrough:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
