import sys
import random
import subprocess
import os
from datetime import datetime

COMMIT_MESSAGES = [
    "Fix: minor bug in core logic",
    "Docs: update README and changelog",
    "Chore: update dependencies",
    "Feat: add new feature for performance monitoring",
    "Refactor: clean up git helper logic",
    "Style: fix indentation and code formatting",
    "Perf: optimize auto-commit task execution",
    "Test: add unit tests for git operations",
    "Build: update build script configuration",
    "CI: update deployment workflow"
]

def run_git_command(command, repo_path):
    try:
        result = subprocess.run(
            command,
            cwd=repo_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr
    except Exception as e:
        return False, str(e)

def perform_auto_commit(repo_path):
    if not os.path.exists(repo_path):
        return False, f"Path does not exist: {repo_path}"

    if not os.path.isdir(os.path.join(repo_path, ".git")):
        return False, f"Not a git repository: {repo_path}"

    # Create/Update a file to ensure there's a change
    log_file = os.path.join(repo_path, "github_contribution_log.txt")
    with open(log_file, "a") as f:
        f.write(f"Contribution on {datetime.now().isoformat()}\n")

    # Git Add
    success, msg = run_git_command(["git", "add", "."], repo_path)
    if not success:
        return False, f"Git Add Error: {msg}"

    # Git Commit
    commit_msg = random.choice(COMMIT_MESSAGES)
    success, msg = run_git_command(["git", "commit", "-m", commit_msg], repo_path)
    if not success:
        return False, f"Git Commit Error: {msg}"

    # Detect branch
    branch_success, branch_name = run_git_command(["git", "branch", "--show-current"], repo_path)
    branch = branch_name.strip() if branch_success else "main"
    
    # Git Push
    success, msg = run_git_command(["git", "push", "origin", branch], repo_path)
    if not success:
        return False, f"Git Push Error: {msg}"

    return True, f"Successfully committed and pushed to '{branch}' with message: '{commit_msg}'"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: repo_path required", file=sys.stderr)
        sys.exit(1)
    
    path = sys.argv[1]
    success, result = perform_auto_commit(path)
    if success:
        print(result)
        sys.exit(0)
    else:
        print(result, file=sys.stderr)
        sys.exit(1)
