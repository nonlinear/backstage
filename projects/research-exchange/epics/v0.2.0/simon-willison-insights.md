# Simon Willison: Coding Agents for Data Analysis

**Source:** https://simonwillison.net/2026/Mar/16/coding-agents-for-data-analysis/  
**Date:** 2026-03-16  
**Workshop:** NICAR 2026 (data journalists)

---

## Key Insights

### 1. Vibe Coding with Live Preview

**Pattern used:**
- Datasette serving static content from `viz/` folder
- Claude Code creates interactive visualizations directly in folder
- Instant preview (file saves → browser refreshes)

**Example:** Leaflet heatmap generated on-the-fly (trees database visualization)

**Relevant to ReX:**
- Same pattern: Vite dev server + hot reload
- Agent edits components → instant visual feedback
- "Vibe coding" = iterative refinement via visual output

---

### 2. Agent Cost: Reasonable

**Workshop metrics:**
- 3-hour session
- Multiple attendees
- Total cost: $23 in API tokens (OpenAI Codex)

**Takeaway:** Even heavy agent use (data exploration, visualization, scraping) = low cost

**Relevant to ReX:**
- Component iteration won't break budget
- Real-time collaboration viable (dev server always-on)

---

### 3. Warmup Before Complex Tasks

**Workshop structure:**
1. Warmup: ChatGPT/Claude (basic Q&A)
2. Setup: Claude Code/Codex (environment)
3. Complex: Data analysis, viz, scraping

**Relevant to ReX:**
- Epic v0.1.0 (mapping) = warmup (2-3 components)
- Epic v0.2.0 (all steps) = complex (full implementation)
- Don't jump straight to "build everything" — validate approach first

---

### 4. Tools Mentioned

**Used in workshop:**
- Python + SQLite + Datasette
- GitHub Codespaces (dev environment)
- OpenAI Codex (agent)
- Leaflet + Leaflet.heat (visualization)

**Equivalent for ReX:**
- React + MUI (instead of Python/SQLite)
- Vite dev server (instead of Datasette)
- OpenClaw/Claude (instead of Codex)
- MUI Charts (instead of Leaflet)

---

### 5. Handout Design

**Dual purpose:**
- In-person workshop guide
- Standalone reference (for async learners)

**Sections:**
1. Coding agents intro
2. Setup
3. Asking questions (database queries)
4. Exploring data
5. Cleaning data
6. Visualizations
7. Scraping

**Relevant to ReX:**
- Epic `index.md` files = handout equivalent
- Should be usable by future agents (or other designers)
- Clear problem → solution → code examples

---

## Parallels to ReX Project

### Similar Pattern: Live Coding + Visual Feedback

**Simon's setup:**
```
Datasette (server) → viz/ (static files) → Agent edits → Browser refreshes
```

**Our setup:**
```
Vite dev server → src/components/ → Agent edits → Hot reload (< 100ms)
```

**Same benefit:** Agent sees visual result immediately, iterates based on output.

---

### Agent as Collaborator, Not Executor

**Workshop approach:**
- Students ask questions ("Show me top 10 neighborhoods by tree count")
- Agent writes code, runs it, shows output
- Students refine query based on results

**ReX approach:**
- Nicholas says "Button too small, increase padding"
- design-engineer edits component
- Nicholas sees change in browser (Tailscale)
- Refines based on visual

**Key:** Tight feedback loop (ask → see → refine → repeat)

---

### Cost Is Not a Barrier

**Workshop:** $23 for 3 hours × multiple people = cheap

**ReX:** Even with daily dev sessions (1-2h), cost = negligible

**Implication:** Don't optimize for token count. Optimize for iteration speed.

---

## Recommendations for ReX

### 1. Setup Vite Dev Server Now (v0.2.0)

```bash
cd ~/Documents/wiley/Research\ Exchange
npm run dev -- --host 0.0.0.0
# Nicholas accesses: http://studio.adal-rigel.ts.net:3000
```

**Why:** Same pattern as Simon's Datasette → instant visual feedback.

---

### 2. Start with Warmup (v0.1.0)

**Don't skip mapping epic:**
- Prototype 2-3 components (Button, TextField, Card)
- Validate MUI approach works
- Establish visual similarity threshold

**Then scale to full implementation (v0.2.0).**

---

### 3. Document Like Handout

**Each epic `index.md` should be:**
- Standalone reference (usable without context)
- Problem → Solution → Code examples
- Future-proof (other agents can read and continue)

**Current state:** Already doing this (v0.1.0, v0.2.0 index.md files exist)

---

### 4. Embrace Vibe Coding

**Don't pre-plan every detail:**
- Start with rough component
- Iterate based on visual output
- Refine until "looks right"

**Example workflow:**
```
1. design-engineer: Creates basic Button component
2. Nicholas: "Too small, increase font size"
3. design-engineer: Edits fontSize: '1rem' → '1.25rem'
4. Hot reload (instant)
5. Nicholas: "Better, but padding needs more space"
6. Repeat until approved
```

**Why it works:** Visual feedback faster than verbal specification.

---

### 5. Playwright for Regression (Not Design)

**Simon used agents for visualization generation, not testing.**

**For ReX:**
- Playwright = regression (prevent breaking existing components)
- NOT for initial design validation (use eyes + Tailscale)

**Tests come AFTER visual approval:**
```typescript
// AFTER Nicholas approves button
test('button maintains approved styling', async ({ mount }) => {
  const btn = await mount(<ReXButton variant="primary">Submit</ReXButton>);
  await expect(btn).toHaveCSS('font-size', '20px'); // Lock in approved value
});
```

---

## Action Items

### Immediate (v0.2.0 prep)

- [ ] Verify Next.js dev server can expose to Tailscale
- [ ] Test hot reload works via Tailscale URL
- [ ] Create simple test component (Button)
- [ ] Nicholas confirms can see + interact

### Epic v0.2.0 (when starting)

- [ ] Setup dev server workflow (documented)
- [ ] Create Docker production preview (for milestones)
- [ ] Start with Step 1 (warmup, like Simon's approach)
- [ ] Iterate based on visual feedback (vibe coding)

---

**Key Takeaway:** Simon's workshop validates our hybrid approach (Vite dev + Docker review). Same pattern, proven to work for real-time agent collaboration.
