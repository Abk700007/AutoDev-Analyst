import yaml
import subprocess
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AGENT_DIR = ROOT / "cline-agent"
WORKFLOW_FILE = ROOT / "kestra-workflows" / "repo_analysis.yaml"
REPORT_PATH = AGENT_DIR / "report.json"

def run_kestra_workflow(repo_url):
    # Load YAML workflow
    try:
        with open(WORKFLOW_FILE, "r") as f:
            workflow = yaml.safe_load(f)
    except Exception as e:
        return {"error": f"Failed to load workflow YAML: {e}"}

    # Run Cline Agent
    print("Running Cline agent via Kestra YAML...")
    try:
        subprocess.run(
            ["python3", str(AGENT_DIR / "agent.py")],
            input=f"{repo_url}\n".encode(),
            timeout=120
        )
    except Exception as e:
        return {"error": f"Kestra: Failed running Cline agent: {e}"}

    # Load report.json
    print("Kestra looking for:", REPORT_PATH)
    if not REPORT_PATH.exists():
        return {"error": f"Kestra: report.json missing at {REPORT_PATH}"}

    try:
        with open(REPORT_PATH, "r") as f:
            report = json.load(f)
    except Exception as e:
        return {"error": f"Kestra: Failed reading report.json: {e}"}

    # Generate Kestra-style summary
    file_count = len(report.get("files", []))
    summary_text = f"Analyzed {file_count} files using Kestra workflow."

    return {
        "report": report,
        "kestra_summary": summary_text
    }
