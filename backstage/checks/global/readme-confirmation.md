#!/bin/bash
# ---
# DESCRIPTION: Prevent AI from editing README without explicit user confirmation
# TYPE: interpretive
# SCOPE: global
# ---

# This is a POLICY check (interpretive) - AI must read and enforce.
# NO automated validation. AI judgment required.

cat << 'EOF'

❌ README EDIT POLICY (AI ENFORCEMENT REQUIRED)

NEVER edit README.md without EXPLICIT user confirmation.

Before any README change:
1. ASK: "Want me to edit README? Here's what I'll change: [show diff preview]"
2. WAIT for YES/NO
3. Only edit if YES

README is public-facing. Changes must be deliberate, not automatic.

This applies to:
- Content changes
- Link updates
- Structure modifications
- Any text alterations

Exception: Navigation block updates (automated by navigation-syntax.sh)

AI MUST enforce this policy during every session.

EOF

exit 0
