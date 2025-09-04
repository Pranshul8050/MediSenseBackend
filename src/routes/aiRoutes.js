const express = require("express");
const multer = require("multer");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { scanMedicine } = require("../controllers/aiController");

const router = express.Router();

// ----------------------
// ✅ Setup Gemini
// ----------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ----------------------
// ✅ Ask AI (text query)
// ----------------------
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(question);

    res.json({ answer: result.response.text() });
  } catch (err) {
    console.error("❌ AI Error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ----------------------
// ✅ File upload setup (for scan)
// ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ----------------------
// ✅ Medicine image scan
// ----------------------
router.post("/scan", upload.single("image"), scanMedicine);

module.exports = router;
