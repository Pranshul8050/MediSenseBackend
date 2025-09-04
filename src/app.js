const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initFirebase } = require('./config/firebase');

dotenv.config();
const app = express();

app.use(express.json());

// CORS
const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowed.length ? allowed : true,
  credentials: true
}));

// Init Firebase
initFirebase();

// Routes
const aiRoutes = require('./routes/aiRoutes');
const firestoreRoutes = require('./routes/firestoreRoutes');

app.use('/api/ai', aiRoutes);          // ✅ now has /ask and /scan
app.use('/api/firestore', firestoreRoutes);

app.get('/', (req, res) => {
  res.json({ message: '✅ Medisnap backend running' });
});

process.on("SIGINT", () => {
  console.log("👋 Server shutting down...");
  process.exit();
});

module.exports = app;
