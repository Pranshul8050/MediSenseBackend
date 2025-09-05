🟢 Backend README (MediSenseBackend)
# 🧠 MediSense Backend

This is the backend for **MediSense**, a medicine identification and health assistant app.  
It is built with **Node.js, Express, Firebase Firestore, and Google Gemini AI**.

---

## 🚀 Features
- REST APIs for managing:
  - ✅ Medicines
  - ✅ Symptoms
  - ✅ Messages
- AI-powered medicine Q&A using **Gemini API**
- Image upload for medicine scanning (via Multer)
- Hosted on **Render**

---

## ⚙️ Tech Stack
- **Node.js + Express**
- **Firebase Firestore**
- **Google Generative AI (Gemini)**
- **Multer** (for file uploads)
- Hosted on **Render**

---

## 📂 Project Structure


backend/
│── src/
│ ├── routes/ # Express routes (AI, Firestore, etc.)
│ ├── controllers/ # Business logic
│ ├── uploads/ # Uploaded files
│ ├── app.js # Express app setup
│── .env.example # Example environment variables
│── package.json


---

## 🔑 Environment Variables
Create a `.env` file in the root:



PORT=8080
FIREBASE_PROJECT_ID=xxxx
FIREBASE_PRIVATE_KEY=xxxx
FIREBASE_CLIENT_EMAIL=xxxx
GEMINI_API_KEY=xxxx


---

## ▶️ Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start normally
npm start


API will run on http://localhost:8080

🌍 Deployment

This backend is deployed on Render:
👉 https://medisensebackend.onrender.com

📌 API Endpoints
Healthcheck
GET /

Medicines
POST /api/firestore/add-medicine
GET  /api/firestore/all-medicines

Symptoms
POST /api/firestore/add-symptom
GET  /api/firestore/all-symptoms

Messages
POST /api/firestore/add-message
GET  /api/firestore/all-messages

AI
POST /api/ai/ask
