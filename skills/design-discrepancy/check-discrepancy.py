#!/usr/bin/env python3
"""
Design Discrepancy Skill - Executable Implementation

Follows workflow diagram from SKILL.md:
- Node 1-2: Detect/load exercise
- Node 3-4: Setup environment
- Node 5-6: Component inventory
- Node 7: Spacing checks (Kin automation)
- Node 8: Document to Excel

See SKILL.md for complete workflow specification.
"""

import os
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime

# Node 2️⃣: Detect if exercise exists
def detect_exercise(exercise_name: str, exercises_dir: Path) -> Path | None:
    """
    Check if exercise MD file exists.
    
    Args:
        exercise_name: Name of exercise (e.g., "RPM")
        exercises_dir: Directory containing exercise files
        
    Returns:
        Path to exercise MD if found, None otherwise
    """
    # Try common patterns
    patterns = [
        f"{exercise_name}.md",
        f"{exercise_name}_design_discrepancy.md",
        f"{exercise_name.lower()}.md"
    ]
    
    for pattern in patterns:
        exercise_path = exercises_dir / pattern
        if exercise_path.exists():
            return exercise_path
    
    return None


# Node 4: Create new exercise MD from template
def create_exercise(exercise_name: str, template_path: Path, output_path: Path):
    """
    Create new exercise MD from template.
    
    Args:
        exercise_name: Name of exercise
        template_path: Path to exercise-template.md
        output_path: Where to save new exercise
    """
    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_path}")
    
    # Read template
    template = template_path.read_text()
    
    # Replace placeholders
    content = template.replace("[Project]", exercise_name)
    content = content.replace("[YYYY-MM-DD]", datetime.now().strftime("%Y-%m-%d"))
    content = content.replace("[Names]", "Nicholas, Kin")
    content = content.replace("[IN PROGRESS / COMPLETE]", "IN PROGRESS")
    
    # Write new exercise
    output_path.write_text(content)
    print(f"✅ Created: {output_path}")


# Node 1️⃣: Load exercise MD (opens in Typora)
def load_exercise(exercise_path: Path):
    """
    Open exercise MD in Typora for parity.
    
    Args:
        exercise_path: Path to exercise MD file
    """
    # TODO: Open in Typora via osascript
    # For now, just print path
    print(f"📄 Exercise: {exercise_path}")
    print(f"   (TODO: Open in Typora)")


# Node 3️⃣: Ask critical info
def ask_critical_info() -> dict:
    """
    Ask for critical info from user.
    
    Returns:
        Dict with: figma_link, system_url, credentials, excel_path
    """
    info = {}
    
    # These would be interactive prompts
    # For now, return placeholders
    info["figma_link"] = "[Figma URL]"
    info["system_url"] = "[System URL]"
    info["credentials"] = "[Access method]"
    info["excel_path"] = "[Excel file path]"
    
    return info


# Node 4️⃣: Check access (Figma API, Jira API, Chrome Relay)
def check_access(figma_token: str = None, jira_token: str = None) -> dict:
    """
    Verify access to required services.
    
    Args:
        figma_token: Figma API token (from .env)
        jira_token: Jira API token (from .env)
        
    Returns:
        Dict with access status for each service
    """
    status = {}
    
    # Check Figma API
    if figma_token:
        # TODO: Test Figma API call
        status["figma"] = "✅ Connected"
    else:
        status["figma"] = "❌ No token"
    
    # Check Jira API
    if jira_token:
        # TODO: Test Jira API call
        status["jira"] = "✅ Connected"
    else:
        status["jira"] = "❌ No token"
    
    # Check Chrome Relay
    # TODO: Check if badge is ON
    status["chrome_relay"] = "⏳ Check manually"
    
    return status


# Node 5️⃣: Component inventory
def component_inventory(page_url: str, relay_snapshot: dict) -> list:
    """
    Find all components on a page.
    
    Args:
        page_url: URL of page to inspect
        relay_snapshot: Chrome Relay snapshot data
        
    Returns:
        List of components found (organized by macro/meso/micro)
    """
    # TODO: Parse relay snapshot
    # For now, return empty
    components = {
        "macro": [],
        "meso": [],
        "micro": []
    }
    
    return components


# Node 6️⃣: Document matching
def document_matching(found_components: list, figma_components: list) -> dict:
    """
    Match found components against Figma documentation.
    
    Args:
        found_components: Components detected in system
        figma_components: Components from Figma specs
        
    Returns:
        Dict with matched components + checkboxes
    """
    # TODO: Implement matching logic
    matched = {
        "documented": [],
        "undocumented": [],
        "progress": "0 of 0 completed"
    }
    
    return matched


