#!/bin/bash
# Dual-Layer Structure Check - Global framework folders must exist

test -d backstage/global && \
test -d backstage/checks/global && \
echo '✅ Global framework files exist' || echo '❌ Missing global framework'
