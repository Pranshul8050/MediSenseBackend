const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// =====================
// ✅ Messages Collection
// =====================

// POST /api/firestore/add-message
router.post("/add-message", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "name and message are required" });
    }

    const docRef = await db().collection("messages").add({
      name,
      message,
      createdAt: new Date(),
    });

    res.json({ id: docRef.id, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add message" });
  }
});

// GET /api/firestore/all-messages
router.get("/all-messages", async (req, res) => {
  try {
    const snapshot = await db().collection("messages").get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ======================
// ✅ Medicines Collection
// ======================

// POST /api/firestore/add-medicine
router.post("/add-medicine", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "medicine name is required" });
    }

    const docRef = await db().collection("medicines").add({
      name,
      description: description || "",
      scannedAt: new Date(),
    });

    res.json({ id: docRef.id, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

// GET /api/firestore/all-medicines
router.get("/all-medicines", async (req, res) => {
  try {
    const snapshot = await db().collection("medicines").get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

module.exports = router;
