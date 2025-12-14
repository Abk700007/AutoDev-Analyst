import os
import subprocess
import json
from pathlib import Path

# repo root = backend folder's parent
ROOT = Path(__file__).resolve().parent.parent  
AGENT_DIR = ROOT / "cline-agent"
REPO_DIR = AGENT_DIR / "repo"
REPORT_PATH = AGENT_DIR / "report.json"

def clone_repo(repo_url):
    if REPO_DIR.exists():
        subprocess.run(["rm", "-rf", str(REPO_DIR)])
    subprocess.run(["git", "clone", repo_url, str(REPO_DIR)])
    return str(REPO_DIR)

def analyze_code(repo_dir):
    report = {
        "files": [],
        "summary": "",
        "issues": []
    }

    for root, dirs, files in os.walk(repo_dir):
        for file in files:
            if file.endswith(('.py', '.js', '.java', '.md', '.ts')):
                path = os.path.join(root, file)
                size = os.path.getsize(path)

                report["files"].append({
                    "name": file,
                    "path": path,
                    "size_bytes": size
                })

    report["summary"] = f"Analyzed {len(report['files'])} source files."
    report["issues"] = ["Static analysis TBD."]

    return report

def save_report(report):
    with open(REPORT_PATH, "w") as f:
        json.dump(report, f, indent=4)

def main():
    repo_url = input().strip()
    repo_dir = clone_repo(repo_url)
    report = analyze_code(repo_dir)
    save_report(report)
    print("Saved:", REPORT_PATH)

if __name__ == "__main__":
    main()
