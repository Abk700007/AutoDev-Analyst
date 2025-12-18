# 🌟 AutoDev Analyst

### *AI-Powered GitHub Repository Analyzer*

AutoDev Analyst is an end-to-end AI tool that clones any public GitHub repository, scans its codebase, summarizes its structure, identifies important files, and produces an AI-generated technical overview — all through a beautiful, interactive UI.

It integrates modern tools including:

* ⚙ **Cline Agent (Local Execution)** – For repo cloning & code scanning
* 🤖 **Simulated Kestra Workflow** – Workflow-style processing pipeline
* 🧠 **Simulated Oumi Evaluation** – AI scoring output
* 🌐 **FastAPI Backend (Render)** – Runs the pipeline server-side
* 🎨 **Next.js + Tailwind Frontend (Vercel)** – Smooth UI with particles & wave animations

---

## 🚀 Live Demo

 [https://auto-dev-analyst-r640ohjfd-abhiranjan-kumars-projects.vercel.app/](https://auto-dev-analyst.vercel.app/)

---

## ✨ Features

### 🧪 1. Clone & Scan GitHub Repositories

* Clones the repo server-side
* Scans up to **200 files** for performance
* Collects metadata: file names, sizes, types

### 📊 2. Repository Summary Generation

Generates a high-level summary:

* Number of files
* Code structure
* Key source files

### ⚙ 3. Kestra-Style Workflow Simulation

Uses your workflow YAML to imitate real Kestra behavior:

* Execute agent tasks
* Load generated report
* Produce summary output

### 🧠 4. Oumi AI Score (Simulated)

Provides a mock score (e.g., **8.2/10**) to mimic AI evaluation.

### 🎨 5. Beautiful Animated Frontend

* Floating particle system
* AI wave gradients
* Smooth motion transitions
* Glassmorphism card UI
  
---

## 🏗 Project Structure

```
AutoDev-Analyst/
│
├── backend/
│   ├── main.py
│   ├── kestra_runner.py
│   └── requirements.txt
│
├── cline-agent/
│   ├── agent.py
│   └── report.json
│
├── kestra-workflows/
│   └── repo_analysis.yaml
│
├── frontend/
│   └── web-ui/
│       └── app/page.tsx
│
└── README.md
```

---

## ⚡ Tech Stack

### Frontend

* Next.js 14
* Tailwind CSS
* Custom animations
* Vercel deployment

### Backend

* FastAPI
* Python 3
* Render deployment

### AI / Workflow

* Cline Agent (real)
* Kestra workflow YAML (simulated)
* AI scoring (simulated)

---

## 📦 API Usage

### POST `/analyze`

#### Request:

```json
{
  "repoUrl": "https://github.com/user/repo"
}
```

#### Response:

```json
{
  "repo": "...",
  "cline_output": { ... },
  "kestra_summary": "...",
  "oumi_score": "8.2/10 (simulated)"
}
```

---

## 🛠 Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend/web-ui
npm install
npm run dev
```

---

### ✔ Potential Impact

Instant repo analysis for developers.

### ✔ Creativity & Originality

Combines cloning, scanning, workflow YAML, and animations.

### ✔ Technical Implementation

Multiple integrated systems with deployment.

### ✔ Learning & Growth

Shows strong practical learning.

### ✔ UX & Aesthetics

Premium animated UI.

### ✔ Communication

Clear UI + API + structure.

---

## 🌟 Future Enhancements

* Real Kestra Cloud execution
* Real Oumi scoring
* Code smell detection
* Complexity graph
* Agent-based multi-step reasoning

---

## 🧑‍💻 Author

**Abhiranjan Kumar**

GitHub: [https://github.com/Abk700007](https://github.com/Abk700007)

---

