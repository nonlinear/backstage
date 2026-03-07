# Agent Ideas (Not in AI Agents & Domains)

**Purpose:** Agents proposed in talk1/talk2 that are NOT yet in ai-agents-domains.md

**Last updated:** 2026-03-06

---

## Missing Agent: Process Improvement Specialist

**Role:** Post-publication analysis, continuous improvement

**Alternative names:** 
- Business Operations Analyst
- Process Optimization Agent
- Audit Agent

**Focus:**
- Reviews all published epics (merged to main, in CHANGELOG)
- Analyzes time spent, bottlenecks
- Proposes optimizations
- Suggests tool/API additions
- Identifies redundant processes

**Skills:**
- Pattern recognition
- Cost-benefit analysis
- Tool evaluation
- Process mining

**Library topics (proposed):**
- Process optimization
- Lean methodology
- Systems thinking

**Checks (proposed):**
- bottleneck-detection
- redundancy-analysis
- tool-roi-validation

**APIs (proposed):**
- OpenProject (read ChangeLog, time tracking)
- Git (commit history analysis)
- All domain repositories (analyze patterns)

**Unsupervised LLM:** Qwen 32B-72B (needs reasoning for pattern detection)

**Journal:** Optimization proposals, analysis reports

**Epic Role:** Continuous improvement (post-epic audit)

---

## Why This Agent Is Important

**Problem:** Without ongoing optimization, processes accumulate technical debt
- Tasks take longer than necessary
- Redundant checks pile up
- Tools become outdated
- Bottlenecks go unnoticed

**Solution:** Dedicated agent that:
1. Monitors all completed work
2. Identifies inefficiencies
3. Proposes evidence-based improvements
4. Tracks plateau (when checks stabilize → reduce human approval)

**Trigger for activation:**
- Weekly batch job (analyze past week's epics)
- On-demand when Nicholas suspects inefficiency
- Quarterly deep audit

---

## Integration with Existing System

**Input:** ChangeLog (published epics), git history, time tracking data

**Output:** 
- Weekly optimization report
- Proposed pipeline changes
- Tool/API recommendations
- Check consolidation suggestions

**Approval workflow:**
- Agent generates proposal
- Business Analyst reviews feasibility
- Nicholas approves/rejects
- Orchestrator implements changes

---

## Status

**Current:** Not implemented in ai-agents-domains.md

**Next steps:**
1. Add to ai-agents-domains.md table
2. Define library topics (3 books via Librarian)
3. Create checks (bottleneck-detection, redundancy-analysis)
4. Build repository structure (~/.Documents/agents/process-optimizer/)
5. Integrate with weekly review cycle

---

**This is the ONLY agent from talk sessions not yet in the main architecture.** 🏴
