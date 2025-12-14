import os
import subprocess
import json
from pathlib import Path

def clone_repo(repo_url, clone_dir="cline-agent/repo"):
    # Ensure repo folder exists inside cline-agent
    if os.path.exists(clone_dir):
        subprocess.run(["rm", "-rf", clone_dir])

    subprocess.run(["git", "clone", repo_url, clone_dir])
    return clone_dir

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
    report["issues"] = [
        "Static analysis not yet implemented.",
        "AI-driven improvements to be added in next versions."
    ]

    return report

def save_report(report, output_file="cline-agent/report.json"):
    with open(output_file, "w") as f:
        json.dump(report, f, indent=4)

def main():
    repo_url = input().strip()
    print("Cloning repository...")
    repo_dir = clone_repo(repo_url)

    print("Analyzing repository...")
    report = analyze_code(repo_dir)

    print("Saving output JSON...")
    save_report(report)

    print("Done!")

if __name__ == "__main__":
    main()
