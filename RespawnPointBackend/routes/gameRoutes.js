const express = require("express");
const { getGames, addGame, getGameById } = require("../controllers/gameController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getGames);
router.post("/", upload.array("images", 5), addGame);
router.get("/:id", getGameById); 

module.exports = router;
