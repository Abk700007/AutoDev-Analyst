from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json
import os

app = FastAPI()

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

    # 1. Determine correct absolute path to agent.py
    agent_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "cline-agent", "agent.py")
    )

    print(f"Running agent from: {agent_path}")

    # 2. Run Cline agent with absolute path
    try:
        subprocess.run(
            ["python3", agent_path],
            input=f"{repo_url}\n".encode(),
            timeout=120
        )
    except Exception as e:
        return {"error": f"Failed to run Cline agent: {e}"}

    # 3. Determine correct absolute path to report.json
    report_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "cline-agent", "report.json")
    )

    print(f"Looking for report.json at: {report_path}")

    if not os.path.exists(report_path):
        return {"error": f"report.json not found at {report_path}"}

    with open(report_path, "r") as f:
        report_data = json.load(f)

    kestra_summary = f"Analyzed {len(report_data.get('files', []))} files."
    oumi_score = "8.2/10 (simulated)"

    return {
        "repo": repo_url,
        "cline_output": report_data,
        "kestra_summary": kestra_summary,
        "oumi_score": oumi_score
    }
