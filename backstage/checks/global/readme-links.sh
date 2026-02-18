#!/bin/bash
# Link Integrity Check - Navigation links must point to existing files/folders

test -f backstage/CHANGELOG.md && \
test -f backstage/ROADMAP.md && \
test -d backstage/policies && \
test -d backstage/checks && \
echo '✅ README links valid' || echo '❌ Broken links in README'
