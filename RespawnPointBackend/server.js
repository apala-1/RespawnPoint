const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));