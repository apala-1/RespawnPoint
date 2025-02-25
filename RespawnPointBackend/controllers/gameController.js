const pool = require("../config/db");

// Save a new game
const addGame = async (req, res) => {
    try {
        console.log("Request Headers:", req.headers);
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { name, thumbnail, description } = req.body;
        const imageFiles = req.files.map(file => `uploads/${file.originalname}`);

        if (!name || !thumbnail || !description || imageFiles.length === 0) {
            console.log("Missing Fields:", { name, thumbnail, description, imageFiles });
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await pool.query(
            "INSERT INTO games (name, thumbnail, description, images) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, thumbnail, description, imageFiles]
        );

        res.json({ success: true, game: result.rows[0] });
    } catch (error) {
        console.error("Error saving game:", error);
        res.status(500).json({ error: "Failed to save game" });
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

module.exports = { addGame, getGames };
