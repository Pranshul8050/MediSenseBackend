const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let initialized = false;

function initFirebase() {
  if (initialized) return;

  try {
    const creds = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    if (!creds) {
      throw new Error("❌ FIREBASE_SERVICE_ACCOUNT_PATH is not set in env");
    }

    let serviceAccount;

    try {
      // First, try to parse the environment variable as a JSON string (for Render)
      serviceAccount = JSON.parse(creds);
    } catch (e) {
      // If parsing fails, assume it's a file path (for local development)
      const resolvedPath = path.resolve(process.cwd(), creds);

      if (!fs.existsSync(resolvedPath)) {
        throw new Error(`❌ Firebase service account file not found at: ${resolvedPath}`);
      }

      serviceAccount = require(resolvedPath);
    }

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