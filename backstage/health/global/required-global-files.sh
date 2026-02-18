#!/bin/bash
# Global Files Validation - Global backstage files must exist

test -f backstage/global/POLICY.md && \
test -f backstage/global/HEALTH.md && \
echo '✅ Global backstage files exist' || echo '❌ Missing global files'
