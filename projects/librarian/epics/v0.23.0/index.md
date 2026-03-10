# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.23.0 - High Auditability

**Goal:** Track sources used, create reports.

---

## Context

**Why audit matters:**

Nicholas requires agents to check library before proposing solutions. Audit trail proves agent consulted sources (or flags when they didn't).

**Use cases:**
1. **Verify agent did research:** "Did Defense check systems books before proposing microservices?"
2. **Track source usage:** "Which books get cited most? Which are ignored?"
3. **Detect bias:** "Does Marketing agent always skip anarchist sources?"
4. **Generate reports:** Weekly summary of library usage (by agent, by topic, by source)

---

## What to Track

**Minimum audit entry:**
```jsonl
{"timestamp": "2026-03-10T12:15:00Z", "requester": "agent:defense", "query": "microservices patterns", "results": [{"title": "Building Microservices", "author": "Newman", "score": 0.92}]}
```

**Enhanced audit entry (with citations):**
```jsonl
{"timestamp": "2026-03-10T12:15:00Z", "requester": "agent:defense", "query": "microservices patterns", "results": [{"title": "Building Microservices", "author": "Newman", "score": 0.92, "cited": true}], "context": "epic:v0.5.0-architecture"}
```

**Why JSONL:**
- Append-only (safe, no corruption)
- Grep-able (search by requester, source, date)
- Analytics-friendly (load into pandas/jq)

---

## Audit Queries (CLI)

**Who used what?**
```bash
librarian audit --requester defense
# Output:
# Building Microservices (Newman) - 3 times
# Domain-Driven Design (Evans) - 1 time
```

**Where was source cited?**
```bash
librarian audit --source "Building Microservices"
# Output:
# 2026-03-10 12:15 - agent:defense (epic:v0.5.0-architecture)
# 2026-03-08 10:30 - user:nicholas (manual query)
```

**Sources seen but not cited?**
```bash
librarian audit --unused
# Output:
# Debt: First 5000 Years - seen 5 times, cited 0 times
# The Chaos Apple - seen 2 times, cited 0 times
```

**Bias detection:**
```bash
librarian audit --bias
# Output:
# agent:marketing - ignores topic "anarchy" (0% citation rate, 15 queries)
# agent:legal - prefers author "Graeber" (80% of citations)
```

---

## Reports

**Weekly summary:**
```
Librarian Usage Report (2026-03-03 → 2026-03-10)

Total queries: 47
By requester:
  - agent:defense: 23 queries
  - user:nicholas: 18 queries
  - agent:marketing: 6 queries

Top sources cited:
  1. Building Microservices (Newman) - 8 times
  2. Debt: First 5000 Years (Graeber) - 5 times
  3. Condensed Chaos (Hine) - 3 times

Most active topics:
  1. systems - 15 queries
  2. anarchy - 12 queries
  3. chaos-magick - 8 queries
```

---

## Tasks

See `epic.yaml` for task list.

---

## Success Criteria

- ✅ Every query logged to `audit.jsonl`
- ✅ CLI tools available (`--requester`, `--source`, `--unused`, `--bias`)
- ✅ Weekly reports generated automatically
- ✅ Nicholas can verify agent consulted sources

---

## Dependencies

**Requires:**
- v0.22.0 (Librarian as MCP) - audit infrastructure

**Blocks:**
- None (optional enhancement)

---

*Created: 2026-03-10*
