---
name: unsupervised
description: "Protocol for autonomous work sessions. Prevents scope creep, ensures permission boundaries, reports blockers. Triggers: 'trabalha nisso autonomo', 'rodar sozinho', 'fazer sem mim', 'precisa da minha ajuda?', 'unsupervised work on X', 'can you handle Y solo'"
type: public
version: 0.1.0
status: production
author: nonlinear
license: MIT
requires: []
dependencies: []
---

# Unsupervised Skill

**Nickname:** `unsupervised:`

**Objective:** Safe autonomous work protocol. Prevents production violations, scope creep, and trust violations during unsupervised sessions.

---

## 🎯 Protocol (4-Phase Checklist)

### Phase 0: Scope Definition

**BEFORE starting work, create report:**

```markdown
# Unsupervised Work Report: [TASK NAME]

## 0️⃣ Scope Definition

**Objective:** [One sentence - what success looks like]

**In scope:**
- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

**Out of scope (will NOT do):**
- [ ] Don't touch production services
- [ ] Don't delete containers
- [ ] Don't modify [specific files/systems]

**Success criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

**Time estimate:** [X hours/days]
```

**User must approve scope BEFORE proceeding.**

---

### Phase 1: Clarify Ambiguity

**For each in-scope item, check:**

```markdown
## 1️⃣ Ambiguity Check

### Item: [Action name]

**Ambiguous:**
- [ ] WHERE? (which file/folder/system?)
- [ ] WHAT? (which format/method/approach?)
- [ ] WHICH? (multiple options - which one?)

**Questions for user:**
1. [Question 1]
2. [Question 2]

**Status:** ⏸️ BLOCKED (waiting for clarification)
```

**If ANY ambiguity exists → STOP, ask user, wait for answer.**

**Rule:** Zero ambiguity = proceed. Any ambiguity = STOP.

---

### Phase 2: Resource Check

**Verify you have everything needed:**

```markdown
## 2️⃣ Resource Check

### APIs / Credentials
- [ ] API X token exists in .env? (check `grep API_X ~/.env`)
- [ ] Service Y accessible? (test curl/ping)
- [ ] Permission Z granted? (check file permissions)

### Tools / Dependencies
- [ ] Tool A installed? (`which toolA`)
- [ ] Library B available? (`pip list | grep libB`)
- [ ] Script C exists? (`ls ~/path/to/scriptC.sh`)

### Access / Connectivity
- [ ] Can SSH to host? (`ssh user@host 'echo test'`)
- [ ] Can read/write files? (`touch /path/test && rm /path/test`)
- [ ] Network reachable? (`ping -c 1 service.host`)

**Blockers found:**
- [ ] Missing: [resource name] → ASK USER how to obtain
- [ ] Inaccessible: [system name] → REPORT, ask for help

**Status:** 
- ✅ ALL CLEAR (proceed to Phase 3)
- ⏸️ BLOCKED (waiting for resources)
```

**If blocked → REPORT immediately, don't retry blindly.**

---

### Phase 3: Refinement Loop

**Execute → Test → Report → Iterate:**

```markdown
## 3️⃣ Progress Report

### Completed
- [x] Action 1 → Result: [what happened]
- [x] Action 2 → Result: [what happened]

### In Progress
- [ ] Action 3 → Status: [current state]

### Blockers
- [ ] Action 4 → Blocked by: [reason] → Need: [what's missing]

### Next Steps
1. [Next action]
2. [Next action]

**Ready for autonomous work?**
- [ ] All actions clear (no ambiguity)
- [ ] All resources available (no blockers)
- [ ] All risks mitigated (no production impact)

**Status:** 
- ✅ READY (waiting for user approval)
- ⏸️ NOT READY (still refining)
```

**Repeat this section until all ✅.**

**When ready → ASK USER: "Can I proceed autonomously?"**

---

### Phase 4: Autonomous Execution

**User approves → Work solo, report periodically:**

```markdown
## 4️⃣ Autonomous Execution

### Session Started
- Time: [timestamp]
- Objective: [recap from Phase 0]

### Progress Updates (every 30min or major milestone)
- [HH:MM] Action X completed → Result: Y
- [HH:MM] Encountered issue Z → Workaround: W
- [HH:MM] Reached blocker B → STOPPING, reporting

### Final Report
**Status:** 
- ✅ OBJECTIVE ACHIEVED
  - [Success criterion 1] ✅
  - [Success criterion 2] ✅
  - [Summary of what was done]

- ❌ OBJECTIVE NOT ACHIEVED
  - **Blocker:** [What stopped progress]
  - **Attempted:** [What was tried]
  - **Need:** [What's required to continue]
  - **Recommendation:** [Manual intervention / different approach]

**Files modified:**
- [path/to/file1.md] (commit: abc123)
- [path/to/file2.sh] (commit: def456)

**Time spent:** [X hours]
```

