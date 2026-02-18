#!/bin/bash
# Dual-Layer Structure Check - Project status files must exist at root

test -f README.md && \
test -f ROADMAP.md && \
test -f CHANGELOG.md && \
test -f POLICY.md && \
test -f HEALTH.md && \
echo '✅ Project status files exist' || echo '❌ Missing project files'
