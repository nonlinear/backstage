# 🌙 MGMT End Prompt

**Purpose:** Safely pause work, share progress, and preserve context for next session.

**When to use:** End of work session, when tired, or need to context-switch.

**Philosophy:** Protect mental health + maintain momentum.

---

## How It Works

1. **Check stability** → Run HEALTH.md validation
2. **Handle failures** → Add fixes to epic task list (if checks fail)
3. **Push if clean** → Commit + push if all checks pass
4. **Victory lap** → Brief reminder of what you just did
5. **Body check** → Reconnect with physical needs
6. **Close VS Code** → Auto-close after countdown (AI stays silent)

---

## Workflow

### Step 1: Run Checks

```bash
# Run all checks from HEALTH.md
# See MGMT/HEALTH.md for current stability requirements
```

**If all pass:** ✅ Proceed to push
**If any fail:** ⚠️ Add to epic task list, skip push

### Step 2: Handle Check Failures

**If checks fail, add fixes to top of epic task list:**

```markdown
# In MGMT/ROADMAP.md (current epic section)

## v0.4.0

### [🚧](branch-link) Source Granularity | [notes](epic-notes/v0.4.0.md)

**Tasks:**

- [ ] 🔧 **FIX:** Syntax errors in indexer.py (line 42) ← ADDED
- [ ] 🔧 **FIX:** Missing type hints in mcp_server.py ← ADDED
- [ ] Test VS Code extensions
- [ ] Extract page numbers during PDF chunking
      ...
```

**Format for fixes:**

- Prefix: `🔧 **FIX:**`
- Brief description + location
- Added to TOP of task list (high priority)

### Step 3: Push if Clean

**If all checks passed:**

```bash
git add -A
git commit -m "[wrap-up] session checkpoint

- [Brief summary of what was done]
"
git push origin <current-branch>
```

### Step 4: Victory Lap 🏆

**Brief reminder (not verbose - they just did it):**

```
🏆 Victory lap:

1. [main achievement]
2. [main achievement]
3. [main achievement]

📊 Stats: X commits, Y files changed
```

**Keep it short** - they were just there, they know what happened.

---

### Step 5: Body Check

```
⏸️ Quick body check:

❓ Hungry? Thirsty? Tired?
❓ Need to stretch? Exercise? Read?

What does your body **need** right now?
```

---

### Step 6: Close VS Code

**After body check, pause then close automatically:**

```bash
echo "🌙 Closing VS Code in 5 seconds... (Ctrl+C to cancel)" && sleep 5 && osascript -e 'quit app "Visual Studio Code"' && echo "✅ VS Code closed. Good night! 🌙"
```

**🚨 CRITICAL:** Agent must NOT send ANY message after running this command, or VS Code will prompt "unsaved changes". Stay completely silent.

---

## Check Policy

**From HEALTH.md:**

- **Epic branches:** Soft fail (warn but allow)
- **Main branch:** Hard fail (block merge)
- **Wrap-up:** Soft fail (list fixes, don't push)

---

## Examples

### Example 1: All Checks Pass

**Agent runs checks → all pass → pushes → victory lap → body check → closes VS Code**

```
✅ All checks passed

[push happens]

🎯 What you just did:
1. Hidden database files
2. MGMT system generalization
3. Repository cleanup

📊 21 commits

⏸️ Quick body check:
Hungry? Thirsty? Need to stretch?

[countdown runs]
[VS Code closes]
[AGENT STAYS SILENT]
```

### Example 2: Checks Fail

**Agent runs checks:**

```
✅ Syntax validation passed
❌ Import validation failed:
   - engine/scripts/indexer.py:42 → ModuleNotFoundError: llama_index

⚠️ Checks failed. Adding fixes to task list, skipping push.
```

**Agent updates ROADMAP.md:**

```markdown
## v0.4.0

### [🚧](branch-link) Source Granularity | [notes](epic-notes/v0.4.0.md)

**Tasks:**

- [ ] 🔧 **FIX:** Import error in indexer.py (line 42) - missing llama_index
- [ ] Test VS Code extensions
- [ ] Extract page numbers during PDF chunking
```

**User can:**

- Fix now (continue working)
- Fix later (next session picks up from ROADMAP notes)
