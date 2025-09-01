const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// ➕ Add Message
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "⚠️ 'name' and 'message' are required" });
    }

    const docRef = await db().collection("messages").add({
      name,
      message,
      createdAt: new Date(),
    });

    res.json({ id: docRef.id, success: true });
  } catch (err) {
    console.error("❌ Error adding message:", err.message);
    res.status(500).json({ error: "Failed to add message" });
  }
});

// 📄 Get All Messages
router.get("/", async (req, res) => {
  try {
    const snapshot = await db().collection("messages").orderBy("createdAt", "desc").get();

    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(docs);
  } catch (err) {
    console.error("❌ Error fetching messages:", err.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
