# v3.5.0 - Product Flow (Public Launch)

**Goal:** Make Backstage installable by anyone + launch campaign.

---

## 🎯 Product Flow

**Vision:** From "Nicholas's personal system" → "AI-native project management for everyone"

**Stages:**
1. **Installation Package** - `npm install -g backstage` (one command setup)
2. **Init Wizard** - `backstage init` (project scaffolding)
3. **Documentation** - Clear guides, examples
4. **Launch Campaign** - nonlinear.nyc article + community outreach

---

## 📋 Tasks

### Phase 1: Packaging & Installation

- [ ] npm package structure
  - CLI entry point (`backstage` command)
  - Global install support
  - Version management
  - Dependencies bundled

- [ ] `backstage init` wizard
  - Ask: Project name, tier, type
  - Create `~/backstage/projects/PROJECT/` structure
  - Generate `project.yml`
  - Create first epic (v0.1.0)
  - Initialize git repo
  - Run first health check

- [ ] Default checks included
  - Global checks (arch-workflow.md, versioning.md, etc.)
  - Template project checks
  - Customizable via `project.yml`

- [ ] CLI commands
  - `backstage init` - Create new project
  - `backstage status` - Show project health
  - `backstage epic create` - Create new epic
  - `backstage check` - Run checks
  - `backstage serve` - Start GUI (port 3004)

- [ ] Config system
  - `~/.backstage/config.json` (global settings)
  - Projects path (default: `~/backstage/projects/`)
  - GUI port, theme, preferences
  - MCP integration toggles

### Phase 2: Project Templates

- [ ] Default templates
  - **Software project** (features, bugs, releases)
  - **Research project** (papers, experiments, findings)
  - **Creative project** (ideas, drafts, published)
  - **Personal project** (goals, habits, reflections)

- [ ] Template selection in init wizard
  - Ask: What type of project?
  - Pre-populate epic structure
  - Include relevant checks
  - Example epics (markdown only, user deletes)

- [ ] Custom template support
  - User creates `~/.backstage/templates/NAME/`
  - Init wizard shows user templates
  - Clone template to new project

### Phase 3: Documentation

- [ ] **README overhaul**
  - What is Backstage (AI-native project management)
  - Why (anti-drift, polycentric, composable)
  - How (install, init, use)
  - Philosophy (checks > tools, git-native, read-only GUI)

- [ ] **Quick Start guide**
  - 5min tutorial (install → create project → add epic → run checks)
  - Screenshots (GUI, CLI output)
  - Common workflows

- [ ] **Concepts guide**
  - Projects, epics, tasks
  - Checks (deterministic vs interpretive)
  - Checkpoints (triggered validation)
  - Tiers (0-3 priority levels)
  - Polycentric governance (global + local)

- [ ] **Check authoring guide**
  - How to write custom checks
  - Deterministic (.sh) vs interpretive (.md)
  - Examples (pre-commit, pre-merge, semantic versioning)
  - Testing checks

- [ ] **Advanced topics**
  - Multi-project workflows
  - Night shift (autonomous agents)
  - Retro → policy → checks loop
  - Custom templates

- [ ] **Video walkthrough** (optional)
  - 10min screencast
  - Install → init → create epic → run checks → GUI tour

### Phase 4: Launch Campaign

- [ ] **nonlinear.nyc article**
  - Title: "Backstage: AI-Native Project Management"
  - Sections:
    - **Why:** Drift problem (AI forgets context, breaks trust)
    - **What:** Checks enforce policies, GUI visualizes, git-native
    - **How:** Install, init, use (step-by-step)
    - **Philosophy:** Polycentric, anti-tool-sprawl, composable
  - Screenshots (GUI, check output, epic view)
  - Link to GitHub repo
  - Philosophical tie-in (commons, autonomy, trust)

- [ ] **GitHub README polish**
  - Hero image (GUI screenshot, mermaid diagram)
  - Clear value proposition ("Anti-drift for AI development")
  - Installation instructions
  - Feature highlights (checks, GUI, git-native)
  - Demo GIF (init → epic → check)

- [ ] **Social media launch**
  - Bluesky thread (backstage philosophy)
  - Mastodon post
  - Link to article

- [ ] **Community outreach**
  - Post in AI/LLM communities (reddit, Discord)
  - Share in project management forums
  - DM to AI tool builders (potential early adopters)
  - Hacker News "Show HN" post (if traction)

- [ ] **Analytics setup**
  - Track npm downloads
  - Track GitHub stars/forks/issues
  - Track article views
  - User feedback collection (GitHub Discussions)

- [ ] **Example projects**
  - Public repo: "backstage-examples"
  - Show real-world usage (software, research, creative)
  - Demonstrate check patterns
  - Community contributions welcome

---

## 📚 Research

### Installation Patterns

**Reference:** How other CLI tools install
- `git` → OS package manager + homebrew
- `npm` → self-hosting (npm install -g)
- `vercel` → npm + auto-update

**Backstage approach:**
- npm for JS ecosystem (AI devs use npm)
- Homebrew for Mac users (future)
- One-command install (low friction)

### Init Wizard UX

**Good examples:**
- `create-next-app` (interactive, clear options)
- `git init` (simple, idempotent)
- `npm init` (guided prompts)

**Backstage wizard:**
- 3-5 questions max
- Sensible defaults
- Skip-able (advanced users)
- Idempotent (can re-run)

### GUI Hosting

**Decision:** Local-only vs cloud-hosted

**Option A: Local-only (current)**
- ✅ Privacy (no data leaves machine)
- ✅ No hosting costs
- ✅ Works offline
- ❌ No mobile access (unless Tailscale)

**Option B: Cloud-hosted (future)**
- ✅ Mobile access (any device)
- ✅ Team collaboration
- ❌ Privacy concerns
- ❌ Hosting costs
- ❌ Authentication complexity

**Launch approach:** Start with A (local-only), consider B later (optional cloud sync)

---

## ✅ Done

_(Empty)_

---

## 📝 Notes

**Dependencies:**
- Blocks: v3.6.0 (npm package publish)
- Requires: v3.0.0 complete (cascading dependencies)
- Requires: v2.0.0 complete (checkpoint system stable)

**Launch timing:**
- After v3.0.0 ships (cascading deps working)
- Before Q2 2026 (early AI tool market)
- Coordinate with Librarian launch (cross-promote)

**Success metrics:**
- 500+ npm downloads (first month)
- 50+ GitHub stars
- 10+ community feedback/issues
- 3+ external contributors
- 1+ article mention (other blogs/sites)

**Philosophy:**
- **Anti-drift:** Systems enforce policies, not people
- **Polycentric:** Local rules win, no central authority
- **Git-native:** Commits = source of truth
- **Read-only GUI:** Visualize, don't mutate
- **Composable:** Projects → epics → tasks (rebuilds from git)

**Differentiation:**
- Not another Jira/Linear (too heavyweight)
- Not another todo app (too simple)
- Not another AI wrapper (too shallow)
- **Backstage = checks + git + AI** (unique position)

**Target audience:**
- AI tool builders (need anti-drift)
- Solo devs (need low-overhead PM)
- Open source maintainers (need policy enforcement)
- Research labs (need structured exploration)

**Risks:**
- Too complex (mitigate: good docs, simple defaults)
- Too niche (mitigate: clear value prop, examples)
- Too early (mitigate: dogfood internally first)

**Post-launch:**
- Collect feedback (GitHub Discussions)
- Iterate on UX (CLI, GUI, docs)
- Build community (Discord? Forum?)
- Expand check library (community contributions)
