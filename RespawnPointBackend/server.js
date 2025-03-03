const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const gameRoutes = require("./routes/gameRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminProfileRoutes = require("./routes/adminProfileRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const playthroughRoutes = require("./routes/playthroughRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Add this line
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend domain (localhost:5173) to access the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/games", gameRoutes);
app.use('/api', profileRoutes);
app.use("/api", adminProfileRoutes);
app.use('/api', tutorialRoutes);
app.use("/comments", commentsRoutes);
app.use("/reviews", reviewRoutes);
app.use("/playthroughs", playthroughRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));