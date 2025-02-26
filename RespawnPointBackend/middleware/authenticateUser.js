const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Authorization Header:", req.header("Authorization")); // Log the full Authorization header

  if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      console.log("Token verification error:", err); // Log error for debugging
      return res.status(400).json({ message: "Invalid token." });
  }
};


module.exports = authenticateUser;
