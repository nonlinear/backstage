#!/bin/bash
# ---
# title: "Dual-Layer Project Validator"
# type: deterministic
# description: "Validates project-level dual-layer architecture compliance"
# ---

# Dual-Layer Structure Check - Project status files must exist at root

test -f README.md && \
test -f ROADMAP.md && \
test -f CHANGELOG.md && \
test -d policies && \
test -d checks && \
echo '✅ Project status files exist' || echo '❌ Missing project files'
