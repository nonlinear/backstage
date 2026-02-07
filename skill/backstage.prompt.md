# Backstage - Project Management Protocol

**Version:** v0.3.0  
**Repo:** [github.com/nonlinear/backstage](https://github.com/nonlinear/backstage)

---

## Trigger

User says:
- "backstage start" / "vamos trabalhar no X"
- "backstage health"
- Any variation requesting project context

---

## Flow

### 1. Check if backstage exists

```bash
PROJECT_PATH="${PROJECT_PATH:-.}"

if [ ! -d "$PROJECT_PATH/backstage" ]; then
  # Backstage not installed
  INSTALL_NEEDED=true
else
  INSTALL_NEEDED=false
fi
```

**If not found:**

Ask user: "No backstage/ folder found. Install backstage protocol? (y/n)"

---

### 2. Install Backstage (if needed)

**Source:** `github.com/nonlinear/backstage` branch `main`

**Files to copy:**

1. **Templates → Project root:**
   - `templates/ROADMAP-template.md` → `backstage/ROADMAP.md`
   - `templates/CHANGELOG-template.md` → `backstage/CHANGELOG.md`
   - `templates/POLICY-template.md` → `backstage/POLICY.md`
   - `templates/HEALTH-template.md` → `backstage/HEALTH.md`

2. **Global rules:**
   - `global/POLICY.md` → `backstage/global/POLICY.md`
   - `global/HEALTH.md` → `backstage/global/HEALTH.md`

**Commands:**

```bash
mkdir -p backstage/global

# Fetch templates (remove -template suffix)
for file in ROADMAP CHANGELOG POLICY HEALTH; do
  curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/templates/${file}-template.md" \
    -o "backstage/${file}.md"
done

# Fetch global files
for file in POLICY.md HEALTH.md; do
  curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/global/${file}" \
    -o "backstage/global/${file}"
done
```

**Result:** "✅ Backstage installed! Next: Edit backstage/ROADMAP.md to plan your project"

---

### 3. Check for updates (if backstage exists)

**Version detection:**

```bash
# Local version (from navigation block in README)
LOCAL_VERSION=$(grep "backstage rules" backstage/README.md | grep -oE 'v[0-9.]+' | head -1)

# Remote version (from GitHub main)
REMOTE_VERSION=$(curl -s "https://raw.githubusercontent.com/nonlinear/backstage/main/README.md" | grep "backstage rules" | grep -oE 'v[0-9.]+' | head -1)
```

**Update check frequency:** Once per day

```bash
TIMESTAMP_FILE="backstage/.last-update-check"
TODAY=$(date +%Y-%m-%d)

if [ -f "$TIMESTAMP_FILE" ]; then
  LAST_CHECK=$(cat "$TIMESTAMP_FILE" | cut -d'|' -f1)
  LAST_ANSWER=$(cat "$TIMESTAMP_FILE" | cut -d'|' -f2)
  
  if [ "$LAST_CHECK" = "$TODAY" ] && [ "$LAST_ANSWER" = "no" ]; then
    # Already asked today, user said no → skip
    SKIP_UPDATE_CHECK=true
  fi
fi
```

**If versions differ AND not skipped:**

Show tease message:

```
🔄 Backstage v0.3.0 available

The protocol learned to automate itself. Health checks run in the background,
epics create themselves with the right version numbers, and you can finally
see the whole workflow as a diagram instead of imagining it.

Oh, and it stops asking you to update every five minutes.

Full story: https://github.com/nonlinear/backstage/blob/main/CHANGELOG.md
Browse the skill: https://github.com/nonlinear/backstage/tree/main/skill
Updated rules: https://github.com/nonlinear/backstage/blob/main/global/POLICY.md

Update? (y/n):
```

**Save answer:**

```bash
echo "${TODAY}|${ANSWER}" > "$TIMESTAMP_FILE"
```

---

### 4. Update Backstage (if user says yes)

**What to update:** `backstage/global/` (always replace, no merge)

```bash
# Backup (optional, for safety)
cp -r backstage/global backstage/global.bak

# Delete and replace
rm -rf backstage/global
mkdir -p backstage/global

# Fetch latest global files
for file in POLICY.md HEALTH.md; do
  curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/global/${file}" \
    -o "backstage/global/${file}"
done
```

**Network error handling:**

```bash
if ! curl -f ...; then
  echo "⚠️  Network error - couldn't check for updates"
  # Continue workflow (don't block)
fi
```

**After update:**

"✅ Backstage updated! Run 'backstage start' to update navigation blocks"

---

### 5. Execute POLICY protocol

**Read both:**
- `backstage/global/POLICY.md`
- `backstage/POLICY.md` (if exists)

**Rule:** Project POLICY wins over global POLICY (polycentric governance)

**What POLICY does:**
- Updates navigation blocks in all core files (README, ROADMAP, CHANGELOG, POLICY, HEALTH)
- Updates version number in navigation template (from branch name or CHANGELOG)
- Creates/updates progress diagram (mermaid)

**For now (placeholder):**

```
ℹ️  POLICY protocol: Project wins over global
```

*(Full POLICY execution logic to be implemented)*

---

### 6. Execute HEALTH protocol

**Read both:**
- `backstage/global/HEALTH.md`
- `backstage/HEALTH.md` (if exists)

**Rule:** Project HEALTH wins over global HEALTH

**What HEALTH does:**

Extract and run bash code blocks from HEALTH.md files:

```bash
# Extract ```bash blocks and execute
while IFS= read -r line; do
  if [[ "$line" =~ ^\`\`\`bash ]]; then
    IN_BLOCK=1
  elif [[ "$line" =~ ^\`\`\` ]] && [ $IN_BLOCK -eq 1 ]; then
    IN_BLOCK=0
    # Run extracted script
    bash /tmp/health-check.sh
  elif [ $IN_BLOCK -eq 1 ]; then
    echo "$line" >> /tmp/health-check.sh
  fi
done < HEALTH.md
```

**Results:**

- ✅ All checks pass → "All health checks passed!"
- ❌ Some checks fail → "Failed checks: [list]"

**If failures:**

```
⚠️  User + AI: Review failures above and fix case-by-case

[List failed checks with context]
```

**Auto-fix attempt:** Try simple fixes (create missing files, etc)

**Recheck:** Run checks again after auto-fix

**If still failing:** Report to user + continue (don't block)

---

### 7. Display "What's next?"

**From global POLICY (defined behavior):**

Show active epics from ROADMAP:

```bash
if [ -f "backstage/ROADMAP.md" ]; then
  echo "📌 What's next?"
  echo ""
  echo "Active epics:"
  
  grep -E '^## v[0-9.]+|^### ' backstage/ROADMAP.md | while read line; do
    # Extract version and title
    echo "  • v${VERSION} - ${TITLE}"
  done
else
  echo "No ROADMAP.md - create your first epic!"
fi
```

**Result:**

```
📌 What's next?

Active epics:
  • v0.1.0 - Environment Setup
  • v0.2.0 - Navigation Logic
  • v0.3.0 - OpenClaw Skill

✅ Session ready! 🚀
```

---

## Error Handling

**Network errors:**
- Warn user: "⚠️ Network error - couldn't check for updates"
- Continue workflow (don't block)

**Missing files:**
- Auto-create if possible (empty templates)
- Otherwise: warn user + continue

**Health check failures:**
- Show which checks failed
- Suggest fixes (case-by-case with user)
- Don't block session start

---

## Commands

**Main workflow:**
```
backstage start [project-path]
```

**Health checks only:**
```
backstage health
```

**Manual install:**
```
backstage install
```

**Force update (skip timestamp check):**
```
backstage update
```

---

## Notes for AI

**This is the prompt equivalent of the OpenClaw skill.**

- Skill uses: `backstage.sh` (bash script)
- Prompt uses: This markdown (AI executes logic)

**Both follow the same flow diagram.**

**When to use:**
- Skill: OpenClaw detected (clawdhub installed)
- Prompt: VSCode or other environments (fallback)

**Goal:** Same behavior, different execution environment.
