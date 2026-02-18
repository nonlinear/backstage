#!/bin/bash
# Link Integrity Check - Navigation links must point to existing files

test -f backstage/CHANGELOG.md && \
test -f backstage/ROADMAP.md && \
test -f backstage/POLICY.md && \
test -f backstage/HEALTH.md && \
echo '✅ README links valid' || echo '❌ Broken links in README'
