# Contract Diagram - Wrapper Separation

**Decision Date:** 2026-02-24  
**Status:** Architectural Decision Record (ADR)

---

## Context

Contract diagram v1.1.1 published with localhost wrapper (`serve.sh` + `server.js`).

**Problem discovered:**
- Wrapper uses `file://` protocol to load `.md` files
- Works: Local Mac (localhost)
- Breaks: Remote access via Tailscale (iPad can't access Mac filesystem)

**User decision:**
> "The wrapper is incomplete if it can't load or edit files if you're on a different network só let's take a step back separate rapper from contract diagram reverse contract diagram just typora for now and then later on when we have a wrapper that can load edit markdown from any network then we can update so we works in different machines. For now, diagram is only local. Focus on process less on how it's presented. Save all the wrapper for a future state tho. We'll need it."

---

## Decision

**Separate concerns:**

1. **Core skill = Typora-based** (local only, works today)
   - Contract diagrams live in `.md` files (mermaid blocks)
   - Edit with Typora (native markdown editor)
   - Focus: **Process** (Design → Approval → Development → Publish)
   - No wrapper dependency

2. **Wrapper = Future enhancement** (v2.0.0+ when network-agnostic)
   - Current wrapper saved for reference (localhost only)
   - Future wrapper must support: local + remote (Tailscale, any network)
   - Solution options:
     - Embed MD content in URL (base64/data URI)
     - Serve files via Tailscale (not just HTTP proxy)
     - Full server with API (read/write markdown over network)
   - Deprioritized until core workflow stabilizes

---

## Rationale

**Why separate now:**
- Wrapper blocks remote use → limits utility
- Core process (diagram-as-contract) works fine without wrapper
- Typora is stable, familiar, always available (local)
- Wrapper adds presentation polish, not core value

**Why save wrapper for later:**
- Hot-reload is nice (but not essential)
- Visual phase tracking is useful (but Typora works)
- Network-agnostic wrapper = real value-add (worth doing right)
- Current implementation teaches us what we need (file access, sync, state)

---

## Impact

**Immediate (v1.1.1):**
- ✅ Contract diagram skill remains published (Typora-based)
- ✅ Localhost wrapper still works (Mac local only)
- ❌ Remote access doesn't work (known limitation, documented)

**Short-term (v1.2.0 - v1.11.0):**
- Focus on other skills (roadmap, i-ching, notify, etc.)
- Wrapper code preserved in skill directory (reference only)
- SKILL.md documents "localhost only" limitation

**Long-term (v2.0.0+):**
- Epic created: "Contract Diagram Wrapper v2 - Network-Agnostic"
- Requirements:
  - Load/edit markdown from any network (local, Tailscale, internet)
  - Preserve hot-reload (2s interval)
  - Preserve phase detection (badge auto-update)
  - Support iPad/iPhone (remote devices)
- Research needed:
  - Tailscale file sharing (if exists)
  - Markdown-over-HTTP protocol (read/write API)
  - Alternative: embed MD content in URL (data URI, base64)

---

## Next Steps

1. ✅ Document decision (this file)
2. ✅ Update ROADMAP.md (add v2.0.0 epic placeholder)
3. ✅ Update SKILL.md (clarify localhost limitation in "Known Issues")
4. ✅ Update reminder (🤖 prefix + summary)
5. ⏸️ Preserve wrapper code (don't delete, mark as "v1 - localhost only")
6. ⏸️ Continue with other epics (roadmap skill, i-ching, etc.)

---

## References

- **Current wrapper:** `~/Documents/skills/contract-diagram/serve.sh`, `server.js`, `index.html`
- **Known issue:** SKILL.md § "Remote Access (HTTPS via Tailscale)"
- **Roadmap:** v1.2.0 "Contract Diagram Updates" (advanced features, postponed)
- **Related:** Backstage protocol (epic management), skills ROADMAP
