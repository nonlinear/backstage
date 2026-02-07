#!/usr/bin/env python3
"""
Backstage System Updater

Fetches latest backstage system files from GitHub repo and updates global/ folder.

Usage:
    python3 backstage/global/backstage-update.py [--yes]

Options:
    --yes    Skip confirmation prompts (auto-confirm)

Or use the /backstage-update prompt for guided workflow.
"""

import sys
import urllib.request
import json
from pathlib import Path

# GitHub repo details
REPO_OWNER = "nonlinear"
REPO_NAME = "backstage"
BRANCH = "main"

# Files to update
GLOBAL_FILES = [
    "backstage/global/POLICY.md",
    "backstage/global/HEALTH.md",
    "backstage/global/backstage-update.py",
]

PROMPT_FILES = [
    ".github/prompts/backstage-start.prompt.md",
    ".github/prompts/backstage-close.prompt.md",
    ".github/prompts/backstage-update.prompt.md",
]

TEMPLATE_FILES = [
    "templates/ROADMAP-template.md",
    "templates/CHANGELOG-template.md",
    "templates/POLICY-template.md",
    "templates/HEALTH-template.md",
]

def fetch_file(repo_owner, repo_name, branch, file_path):
    """Fetch a single file from GitHub."""
    url = f"https://raw.githubusercontent.com/{repo_owner}/{repo_name}/{branch}/{file_path}"
    print(f"  Fetching: {file_path}")

    try:
        with urllib.request.urlopen(url) as response:
            content = response.read().decode('utf-8')
            return content
    except Exception as e:
        print(f"  ❌ Failed: {e}")
        return None

def detect_mode():
    """Detect if this is initial scaffolding or framework update."""
    roadmap = Path("backstage/ROADMAP.md")
    if roadmap.exists():
        return "update"
    else:
        return "scaffold"

def scaffold_project():
    """Initial setup: Create project files from templates."""
    print("\n🏗️  SCAFFOLDING MODE: Creating project structure")
    print("=" * 50)

    # Create backstage/ directory
    backstage_dir = Path("backstage")
    backstage_dir.mkdir(exist_ok=True)

    # Create project files from templates inside backstage/
    files_to_create = {
        "backstage/ROADMAP.md": "templates/ROADMAP-template.md",
        "backstage/CHANGELOG.md": "templates/CHANGELOG-template.md",
        "backstage/POLICY.md": "templates/POLICY-template.md",
        "backstage/HEALTH.md": "templates/HEALTH-template.md",
    }

    for dest, template_path in files_to_create.items():
        print(f"\n📝 Creating {dest}...")
        content = fetch_file(REPO_OWNER, REPO_NAME, BRANCH, template_path)
        if content:
            Path(dest).write_text(content)
            print(f"  ✅ Created")
        else:
            print(f"  ❌ Failed to fetch template")

    # Create .github/prompts/ directory and copy prompts
    print(f"\n📁 Creating .github/prompts/...")
    prompts_dir = Path(".github/prompts")
    prompts_dir.mkdir(parents=True, exist_ok=True)

    for prompt_file in PROMPT_FILES:
        print(f"\n📝 Copying {prompt_file}...")
        content = fetch_file(REPO_OWNER, REPO_NAME, BRANCH, prompt_file)
        if content:
            dest = Path(prompt_file)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(content)
            print(f"  ✅ Created")

    print("\n✅ Scaffolding complete!")
    print("\nNext steps:")
    print("1. Customize backstage/ROADMAP.md with your project's epics")
    print("2. Update backstage/POLICY.md with project-specific rules")
    print("3. Add project-specific health checks to backstage/HEALTH.md")
    print("4. Run /backstage-start to validate setup")

def update_framework():
    """Update mode: Fetch and overwrite framework files."""
    print("\n🔄 UPDATE MODE: Refreshing framework files")
    print("=" * 50)

    all_files = GLOBAL_FILES + PROMPT_FILES + TEMPLATE_FILES

    updated = []
    failed = []

    for file_path in all_files:
        print(f"\n📥 Updating {file_path}...")
        content = fetch_file(REPO_OWNER, REPO_NAME, BRANCH, file_path)

        if content:
            dest = Path(file_path)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(content)
            print(f"  ✅ Updated")
            updated.append(file_path)
        else:
            print(f"  ❌ Failed")
            failed.append(file_path)

    print("\n" + "=" * 50)
    print(f"✅ Updated: {len(updated)} files")
    if failed:
        print(f"❌ Failed: {len(failed)} files")
        for f in failed:
            print(f"  - {f}")

    print("\n📋 Project files preserved:")
    print("  - backstage/ROADMAP.md (your epics)")
    print("  - backstage/CHANGELOG.md (your history)")
    print("  - backstage/POLICY.md (your rules)")
    print("  - backstage/HEALTH.md (your checks)")

    print("\nNext step: Run /backstage-start to validate changes")

def main():
    """Main entry point."""

    # Check for --yes flag
    auto_confirm = '--yes' in sys.argv or '-y' in sys.argv

    print("🎯 Backstage Update")
    print(f"📍 Fetching from: {REPO_OWNER}/{REPO_NAME}@{BRANCH}")
    print()

    # Detect mode
    mode = detect_mode()

    if mode == "scaffold":
        print("🔍 No backstage/ROADMAP.md found - running in SCAFFOLD mode")
        if not auto_confirm:
            response = input("\nCreate new project structure? (yes/no): ")
            if response.lower() not in ['yes', 'y']:
                print("Cancelled.")
                return 0
        else:
            print("\n🤖 Auto-confirming (--yes flag)")
        scaffold_project()
    else:
        print("🔍 backstage/ROADMAP.md exists - running in UPDATE mode")
        if not auto_confirm:
            response = input(f"\nUpdate framework files from {BRANCH}? (yes/no): ")
            if response.lower() not in ['yes', 'y']:
                print("Cancelled.")
                return 0
        else:
            print(f"\n🤖 Auto-confirming update from {BRANCH}")
        update_framework()

    return 0

if __name__ == '__main__':
    sys.exit(main())
