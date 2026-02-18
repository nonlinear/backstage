#!/bin/bash
# Knowledge Base Check - List existing gaps for AI awareness

ls -lt gaps/ 2>/dev/null | head -10 || echo "No gaps/ directory yet"
