#!/bin/bash
# Global Files Validation - Global backstage folders must exist

test -d backstage/policies/global && \
test -d backstage/checks/global && \
echo '✅ Global backstage files exist' || echo '❌ Missing global files'
