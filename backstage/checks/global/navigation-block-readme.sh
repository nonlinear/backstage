#!/bin/bash
# Navigation Block Validation - Every backstage file must have 🤖 markers

# Test: README has navigation block
grep -q '> 🤖' README.md && echo '✅ Navigation block exists' || echo '❌ Missing navigation block'
