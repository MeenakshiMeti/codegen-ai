# ⚡ CodeGen AI

An AI-powered code generator built with React + FastAPI + Groq LLaMA 3.

## 🚀 Features
- 🧠 DSA Code Generator
- ⚙️ General Code Generator
- 📖 Code Explainer
- 🐛 Code Debugger
- ⚡ Powered by Groq (LLaMA 3.3 70B)
- 📋 Copy to clipboard
- ⬇️ Download code as file

## 📸 Screenshots

### DSA Generator
![DSA Generator](screenshots/dsa-generator.png)

### General Generator
![General Generator](screenshots/general-generator.png)

### Code Explainer
![Code Explainer](screenshots/code-explainer.png)

### Code Debugger
![Code Debugger](screenshots/code-debugger.png)

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: FastAPI (Python)
- AI: Groq API (LLaMA 3.3 70B)

## ⚙️ How to Run

### Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```
cd frontend
npm install
npm start
```

## 🔑 Environment Setup
Create a `.env` file inside `backend/` folder:
```
GROQ_API_KEY=your_groq_api_key_here
```
Get your free API key at: https://console.groq.com

## 👩‍💻 Built By
Meenakshi — Full Stack AI Project