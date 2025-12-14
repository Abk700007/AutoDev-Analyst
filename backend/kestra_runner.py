import yaml
import subprocess
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AGENT_DIR = ROOT / "cline-agent"
WORKFLOW_FILE = ROOT / "kestra-workflows" / "repo-analysis.yaml"
REPORT_PATH = AGENT_DIR / "report.json"

def run_kestra_workflow(repo_url):
    # Load YAML
    with open(WORKFLOW_FILE, "r") as f:
        workflow = yaml.safe_load(f)

    # ---- Step 1: run_cline_agent ----
    print("Running Cline agent via Kestra YAML...")
    subprocess.run(
        ["python3", str(AGENT_DIR / "agent.py")],
        input=repo_url.encode(),
        timeout=120
    )

    # ---- Step 2: Load report ----
    if not REPORT_PATH.exists():
        return {"error": "Kestra: report.json missing"}

    with open(REPORT_PATH, "r") as f:
        report = json.load(f)

    # ---- Step 3: AI Summary (simulated) ----
    summary = f"Kestra workflow summary: analyzed {len(report['files'])} files."

    return {
        "kestra_summary": summary,
        "cline_output": report
    }
