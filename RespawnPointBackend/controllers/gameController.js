const pool = require("../config/db");

// Get a single game by ID
const getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Game not found" });
        }

        // Convert Windows path to URL-friendly path
        const game = result.rows[0];
        game.images = game.images.map(image => image.replace("\\", "/")); // Replace backslash with forward slash

        res.json(game);
    } catch (error) {
        console.error("Error fetching game:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Save a new game
const addGame = async (req, res) => {
    try {
        const { name, thumbnail, description } = req.body;

        if (!name || !thumbnail || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Ensure req.files exists before using map()
        const images = req.files ? req.files.map(file => file.path) : [];

        const result = await pool.query(
            "INSERT INTO games (name, thumbnail, description, images) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, thumbnail, description, images]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error saving game:", error);
        res.status(500).json({ error: "Failed to save game", details: error.message });
    }
};



// Fetch all games
const getGames = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM games ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: "Failed to fetch games" });
    }
};

module.exports = { getGames, getGameById, addGame };
