const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    // Example call to AI (Gemini / OpenAI etc.)
    const aiResponse = `AI Response for: ${prompt}`;
    res.json({ answer: aiResponse });
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router;
