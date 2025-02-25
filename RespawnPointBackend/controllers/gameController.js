const pool = require("../config/db");

// Add a new featured game
const addFeaturedGame = async (req, res) => {
    try {
        const { name, thumbnail, description } = req.body;

        if (!name || !thumbnail || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const images = req.files ? req.files.map(file => file.path) : [];

        // Ensure the query references the correct table: featured_games
        const result = await pool.query(
            "INSERT INTO featured_games (name, thumbnail, description, images) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, thumbnail, description, images]
        );        

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error saving featured game:", error);
        res.status(500).json({ error: "Failed to save game", details: error.message });
    }
};

// Get all featured games
const getAllFeaturedGames = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM featured_games ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching featured games:", error);
        res.status(500).json({ error: "Failed to fetch games" });
    }
};

// Get a specific featured game by ID
const getFeaturedGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM featured_games WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching featured game:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a specific featured game by ID
const updateFeaturedGame = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Updating game with ID:", id); // This will show the ID in the console.

        const { name, thumbnail, description } = req.body;

        if (!name || !thumbnail || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await pool.query(
            "UPDATE featured_games SET name = $1, thumbnail = $2, description = $3 WHERE id = $4 RETURNING *",
            [name, thumbnail, description, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Game not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating game:", error);
        res.status(500).json({ error: "Failed to update game" });
    }
};

  

// Delete a specific featured game by ID
const deleteFeaturedGame = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM featured_games WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.json({ message: "Game deleted successfully" });
    } catch (error) {
        console.error("Error deleting featured game:", error);
        res.status(500).json({ error: "Failed to delete game" });
    }
};

module.exports = { addFeaturedGame, getAllFeaturedGames, getFeaturedGameById, updateFeaturedGame, deleteFeaturedGame };
