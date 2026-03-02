# v0.X.0 - Personal Integrations Epic

**Status:** Planning  
**Priority:** HIGH (productivity multiplier)  
**Goal:** Connect OpenClaw to all personal services for unified control

---

## Why This Matters

**Current state:** Fragmented tools, manual context-switching  
**Desired state:** OpenClaw as central hub for all personal data/actions

**Benefits:**
- ✅ Single interface for everything
- ✅ Cross-service automation (e.g., "calendar event → create task → notify")
- ✅ Proactive assistance ("meeting in 30min, here's prep")
- ✅ Unified memory/context

---

## Integration Tracks

### 🟢 Track 1: Google (Calendar + Contacts)

**Status:** 🔴 BLOCKED (gog keychain issue)

**Services:**
- Google Calendar (read events, create reminders, schedule)
- Google Contacts (lookup, search, quick access)

**Tech:**
- Tool: `gog` CLI (OAuth flow)
- Issue: macOS Keychain not accepting password
- Workaround needed: File-based token storage or alternative tool

**Next steps:**
1. Debug gog keychain issue OR
2. Try alternative: gcalcli, google-api-python-client
3. Test read/write operations
4. Integrate into heartbeat ("upcoming events check")

---

### 🟡 Track 2: Apple (Calendar, Reminders, Contacts, Notes)

**Status:** Partial (some tools exist)

**Services:**
- ✅ Apple Notes (`memo` CLI) - already working!
- ✅ Apple Reminders (`remindctl` CLI) - already working!
- ⚠️ Apple Calendar (AppleScript or EventKit)
- ⚠️ Apple Contacts (AppleScript or AddressBook framework)

**Tech:**
- Notes/Reminders: Native skills exist
- Calendar: Need to build (osascript or Swift tool)
- Contacts: Need to build (osascript or Swift tool)

**Next steps:**
1. Test existing apple-notes + apple-reminders skills
2. Build Calendar integration (read/create events)
3. Build Contacts integration (lookup/search)
4. Decide: Sync Google ↔ Apple or use both separately?

---

### 🔴 Track 3: Jira

**Status:** Not started

**Services:**
- Jira tickets (IEEE work, personal projects)
- Create, update, comment, search
- Time tracking (worklog)

**Tech:**
- Jira REST API
- Auth: API token (already have for IEEE?)
- Consider: jira-cli tool or direct curl

**Use cases:**
- "Log 3 hours to AUTP-287"
- "What's my current sprint?"
- "Create ticket: [description]"
- Auto-log time from timelog.md

**Next steps:**
1. Confirm Jira instance URL + API token
2. Test basic API calls (get issue, create worklog)
3. Build skill or integration
4. Connect to IEEE timelog workflow

---

### 🔴 Track 4: Microsoft Teams / Outlook Calendar

**Status:** Not started

**Services:**
- Teams Calendar (meetings, availability)
- Teams Chat (optional - read/send messages?)
- Outlook Email (if needed)

**Tech:**
- Microsoft Graph API
- Auth: OAuth (app registration needed)
- Complex setup (similar to Google)

**Use cases:**
- "What meetings today?" (Teams calendar)
- "Am I free at 2pm?"
- "Join my next meeting" (open Teams link)

**Challenges:**
- OAuth setup (Azure AD app registration)
- Might conflict with Google Calendar (duplicate events?)

**Next steps:**
1. Decide: Is this needed if Google Calendar works?
2. If yes: Create Azure AD app, get credentials
3. Test Graph API (calendar.read scope)
4. Build integration

---

### 🟡 Track 5: Proton (Mail, Calendar, Drive, Pass)

**Status:** Research needed

**Services:**
- Proton Mail (encrypted email)
- Proton Calendar (encrypted calendar)
- Proton Drive (encrypted storage)
- Proton Pass (password manager - you use this!)

**Tech:**
- Proton Bridge (local IMAP/SMTP for Mail)
- No official API (privacy-first, limited integrations)
- Proton Pass: CLI exists? (check)

**Use cases:**
- Read Proton Mail via Bridge + himalaya skill
- Access Proton Pass credentials (if CLI exists)
- Sync Proton Calendar? (no API, might be manual)

**Challenges:**
- Limited API access (by design - privacy)
- Proton Bridge required for Mail (already installed?)
- Calendar/Drive might be read-only or manual

**Next steps:**
1. Check if Proton Bridge installed (`brew list | grep proton`)
2. Test himalaya with Proton Mail
3. Research Proton Pass CLI
4. Accept limitations (might not get full integration)

---

## Priority Order (Recommendation)

### Phase 1: Quick Wins (this week)
1. ✅ **Apple Reminders** - already works, use for monthly IEEE reminder!
2. ✅ **Apple Notes** - already works, can store personal notes
3. 🔧 **Fix Google Calendar** - debug gog OR use alternative tool

### Phase 2: Core Productivity (next 2 weeks)
4. **Jira integration** - critical for IEEE timelog automation
5. **Apple Calendar** - build if Google Calendar fails
6. **Apple Contacts** - nice-to-have for quick lookups

