const multer = require("multer");

// Configure multer storage (adjust path as needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure "uploads/" directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Export the middleware to be used in your route file
module.exports = upload;
