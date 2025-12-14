from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

    # Run Kestra workflow runner
    result = run_kestra_workflow(repo_url)

    # Handle error gracefully
    if "error" in result:
        return result

    return {
        "repo": repo_url,
        "cline_output": result["report"],
        "kestra_summary": result["kestra_summary"],
        "oumi_score": "8.2/10 (simulated)"
    }
