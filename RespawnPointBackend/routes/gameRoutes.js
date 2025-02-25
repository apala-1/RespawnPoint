const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");  // For handling file uploads
const { addFeaturedGame, getAllFeaturedGames, getFeaturedGameById, updateFeaturedGame, deleteFeaturedGame } = require("../controllers/gameController");

// Add a new game (with images upload)
router.post("/", upload.array("images"), addFeaturedGame);

// Get all featured games
router.get("/", getAllFeaturedGames);

// Get a specific game by ID
router.get("/:id", getFeaturedGameById);

// Update a specific game by ID
router.put("/:id", updateFeaturedGame);

// Delete a specific game by ID
router.delete("/:id", deleteFeaturedGame);

module.exports = router;