### Phase 3: Advanced (future)
7. **Proton Mail** (via Bridge + himalaya)
8. **Microsoft Teams** (only if needed for work)
9. **Proton Pass CLI** (if exists)

### Phase 4: Development Tools (via MCP)
10. **Figma MCP** - track design changes, auto-timelog
11. **GitHub integration** - test `gh` skill, explore MCP
12. **Storybook** - research access methods (MCP or GitHub)

---

### 🔴 Track 6: Figma (via MCP)

**Status:** Research needed

**Services:**
- Figma files (read, inspect, comment)
- Design specs (export data, component info)
- Version history
- Comments/collaboration

**Tech:**
- **MCP (Model Context Protocol)** - Figma MCP server exists!
- Auth: Figma Personal Access Token
- mcporter skill (already installed!)

**Use cases:**
- "Show me recent changes in IEEE Biography file"
- "Export components from Storybook design"
- "What's the latest comment on [file]?"
- Auto-track design updates (for timelog!)

**Next steps:**
1. Check if Figma MCP server available (`mcporter list`)
2. Get Figma Personal Access Token
3. Configure MCP server via mcporter
4. Test: Read file, get version history
5. Integrate with IEEE timelog workflow

---

### 🔴 Track 7: Storybook (via MCP)

**Status:** Research needed

**Services:**
- Component library (Wiley Storybook)
- Component docs/stories
- Visual regression tests?
- Build status

**Tech:**
- **MCP server** - might need custom build
- Alternative: Direct file access (if local Storybook)
- GitHub integration (Storybook often in repo)

**Use cases:**
- "What components are in Storybook?"
- "Show me Button component docs"
- "Has Storybook build passed?"

**Challenges:**
- No official Storybook MCP server (might need custom)
- Might be easier via GitHub + file access

**Next steps:**
1. Check if Wiley Storybook has API
2. Research Storybook MCP servers
3. Consider: Just use GitHub integration instead
4. Test access methods

---

### 🟡 Track 8: GitHub (CLI + maybe MCP)

**Status:** Partial (gh skill exists!)

**Services:**
- Repositories (Wiley Storybook, personal projects)
- Issues, PRs, CI runs
- Code search, diffs
- Commits, branches

**Tech:**
- ✅ `gh` CLI (skill already exists!)
- ⚠️ MCP: GitHub MCP server might exist
- Auth: GitHub token (likely already configured?)

**Use cases:**
- "Show me open PRs on wiley/storybook"
- "What's the latest commit?"
- "CI status for my last push"
- "Create issue: [description]"
- Search code across repos

**Next steps:**
1. Test existing `gh` skill
2. Check GitHub MCP server (via mcporter)
3. Compare: CLI vs MCP (which is better?)
4. Integrate with project workflows

---

## Integration Decision Tree

**For Calendar:**
- Google Calendar works? → Use Google (already cloud-synced)
- Google fails? → Use Apple Calendar (local, always works)
- Both? → Sync them (complex, avoid if possible)

**For Contacts:**
- Need mobile sync? → Google Contacts
- Mac-only OK? → Apple Contacts
- Both? → Pick one as source of truth

**For Email:**
- Personal/encrypted → Proton Mail (via Bridge)
- Work/IEEE → Google Gmail (via gog)
- Quick access → himalaya CLI for both

**For Reminders:**
- Simple tasks → Apple Reminders (iCloud sync, works on phone)
- Project management → Jira
- Quick notes → Apple Notes

---

## Success Metrics

**When this epic is done:**
- ✅ "What's on my calendar?" works (Google OR Apple)
- ✅ "Remind me to X" works (Apple Reminders)
- ✅ "Log time to Jira" works (IEEE workflow)
- ✅ Can access contacts by name
- ✅ Can read email via CLI
- ✅ Monthly reminders automated
- ✅ "Show me Figma changes" works (MCP)
- ✅ GitHub PR/issue access works (gh or MCP)
- ✅ Storybook component lookup works

---

## Notes

- **Don't over-integrate!** Pick ONE source of truth per data type
- **Privacy matters:** Proton limited by design (feature, not bug)
- **Google Calendar keychain issue:** Needs debugging or workaround
- **Apple ecosystem:** Works well, but Mac-only (no web access)
- **MCP for dev tools:** Figma/GitHub MCP servers might exist - check mcporter!
- **Storybook access:** Might be easier via GitHub than custom MCP

---

## MCP Server Research

**mcporter skill installed!** Can discover/configure MCP servers.

**Potential MCP servers to explore:**
- `@modelcontextprotocol/server-github` - GitHub integration
- Figma MCP (search registry)
- Storybook MCP (might not exist - build custom?)

**Commands:**
```bash
mcporter list              # Available MCP servers
mcporter servers           # Configured servers
mcporter config            # Edit MCP config
mcporter call <server> <tool> <args>  # Test MCP tool
```

---

*Created: 2026-01-30*  
*Updated: 2026-01-30 (added Figma, Storybook, GitHub)*  
*Next review: After Phase 1 complete*
