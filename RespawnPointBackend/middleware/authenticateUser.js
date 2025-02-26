const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Database connection

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ..., role: 'admin' or 'user' }

    console.log("🔹 Decoded Token:", decoded);

    // OPTIONAL: Ensure the user exists in the database
    const result = await pool.query('SELECT id, role FROM "Users" WHERE id = $1', [decoded.id]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user.role = result.rows[0].role;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
