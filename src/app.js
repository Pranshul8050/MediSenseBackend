const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initFirebase } = require('./config/firebase');

dotenv.config();
const app = express();

app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://medi-sense-frontend.vercel.app')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));

// ✅ Init Firebase
initFirebase();

// ✅ Routes
const aiRoutes = require('./routes/aiRoutes');
const firestoreRoutes = require('./routes/firestoreRoutes');

app.use('/api/ai', aiRoutes);          // /ask and /scan
app.use('/api/firestore', firestoreRoutes);

// ✅ Health Check
app.get('/', (req, res) => {
  res.json({ message: '✅ Medisnap backend running' });
});

// ✅ Graceful Shutdown
process.on("SIGINT", () => {
  console.log("👋 Server shutting down...");
  process.exit();
});

module.exports = app;

