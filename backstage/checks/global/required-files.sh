#!/bin/bash
# File Structure Validation - Required backstage files must exist

test -f README.md && \
test -f backstage/ROADMAP.md && \
test -f backstage/CHANGELOG.md && \
test -d backstage/policies && \
test -d backstage/checks && \
test -d backstage/global && \
echo '✅ Required backstage files exist' || echo '❌ Missing required files'
