const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// ➕ Add Medicine
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "name and description required" });
    }
    const docRef = await db.collection("medicines").add({
      name,
      description,
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

// 📄 Get All Medicines
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("medicines").get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

module.exports = router;
