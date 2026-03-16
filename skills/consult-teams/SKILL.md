---
name: consult-teams
description: Consult with external teams/communities - prepare question, consolidate responses, send thank you
triggers:
  - "consult"
  - "ask the team"
  - "ask group"
  - "send to signal"
  - "send to discord"
version: 0.1.0
author: nonlinear
---

# Consult with Teams Skill

**Purpose:** Structured consultation workflow for external teams (Signal, Discord, etc.)

**Triggers:**
- "consult [group] about [topic]"
- "ask the team about [X]"
- "send to signal group: [question]"

---

## Protocol

### Phase 1: Write Concise Question Proposal

**Before sending:**
1. **Compress context** (background in 1-2 sentences)
2. **State question clearly** (what do you need to know?)
3. **Provide specifics** (your use case, constraints, why it matters)
4. **Keep it short** (respect their time, <150 words ideal)

**Template:**
```
Context: [1-2 sentences]

Question: [clear, specific]

Use case: [why this matters, your constraints]

Appreciate your input! 🏴
```

**Examples:**
- ✅ Good: "Context: Running 15 agents on Mac Studio M4. Question: Does Qwen 3.5 MoE improve reasoning+speed vs Qwen 2.5 dense? Use case: Unsupervised night jobs need high reasoning, supervised tasks need low latency."
- ❌ Bad: "Hey what do you think about Qwen 3.5?" (no context, vague, wastes time)

---

### Phase 2: Consolidate Responses

**After receiving replies:**
1. **Extract key insights** (what's useful, what's noise)
2. **Categorize:** Recommendations, warnings, alternatives
3. **Note dissent** (if opinions differ, why?)
4. **Action items** (what to do next based on feedback)

**Format:**
```
## Feedback Summary (Group: [name])

**Recommendations:**
- [person]: [key point]
- [person]: [key point]

**Warnings:**
- [person]: [concern]

**Alternatives:**
- [person]: [suggestion]

**Action items:**
- [ ] [based on feedback]
```

---

### Phase 3: Thank You Message

**After consolidating:**
1. **Acknowledge contributors** (name who helped)
2. **Summarize decision** (what you're doing based on input)
3. **Offer reciprocity** (happy to help them in return)

**Template:**
```
Thanks [names]! 

Based on your input: [decision/action].

[Specific insight appreciated]: "[quote from helpful reply]"

Happy to help if you need anything. 🏴
```

**Examples:**
- ✅ "Thanks Alex, Jordan, Sam! Based on your input: switching to Qwen 3.5 MoE. Alex's point about VRAM savings convinced me. Happy to share results once tested. 🏴"
- ❌ "Thanks!" (no acknowledgment of who helped, no decision shared)

---

## Workflow

**Full cycle:**
```
Nicholas: "consult signal group about Qwen 3.5"
  ↓
Kin: Prepares concise question proposal (shows Nicholas)
  ↓
Nicholas: Approves + sends (or edits first)
  ↓
[Group responds]
  ↓
Kin: Consolidates responses (extracts insights, categorizes)
  ↓
Nicholas: Reviews + makes decision
  ↓
Kin: Sends thank you message (acknowledges contributors, shares decision)
```

---

## Success Criteria

✅ Question proposal < 150 words (concise, respectful)  
✅ Context clear (they understand your situation)  
✅ Responses consolidated (insights extracted, action items clear)  
✅ Thank you sent (contributors acknowledged, decision shared)  

---

## Examples

### Example 1: Qwen 3.5 Consultation (2026-02-26)

**Phase 1 - Question Proposal:**
```
Context: Running 15 agents on Mac Studio M4 Max (64GB). Three modes: supervised (fast iteration), unsupervised (night jobs), secretary (clerical).

Question: Does Qwen 3.5 MoE (35B-A3B, 122B-A10B) improve reasoning+speed vs Qwen 2.5 dense (32B, 72B)?

Use case: Unsupervised needs high reasoning (agent alone, high risk). Supervised needs low latency (I'm present, can correct). MoE looks like free lunch (big reasoning, small compute).

Thoughts? 🏴
```

**Phase 2 - Consolidate Responses:**
```
## Feedback Summary (Group: AI Liberators)

**Recommendations:**
- Alex: "MoE = yes. 122B-A10B beats 72B dense for overnight work."
- Jordan: "Vision support in 3.5 = game changer for Design agents."

**Warnings:**
- Sam: "MoE inference trickier, test before committing."

**Action items:**
- [ ] Download Qwen3.5-122B-A10B (test overnight)
- [ ] Benchmark vs Qwen2.5-72B (same task, compare)
- [ ] Report results back to group
```

**Phase 3 - Thank You:**
```
Thanks Alex, Jordan, Sam!

Based on your input: downloading Qwen3.5-122B-A10B tonight, benchmarking vs 2.5-72B. Alex's point about overnight work + Sam's warning about testing = good balance.

Will share results once tested. Happy to help if you need anything. 🏴
```

---

## Related

- **message tool:** Send to Signal/Discord/etc
- **memory skill:** Track consultations (what was asked, what was learned)
- **backstage:** Epic planning (when to consult vs decide alone)

---

## Future

- [ ] Template library (common question formats)
- [ ] Auto-detect when consultation needed (complex decisions, high stakes)
- [ ] Track consultation quality (was feedback useful? Did it change decision?)
