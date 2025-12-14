from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json
import os

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_repo(data: dict):
    repo_url = data.get("repoUrl")
    if not repo_url:
        return {"error": "Missing repo URL"}

    # 1. Run Cline agent
    try:
        print("Running Cline agent...")
        subprocess.run(
            ["python3", "../cline-agent/agent.py"],
            input=repo_url.encode(),
            timeout=120
        )
    except Exception as e:
        return {"error": f"Failed to run Cline agent: {e}"}

    # 2. Load report.json
    if not os.path.exists("report.json"):
        return {"error": "report.json not found"}

    with open("report.json", "r") as f:
        report_data = json.load(f)

    # 3. Simulated Kestra workflow call (we can make real call later)
    kestra_summary = f"Analyzed {len(report_data.get('files', []))} files."

    # 4. Oumi evaluation (will add real call soon)
    oumi_score = "8.2/10 (simulated)"

    return {
        "repo": repo_url,
        "cline_output": report_data,
        "kestra_summary": kestra_summary,
        "oumi_score": oumi_score
    }
