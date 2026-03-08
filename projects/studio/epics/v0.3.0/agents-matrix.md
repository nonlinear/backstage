# Agents Matrix

**Purpose:** Define who does what, supervision model, model assignments

---

## Agent Roles

| Agent | Role | Supervision | Model | Reasoning |
|-------|------|-------------|-------|-----------|
| **Defense** | Code + design iteration | Assisted | Qwen 32B | Nicholas present, fast feedback, medium complexity |
| **Secretaria** | Clerical, scheduling, admin | Assisted | Qwen 7B | Simple tasks, Nicholas supervises, latency critical |
| **Research** | Deep investigation, book search | Unassisted | Qwen 72B | Complex decisions, works alone, needs high reasoning |
| **UXR** | User research, personas, flows | Unassisted | Qwen 72B | Deep work, autonomous, needs context synthesis |
| **Legal** | Contracts, compliance, policy | Unassisted | Qwen 72B | High stakes, works alone, needs precision |
| **Marketing** | Content, brand, messaging | Unassisted | Qwen 72B | Creative work, autonomous |
| **Design** | UI/UX, visual design, Figma | Unassisted | Qwen 72B | Creative work, autonomous |
| **Strategic** | Epic planning, architecture | Cloud | Claude Sonnet 4.5 | >32k context, complex decisions, already paid via Copilot |

---

## Supervision Model

### Assisted (Defense, Secretaria)
- **Nicholas present** during execution
- Can correct, redirect, approve in real-time
- **Latency > reasoning** (faster models, simpler decisions)
- Examples: Quick edits, data entry, scheduling

### Unassisted (Research, UXR, Legal, Marketing, Design)
- **Nicholas NOT present** during execution
- Works autonomously, reports when done
- **Reasoning > latency** (larger models, complex decisions)
- Examples: Night jobs, batch research, document analysis

### Strategic (Epic planning)
- **Cloud model** (Claude Sonnet 4.5)
- High-level decisions, >32k context
- Used for: Epic planning, multi-project coordination, architectural decisions

---

## Context Window Needs

| Agent | Typical Context | Model | Context Limit |
|-------|----------------|-------|---------------|
| Secretaria | Email, calendar, task list | Qwen 7B | 32k |
| Defense | Code file, epic, tests | Qwen 32B | 32k |
| Research | Books, PDFs, long docs | Qwen 72B | 128k |
| UXR | Transcripts, personas, flows | Qwen 72B | 128k |
| Legal | Contracts, policies, precedents | Qwen 72B | 128k |
| Marketing | Brand docs, campaigns | Qwen 72B | 128k |
| Design | Figma specs, design systems | Qwen 72B | 128k |
| Strategic | Multiple epics, roadmaps | Claude Sonnet 4.5 | 200k |

---

## Cost Analysis

**Local (Mac Studio):**
- Qwen 7B: ~4GB VRAM, fast
- Qwen 32B: ~20GB VRAM, medium
- Qwen 72B: ~48GB VRAM, slow but powerful

**Cloud (GitHub Copilot):**
- Claude Sonnet 4.5: Already paid ($10/month)
- Only for Strategic agent (infrequent, high-value)

**Strategy:** Maximize local (control, privacy), use cloud only for Strategic.

---

## Communication Patterns

### Delegation (Nicholas → Agent)
- Nicholas spawns agent with task
- Agent executes autonomously
- Agent reports completion or blocker

### Collaboration (Agent → Agent)
- Research agent finds info → sends to Defense
- UXR agent creates persona → sends to Design
- Legal agent reviews contract → sends to Strategic

### Escalation (Agent → Nicholas)
- Stuck >2min → report blocker
- Ambiguous decision → ask for guidance
- High-stakes action → request permission

---

## Next Steps

1. **Create agent configs** (YAML per agent, define capabilities)
2. **Test local models** (Qwen 7B, 32B, 72B on Mac Studio)
3. **Matrix setup** (communication backbone)
4. **Backstage integration** (surface agents on UI)

---

**Source:** Epic v0.3.0 planning session 2026-03-08
