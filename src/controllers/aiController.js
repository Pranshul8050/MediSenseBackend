const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { asyncHandler } = require("../utils/errorHandler");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // supports images

// POST /api/ai/scan
const scanMedicine = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // Convert file to base64
  const filePath = path.join(__dirname, "../uploads", req.file.filename);
  const fileData = fs.readFileSync(filePath);
  const base64Image = fileData.toString("base64");

  // Ask Gemini Vision
  const prompt = `You are a helpful medical assistant. 
  Analyze the provided medicine image and return:
  - Medicine name
  - Usage
  - Side effects
  - Precautions
  Keep the response short and structured and if the side effect and precaution are not mentioned in picture uploaded, then based on yr research data , provide caution and side effects .`;

  const result = await visionModel.generateContent([
    { text: prompt },
    {
      inlineData: {
        data: base64Image,
        mimeType: req.file.mimetype,
      },
    },
  ]);

  // Get response
  const answer = result.response.text();

  res.json({ answer });
});

module.exports = { scanMedicine };
