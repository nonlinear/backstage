#!/bin/bash
# ---
# title: "Gaps List Generator"
# type: deterministic
# description: "Generates list of missing documentation and untracked work"
# ---

# DESCRIPTION: Surfaces known unknowns. Prevents forgotten context drift.
# TYPE: deterministic
# SCOPE: global
# Knowledge Base Check - List existing gaps for AI awareness

ls -lt gaps/ 2>/dev/null | head -10 || echo "No gaps/ directory yet"
