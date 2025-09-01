const express = require("express");
const multer = require("multer");
const path = require("path");
const { scanMedicine } = require("../controllers/aiController");

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Medicine image scan
router.post("/scan", upload.single("image"), scanMedicine);

module.exports = router;
