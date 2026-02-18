#!/bin/bash
# Dual-Layer Structure Check - Global framework files must exist

test -d global && \
test -f global/POLICY.md && \
test -f global/HEALTH.md && \
echo '✅ Global framework files exist' || echo '❌ Missing global framework'
