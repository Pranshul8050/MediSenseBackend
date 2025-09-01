const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initFirebase } = require('./config/firebase');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middlewares

app.use(express.json());

// Initialize Firebase
initFirebase();

// ----------------------
// ✅ Routes
// ----------------------
const aiRoutes = require('./routes/aiRoutes');
const firestoreRoutes = require('./routes/firestoreRoutes');

app.use('/api/ai', aiRoutes);
console.log("✅ AI routes loaded");

app.use('/api/firestore', firestoreRoutes);
console.log("✅ Firestore routes loaded");

// ----------------------
// ✅ Health check route
// ----------------------
app.get('/', (req, res) => {
  res.json({ message: '✅ Medisnap backend running' });
});

const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowed.length ? allowed : true, // true = allow all (dev)
  credentials: true
}));


// Graceful shutdown
process.on("SIGINT", () => {
  console.log("👋 Server shutting down...");
  process.exit();
});

module.exports = app;
