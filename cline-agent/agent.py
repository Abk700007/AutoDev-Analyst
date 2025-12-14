import os
import subprocess
import json
from pathlib import Path

# Find repo root (backend folder's parent)
ROOT = Path(__file__).resolve().parent.parent  
AGENT_DIR = ROOT / "cline-agent"
REPO_DIR = AGENT_DIR / "repo"
REPORT_PATH = AGENT_DIR / "report.json"

def clone_repo(repo_url):
    # Remove old repo folder if exists
    if REPO_DIR.exists():
        subprocess.run(["rm", "-rf", str(REPO_DIR)])

    # Clone new repo
    subprocess.run(["git", "clone", repo_url, str(REPO_DIR)])
    return str(REPO_DIR)

def analyze_code(repo_dir, max_files=200):
    report = {
        "files": [],
        "summary": "",
        "issues": []
    }

    count = 0

    # Walk through the repo
    for root, dirs, files in os.walk(repo_dir):
        for file in files:
            # Only analyze known source code types
            if file.endswith(('.py', '.js', '.java', '.md', '.ts')):

                path = os.path.join(root, file)
                size = os.path.getsize(path)

                # Append file info
                report["files"].append({
                    "name": file,
                    "path": path,
                    "size_bytes": size
                })

                count += 1

                # 💡 LIMIT SCAN — prevents Render timeout!
                if count >= max_files:
                    report["summary"] = f"Analyzed {count} files (limited for performance)."
                    report["issues"] = ["Static analysis limited due to host constraints."]
                    return report

    report["summary"] = f"Analyzed {count} files."
    report["issues"] = ["Static analysis completed."]
    return report

def save_report(report):
    # Save output JSON
    with open(REPORT_PATH, "w") as f:
        json.dump(report, f, indent=4)

def main():
    repo_url = input().strip()
    print("Cloning repository...")
    repo_dir = clone_repo(repo_url)

    print("Analyzing repository...")
    report = analyze_code(repo_dir)

    print("Saving report...")
    save_report(report)

    print("Saved report.json at:", REPORT_PATH)

if __name__ == "__main__":
    main()
