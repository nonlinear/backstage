#!/bin/bash
# ---
# title: "Pre-Merge Tasks Runner"
# type: deterministic
# description: "Runs required checks before merging to main"
# ---

# Pre-Merge Check - Ensure all tasks complete in ROADMAP

grep "^- \[ \]" ROADMAP.md && echo "❌ Incomplete tasks" || echo "✅ All tasks done"
