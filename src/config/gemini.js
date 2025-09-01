const axios = require('axios');

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function askGemini(system, prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is missing in .env');

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: (system ? system + '\n' : '') + prompt }]
      }
    ]
  };

  const { data } = await axios.post(`${GEMINI_URL}?key=${key}`, body);
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer generated.';
  return text;
}

module.exports = { askGemini };