# Node 7️⃣: Discrepancy checks (SPACING ONLY - Kin automation)
def check_spacing(component_name: str, element_selector: str, figma_specs: dict, relay_compute: callable) -> list:
    """
    Check spacing discrepancies (padding, margin, borders).
    
    This is Kin's automation scope. Nicholas does Color/Typography/States manually.
    
    Args:
        component_name: Name of component being checked
        element_selector: CSS selector for element
        figma_specs: Expected values from Figma
        relay_compute: Function to get computed styles via Chrome Relay
        
    Returns:
        List of discrepancies found
    """
    discrepancies = []
    
    # Get computed styles from system
    # TODO: Call Chrome Relay to run window.getComputedStyle(element)
    computed = {}  # relay_compute(element_selector)
    
    # Compare padding
    for prop in ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"]:
        expected = figma_specs.get(prop)
        found = computed.get(prop)
        
        if expected and found and expected != found:
            discrepancies.append({
                "component": component_name,
                "check_type": f"Spacing ({prop})",
                "found": found,
                "expected": expected,
                "property": prop
            })
    
    # Compare margin
    for prop in ["marginLeft", "marginRight", "marginTop", "marginBottom"]:
        expected = figma_specs.get(prop)
        found = computed.get(prop)
        
        if expected and found and expected != found:
            discrepancies.append({
                "component": component_name,
                "check_type": f"Spacing ({prop})",
                "found": found,
                "expected": expected,
                "property": prop
            })
    
    # Compare borders
    for prop in ["borderTop", "borderBottom", "borderLeft", "borderRight"]:
        expected = figma_specs.get(prop)
        found = computed.get(prop)
        
        if expected and found and expected != found:
            discrepancies.append({
                "component": component_name,
                "check_type": f"Spacing ({prop})",
                "found": found,
                "expected": expected,
                "property": prop
            })
    
    return discrepancies


# Node 8️⃣: Document discrepancies to Excel
def document_to_excel(discrepancies: list, excel_path: Path, component_name: str, page_name: str):
    """
    Add discrepancy rows to Excel file.
    
    Follows Excel format from SKILL.md:
    - 10 columns total
    - Hyperlinks styled blue + underline
    - Auto row height based on Description
    - Copy styles from existing rows
    
    Args:
        discrepancies: List of discrepancy dicts
        excel_path: Path to Excel file
        component_name: Name of component
        page_name: Name of page where found
    """
    # TODO: Implement openpyxl logic
    # For now, just print
    print(f"\n📊 Would add {len(discrepancies)} rows to {excel_path}")
    
    for disc in discrepancies:
        print(f"   - {component_name} - {disc['check_type']} - {page_name}")
        print(f"     Found: {disc['found']}, Expected: {disc['expected']}")


def main():
    parser = argparse.ArgumentParser(
        description="Design Discrepancy Skill - Check spacing discrepancies between Figma and live system"
    )
    parser.add_argument("exercise", help="Exercise name (e.g., 'RPM')")
    parser.add_argument("--exercises-dir", default="~/Documents/life/wiley", help="Directory containing exercises")
    parser.add_argument("--create", action="store_true", help="Create new exercise if not found")
    
    args = parser.parse_args()
    
    exercises_dir = Path(args.exercises_dir).expanduser()
    
    # Node 2️⃣: Detect if exercise exists
    exercise_path = detect_exercise(args.exercise, exercises_dir)
    
    if not exercise_path:
        if args.create:
            # Node 4: Create new exercise
            template_path = Path(__file__).parent / "exercise-template.md"
            exercise_path = exercises_dir / f"{args.exercise}_design_discrepancy.md"
            create_exercise(args.exercise, template_path, exercise_path)
        else:
            print(f"❌ Exercise not found: {args.exercise}")
            print(f"   Use --create to create new exercise")
            sys.exit(1)
    
    # Node 1️⃣: Load exercise MD
    load_exercise(exercise_path)
    
    # Node 3️⃣: Ask critical info
    # (Would be interactive)
    info = ask_critical_info()
    
    # Node 4️⃣: Check access
    # TODO: Load tokens from .env
    access_status = check_access()
    print(f"\n🔌 Access Status:")
    for service, status in access_status.items():
        print(f"   {service}: {status}")
    
    print(f"\n✅ Exercise loaded: {exercise_path.name}")
    print(f"   Next: Component inventory + spacing checks")
    print(f"   (Full automation pending - see SKILL.md for workflow)")


if __name__ == "__main__":
    main()
