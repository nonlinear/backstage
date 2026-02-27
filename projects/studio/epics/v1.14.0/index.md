# v1.14.0 - Automate ClawHub Publication

**Status:** 📋 Planned  
**Created:** 2026-02-25 (expanded from ROADMAP stub)  
**Priority:** Medium

---

## Problem

**Publishing skills to ClawHub is manual:**
1. Open https://clawhub.ai/dashboard
2. Click publish button
3. Wait for build
4. Verify in browser

**No automation, no CI/CD, no programmatic checks.**

**Pain points:**
- Can't automate from CLI (backstage workflows need manual browser step)
- Can't verify publish status in checks (did it actually work?)
- Can't bulk publish multiple skills
- Can't integrate with git hooks or CI pipelines
- Dual-repo strategy unclear (commit locally vs push to GitHub)

---

## Goal

**Automate ClawHub publishing via CLI/API + clarify dual-repo workflow.**

**User workflows enabled:**
1. **CLI publish:** `openclaw skill publish` or `clawhub publish` (from skill folder)
2. **CLI check status:** `openclaw skill status <skill-name>`
3. **Backstage integration:** Auto-publish on merge-to-main (if opted in)
4. **Batch operations:** `openclaw skill publish-all` (publish all changed skills)
5. **Dual-repo clarity:** Commit locally (all skills) ≠ push to GitHub (published only)

---

## Tasks (from ROADMAP + expansion)

### Phase 1: Test Existing CLI
- [ ] **Test `openclaw skill` commands:** Verify install/uninstall/list work correctly
  - Test: `openclaw skill install nonlinear/contract-diagram`
  - Test: `openclaw skill list` (shows installed skills)
  - Test: `openclaw skill uninstall nonlinear/contract-diagram`
  - Validate: Skills actually work after installation
  - Document: Any gotchas or edge cases

### Phase 2: Dual-Repo Strategy
- [ ] **Dual-repo strategy:** Commit locally (all skills), push selectively (published only)
  - Research: pre-push hook vs dual-branch (main/public) vs separate repo
  - Design: "commit locally ≠ push to GitHub" workflow
  - Goal: Unpublished skills versioned locally, hidden from GitHub
  - Future-proof: When "open project" decouples epics from projects, this becomes critical
  - Document decision in epic notes

### Phase 3: API Discovery & CLI Tool
- [ ] Research ClawHub publication API/CLI
  - Check docs: https://clawhub.ai/docs (if exists)
  - Inspect network: DevTools during publish flow
  - Identify endpoints: publish, status, list
  - Auth mechanism: API token, OAuth, session?
  - Document findings in epic notes

- [ ] Create `publish-skill.sh` or integrate into `openclaw skill publish`
  - Inputs: skill name (or auto-detect from CWD)
  - Validates: SKILL.md frontmatter (name, version, status)
  - Publishes: trigger ClawHub publish API
  - Outputs: success/failure, build logs (if available)

### Phase 4: ROADMAP Integration
- [ ] Integrate with ROADMAP workflow (epic complete → publish prompt)
  - When skill epic completes: prompt "Publish to ClawHub?"
  - If yes: run `openclaw skill publish <skill-name>`
  - Update: ROADMAP status (mark published, version, date)

### Phase 5: Git Tracking
- [ ] Auto-update git tracking (add to public branch/repo when published)
  - Option A: Tag published commits (`git tag published/v1.0.0`)
  - Option B: Dual-branch (main = all, public = published only)
  - Option C: Separate repo (skills-public mirrors published subset)
  - Document chosen approach

### Phase 6: README Automation
- [ ] Update README.md automatically (add published skill section)
  - Auto-generate table: skill name, version, install command, ClawHub link
  - Keep README fresh (no manual updates when publishing)

---

## Research Questions

- [ ] Does ClawHub have an API? (check docs, reverse engineer, or ask)
- [ ] Auth method? (API token, OAuth, session cookie?)
- [ ] Publish endpoint? (POST /api/skills/:id/publish or similar?)
- [ ] Status endpoint? (GET /api/skills/:id/status)
- [ ] Build logs accessible? (can we stream build output?)
- [ ] Rate limits? (how many publishes per hour?)
- [ ] Dual-repo: Which strategy scales best? (pre-push hook, dual-branch, separate repo?)

---

## API Design (Hypothetical)

**If ClawHub doesn't have API, may need to:**
- Reverse engineer web UI (network tab, form submissions)
- Use headless browser (Playwright/Puppeteer) as workaround
- Request official API from ClawHub team

**Ideal CLI:**
```bash
# Auth (if needed)
openclaw skill login
# Store token in ~/.openclaw/clawhub-token

# Publish
openclaw skill publish
# Auto-detect skill from CWD, trigger publish

# Status
openclaw skill status nonlinear/backstage
# Output: "Published v1.0.4 (2 hours ago) - Build: SUCCESS"

# List (published)
openclaw skill list --published
# Output: table of my skills (name, version, status, last update)

# Publish all changed
openclaw skill publish-all
# Detect changed skills since last publish, batch publish
```

---

## Dual-Repo Strategies (Research)

### Option A: Pre-Push Hook
**How:**
- Git hook blocks push of unpublished skills
- Whitelist: published skills can push
- Blacklist: drafts/testing stay local

**Pros:** Simple, works with existing repo  
**Cons:** Complex hook logic, can be bypassed

### Option B: Dual-Branch (main/public)
**How:**
- `main` = all skills (local work)
- `public` = published only (GitHub)
- Cherry-pick or merge published skills to `public`

**Pros:** Clean separation, GitHub shows only published  
**Cons:** Manual cherry-picking, branch management overhead

### Option C: Separate Repo (skills-public)
**How:**
- `skills/` = local work (all skills)
- `skills-public/` = mirror (published subset)
- Script syncs published skills to public repo

**Pros:** Total separation, no accidental leaks  
**Cons:** Dual-repo maintenance, sync script complexity

**Recommendation:** TBD after research

---

## Success Criteria

- ✅ Can publish skill from CLI without browser
- ✅ Can check publish status programmatically
- ✅ Backstage integration works (auto-publish on merge, optional)
- ✅ Dual-repo strategy documented + implemented
- ✅ README auto-updates when skill published
- ✅ Error handling (auth failures, build errors, network issues)
- ✅ Documentation (how to use CLI, how to opt in to workflows)

---

## References

- ClawHub: https://clawhub.ai/
- Dashboard: https://clawhub.ai/dashboard
- Skill publish warning check: `~/Documents/backstage/backstage/checks/global/skill-publish-warning.sh`
- ROADMAP: `~/Documents/skills/backstage/ROADMAP.md` (v1.14.0)
