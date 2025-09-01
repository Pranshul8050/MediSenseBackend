const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let initialized = false;

function initFirebase() {
  if (initialized) return;

  try {
    const credPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    if (!credPath) {
      throw new Error("❌ FIREBASE_SERVICE_ACCOUNT_PATH is not set in .env");
    }

    const resolved = path.resolve(process.cwd(), credPath);

    if (!fs.existsSync(resolved)) {
      throw new Error(`❌ Firebase service account file not found at: ${resolved}`);
    }

    const serviceAccount = require(resolved);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    initialized = true;
    console.log("🔥 Firebase Admin initialized successfully");
  } catch (error) {
    console.error("⚠️ Firebase initialization failed:", error.message);
    process.exit(1);
  }
}

function db() {
  if (!initialized) initFirebase();
  return admin.firestore();
}

module.exports = { initFirebase, db, admin };
