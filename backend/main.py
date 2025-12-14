from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

# Import our custom Kestra workflow executor
from kestra_runner import run_kestra_workflow

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

    # Run full Kestra-style workflow
    result = run_kestra_workflow(repo_url)

    # If runner returned an error
    if "error" in result:
        return {"error": result["error"]}

    # Build final return object
    return {
        "repo": repo_url,
        "cline_output": result["report"],
        "kestra_summary": result["kestra_summary"],
        "oumi_score": "8.2/10 (simulated)"
    }
