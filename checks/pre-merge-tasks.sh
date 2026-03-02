#!/bin/bash
# Pre-Merge Check - Ensure all tasks complete in ROADMAP

grep "^- \[ \]" ROADMAP.md && echo "❌ Incomplete tasks" || echo "✅ All tasks done"
