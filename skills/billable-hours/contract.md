# Billable Hours - Automated Billing Workflow Contract

**Status:** ![default](https://img.shields.io/badge/design-yellow) Design phase

**Goal:** Automate billing from Jira issues → Figma history → Tempo timelog.

---

```mermaid
%%{init: {'theme':'base','themeVariables':{"primaryColor":"#4A90E2","primaryTextColor":"#fff","primaryBorderColor":"#2E5C8A","lineColor":"#666","secondaryColor":"#50E3C2","tertiaryColor":"#FFD700","edgeLabelBackground":"#666"},'flowchart':{"nodeSpacing":50,"rankSpacing":50,"padding":15,"curve":"basis"}}}%%
flowchart TD
    JIRA["Phase 1: Jira Issues<br/>Get Done/In Progress"]
    DATES["Extract transition dates<br/>when moved to status"]
    FIGMA["Phase 2: Figma Search<br/>Find files by criteria"]
    HISTORY["Phase 3: Figma History<br/>Get version dates"]
    TABLE["Phase 4: Generate Table<br/>Date | Figma | Hours | Jira"]
    MANUAL["Phase 5: Nicholas adds hours<br/>Manual input"]
    TEMPO["Phase 6: Tempo API<br/>Log worklogs"]
    UPDATE["Phase 7: Update Table<br/>✅ Billed + link"]
    
    JIRA --> DATES
    DATES --> FIGMA
    FIGMA --> HISTORY
    HISTORY --> TABLE
    TABLE --> MANUAL
    MANUAL --> TEMPO
    TEMPO --> UPDATE
    
    classDef default fill:#e0e0e0,stroke:#666,color:#000
    classDef approved fill:#FFF9C4,stroke:#F9A825,color:#000
    classDef developed fill:#D5F5D5,stroke:#388E3C,color:#000
    classDef blocker fill:#FFCDD2,stroke:#D32F2F,color:#000
    classDef notes fill:#E3F2FD,stroke:#1976D2,color:#000
    classDef outside fill:#D5F5D5,stroke:#388E3C,stroke-dasharray:5 5,color:#000
    
    class JIRA,DATES,FIGMA,HISTORY,TABLE approved
    class MANUAL outside
    class TEMPO,UPDATE default
```

---

## 1️⃣ Phase 1: Jira Conditions (Need Nicholas Input)

**Questions:**
1. **Projects:** UXPMS? AUTP? RPM? All?
2. **Statuses:** Done only? Done + In Progress?
3. **Time range:** Last 30 days? Month-to-date? Custom?
4. **Labels/components:** IEEE? REX? All?

**Needed:** Nicholas decision before implementation

---

## 2️⃣ Phase 2: Figma Conditions (Need Nicholas Input)

**Questions:**
1. **Team ID:** Which Figma team?
2. **Projects:** Which Figma projects?
3. **File patterns:** IEEE-*? REX-*? Specific files?
4. **Match Jira how:** Naming convention? Manual mapping?

**Needed:** Nicholas decision before implementation

---

## Phase 3: Figma History (Implementation Detail)

**API:** `/files/{file_key}/versions`

**Extract:** Version dates → work days

**Note:** Figma versions = all changes (may include minor edits, need filtering?)

---

## Phase 4: Generate Table (Format Approved)

**Output:**

| Date       | Figma File                | Activity           | Hours | Jira Issue | Status |
|------------|---------------------------|--------------------|-------|------------|--------|
| 2026-02-10 | IEEE-Gold-OA              | Version 1.2.3      | ?     | AUTP-646   | ⏳     |

**Markdown format → Nicholas edits hours column**

---

## Phase 5: Manual Hours (Nicholas Input)

**Outside system boundary** (dashed border in diagram)

**Workflow:**
1. Script generates table with `?`
2. Nicholas replaces `?` with actual hours
3. Script reads updated table

**Format validation:** Date, hours (float), issue key

---

## Phase 6: Tempo API (Implementation Detail)

**Endpoint:** `POST /worklogs`

**Payload:**
```json
{
  "issueKey": "AUTP-646",
  "timeSpentSeconds": 7200,
  "startDate": "2026-02-10",
  "startTime": "09:00:00",
  "description": "Figma: IEEE-Gold-OA (Version 1.2.3)"
}
```

**Note:** Need to test dry-run mode first

---

## 3️⃣ Phase 7: Update Table (Link Format?)

**Question:** What link format for Tempo worklog?

**Options:**
- Tempo worklog ID (if available)
- Jira issue link (fallback)
- No link (just ✅)

**Needed:** Nicholas preference

---

## Testing Plan

**Step 1:** Define conditions (1️⃣ 2️⃣ above)

**Step 2:** Test Jira API (get issues + dates)

**Step 3:** Test Figma API (search + history)

**Step 4:** Generate table (dry-run)

**Step 5:** Test Tempo API (1 worklog, delete after)

**Step 6:** Full run (real billing)

**Step 7:** Automate (3AM, 25th, weekday)

---

## Future: Automation

**Cron:** Monthly (25th, weekday, 3AM)

**Notification:** Telegram (table → Nicholas fills → script processes)

---

**Created:** 2026-02-27  
**Next:** Answer 1️⃣ 2️⃣ 3️⃣ to proceed
