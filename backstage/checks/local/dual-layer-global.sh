#!/bin/bash
# Dual-Layer Structure Check - Global framework folders must exist

test -d global && \
test -d global/policies/global && \
test -d global/checks/global && \
echo '✅ Global framework files exist' || echo '❌ Missing global framework'
