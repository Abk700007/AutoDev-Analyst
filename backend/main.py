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

    # 1. Run Cline agent script
    try:
        print("Running Cline agent...")
        subprocess.run(
            ["python3", "cline-agent/agent.py"],
            input=f"{repo_url}\n".encode(),
            timeout=120
        )
    except Exception as e:
        return {"error": f"Failed to run Cline agent: {e}"}

    # 2. Path to report.json (absolute)
    report_path = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__), "..", "cline-agent", "report.json"
        )
    )

    # Check if report.json exists
    if not os.path.exists(report_path):
        return {"error": f"report.json not found at {report_path}"}

    # Load report.json
    with open(report_path, "r") as f:
        report_data = json.load(f)

    # 3. Dummy Kestra summary (we'll upgrade later)
    kestra_summary = f"Analyzed {len(report_data.get('files', []))} files."

    # 4. Dummy Oumi score
    oumi_score = "8.2/10 (simulated)"

    return {
        "repo": repo_url,
        "cline_output": report_data,
        "kestra_summary": kestra_summary,
        "oumi_score": oumi_score
    }
