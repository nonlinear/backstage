#!/bin/bash
# Version Consistency - CHANGELOG versions must follow semantic versioning

grep -E '^## v[0-9]+\.[0-9]+\.[0-9]+' backstage/CHANGELOG.md >/dev/null && \
echo '✅ Versions follow semver' || echo '⚠️ Check version format'
