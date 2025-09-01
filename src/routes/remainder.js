const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// ➕ Add Reminder
router.post("/", async (req, res) => {
  try {
    const { title, time } = req.body;
    if (!title || !time) {
      return res.status(400).json({ error: "title and time required" });
    }
    const docRef = await db.collection("reminders").add({
      title,
      time,
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add reminder" });
  }
});

// 📄 Get All Reminders
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("reminders").get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

module.exports = router;
