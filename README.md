# ⚡ CodeGen AI

An AI-powered code generator built with React + FastAPI + Groq LLaMA 3.3 70B, featuring user authentication and code history.

## 🌐 Live Demo
👉 [Click here to use CodeGen AI](https://codegen-ai-woad.vercel.app)

## 🚀 Features
- 🧠 **DSA Code Generator** — Generate optimized DSA solutions with time & space complexity
- ⚙️ **General Code Generator** — Generate code in 5 different modes
- 📖 **Code Explainer** — Get clear step-by-step explanation of any code
- 🐛 **Code Debugger** — Find and fix bugs automatically
- 🎨 **Syntax Highlighting** — Beautiful colored code output like VS Code
- 📋 **Copy & Download** — Copy or download generated code instantly
- 💾 **Save History** — Save your generated code to Firebase
- 📜 **View History** — Access all your previously generated code
- 👤 **Profile Page** — View your profile, stats and code history
- 🔐 **Authentication** — Login with Google or Email/Password
- 🌐 **15+ Languages** — Python, Java, C++, JavaScript, TypeScript, Go, Rust, Swift, Kotlin, PHP, Ruby, Scala, Dart, R, Bash, SQL

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | FastAPI (Python) |
| AI Engine | Groq API (LLaMA 3.3 70B) |
| Authentication | Firebase Auth |
| Database | Firebase Firestore |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Analytics | Google Analytics |

## ⚙️ How to Run Locally

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file inside `backend/` folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

Run backend:
```bash
py -3.11 -m uvicorn main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔑 Environment Setup

Get your free Groq API key at: https://console.groq.com

## 🗂️ Project Structure
```
codegen-ai/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DSAGenerator.js
│   │   │   ├── GeneralGenerator.js
│   │   │   ├── CodeExplainer.js
│   │   │   ├── CodeDebugger.js
│   │   │   ├── CodeOutput.js
│   │   │   ├── Login.js
│   │   │   ├── History.js
│   │   │   └── Profile.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── firebase.js
│   └── public/
│       └── index.html
├── screenshots/
├── outputs/
└── README.md
```

## 👩‍💻 Built By
**Meenakshi** — Full Stack AI Developer

- 🔗 GitHub: https://github.com/MeenakshiMeti
- 💼 LinkedIn: https://www.linkedin.com/in/meenakshi-meti-75bb6a354
- 🌐 Live App: https://codegen-ai-woad.vercel.app

## ⭐ If you like this project, give it a star on GitHub!