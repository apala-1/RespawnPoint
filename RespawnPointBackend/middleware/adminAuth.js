const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.role !== "admin") return res.status(403).json({ message: "Not Authorized" });

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = adminAuth;
