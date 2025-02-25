const express = require("express");
const { getGames, addGame } = require("../controllers/gameController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getGames);
router.post("/", upload.array("images", 5), addGame);

module.exports = router;