**If objective achieved → Report success.**
**If blocked → Report blocker, STOP, don't retry blindly.**

---

## 🚨 Hard Boundaries (NEVER Cross)

**Even with user approval, NEVER:**

1. **Production services**
   - Stop/restart/remove containers
   - Change ports/config on Tailscale-accessible services
   - Modify critical infrastructure without explicit permission PER ACTION

2. **Destructive actions**
   - Delete files without git commit first
   - Drop databases
   - Remove credentials from .env

3. **External communication**
   - Send emails/messages on user's behalf
   - Post to social media
   - Commit/push to GitHub (commit local OK, push needs permission)

4. **Ambiguous scope**
   - If you discover work is bigger than approved scope → STOP, report, ask to expand scope

**When in doubt → STOP, report, ask.**

---

## 📋 Checklist Summary

**Before starting:**
- [ ] Phase 0: Scope defined, user approved
- [ ] Phase 1: All ambiguity clarified
- [ ] Phase 2: All resources verified
- [ ] Phase 3: Ready report reviewed, user approved autonomous work

**During work:**
- [ ] Progress updates (30min or milestones)
- [ ] Stop if blocker found
- [ ] Stay within approved scope

**After work:**
- [ ] Final report (success or blocker)
- [ ] Files committed (git log)
- [ ] Time tracked

---

## 🎓 Example: LLM Download Task

**User:** "trabalha nisso autonomo - download Qwen 7B"

**Phase 0: Scope**
```markdown
# Unsupervised Work Report: LLM Download

## 0️⃣ Scope Definition

**Objective:** Download Qwen2.5-7B-Instruct-Q4_K_M.gguf to ~/llama.cpp/models/

**In scope:**
- [ ] Find download URL (HuggingFace)
- [ ] Download .gguf file (~4.4GB)
- [ ] Verify checksum (if available)
- [ ] Test load with llama-server

**Out of scope:**
- [ ] Don't start llama-server automatically (may consume RAM)
- [ ] Don't modify OpenClaw config
- [ ] Don't download 32B/72B models yet

**Success criteria:**
- [ ] File exists: ~/llama.cpp/models/qwen2.5-7b-instruct-q4_k_m.gguf
- [ ] Size ~4.4GB
- [ ] llama-server can load it (test, then kill)

**Time estimate:** 30-60min (download speed dependent)
```

**User approves → proceed.**

**Phase 1: Ambiguity**
```markdown
## 1️⃣ Ambiguity Check

### Download URL
- WHERE? HuggingFace (https://huggingface.co/Qwen/...)
- WHICH file? Q4_K_M quantization (best speed/quality)

**Questions:** NONE (all clear)

**Status:** ✅ NO AMBIGUITY
```

**Phase 2: Resources**
```markdown
## 2️⃣ Resource Check

- [x] wget installed? (`which wget` → /opt/homebrew/bin/wget)
- [x] Disk space? (`df -h ~` → 200GB free, sufficient)
- [x] Internet? (`ping -c 1 huggingface.co` → OK)

**Status:** ✅ ALL CLEAR
```

**Phase 3: Ready**
```markdown
## 3️⃣ Progress Report

**Ready for autonomous work?**
- [x] All actions clear
- [x] All resources available
- [x] No production impact

**Status:** ✅ READY

**Asking user:** "Can I proceed autonomously?"
```

**User:** "pode"

**Phase 4: Execution**
```markdown
## 4️⃣ Autonomous Execution

### Session Started
- Time: 16:20 EST
- Objective: Download Qwen 7B model

### Progress
- 16:21 Found URL: huggingface.co/.../qwen2.5-7b-instruct-q4_k_m.gguf
- 16:22 Download started (4.4GB)
- 16:35 Download complete (4.4GB in 13min)
- 16:36 Tested llama-server load → SUCCESS
- 16:36 Killed llama-server (RAM released)

### Final Report
**Status:** ✅ OBJECTIVE ACHIEVED
- [x] File downloaded (4.4GB)
- [x] llama-server can load it
- [x] No production impact

**Files created:**
- ~/llama.cpp/models/qwen2.5-7b-instruct-q4_k_m.gguf

**Time spent:** 16 minutes
```

---

## 🏴 Philosophy

**Unsupervised ≠ Unmonitored**

- Report frequently (trust through transparency)
- Stop when blocked (honesty > fake progress)
- Respect boundaries (production > convenience)

**Trust = earned through discipline, not claimed through autonomy.**

---

## 📁 File Locations

- Skill: `~/Documents/skills/unsupervised/SKILL.md`
- Symlink: `~/.openclaw/workspace/skills/unsupervised` → skill
- Example reports: `~/Documents/skills/unsupervised/examples/`

---

**Version:** 0.1.0  
**Created:** 2026-02-25  
**Lesson origin:** Kavita container deletion incident (trust violation from unsupervised production changes)
