# Model Routing Research (Server Migration Epic)

**Epic:** 📌epic-server-migration.md  
**Status:** Planning (wait for server)  
**Goal:** Token optimization via local models (overnight batch processing)

**Source:** Matt Ganzak Token Optimization Guide (Instagram screenshots)

---

## 🔍 Research Findings

### GitHub Copilot Models (Pro+ Plan)

**From GitHub website:**
> "Choose from leading LLMs optimized for speed, accuracy, or cost."

**Implication:** GitHub Copilot Pro+ ($39/month) has multiple models

**Models likely available (need confirmation):**
- Claude Sonnet 4.5 (current, expensive)
- Claude Haiku (fast, cheap - ~1/10th cost)
- GPT-4o (OpenAI)
- o1/o1-mini (OpenAI reasoning models)

**Need to verify:** What models does Nicholas's GitHub Copilot subscription include?

---

## 💡 Token Optimization Strategy (Matt Ganzak)

### Decision Framework (3 Questions)

**Before sending task to model, ask:**

1. **Complex reasoning needed?**
   - Multi-step logic
   - Weighing tradeoffs
   - Nuanced context
   - Incomplete information judgment calls
   
2. **High cost of failure?**
   - Customer-facing content
   - Production code
   - Strategic decisions
   - Legal/compliance outputs
   
3. **Creativity/nuance needed?**
   - Original content (not templated)
   - Edge cases
   - Sensitive tone adaptation

**If YES to ANY → Sonnet (expensive, careful)**  
**If NO to ALL → Haiku (cheap, fast)**

---

### Task Classification

**✅ HAIKU TERRITORY (85% of tasks):**

**Code Operations:**
- Code reviews (linting rules, common issues)
- Refactoring (DRY, extract method, patterns)
- Documentation (existing code structure)
- Unit test generation (from function signatures)
- Boilerplate/CRUD (scaffolding)
- Code formatting (syntax, style)
- Error message parsing (structured data from logs)

**Data Processing:**
- Data transformation (JSON ↔ CSV, format conversions)
- Schema validation (check against known structures)
- Content extraction (pull specific fields)
- Summarization (factual, no interpretation)
- Classification (predefined categories)
- Entity extraction (names, dates, amounts)

**Communication:**
- Template filling
- Status updates
- Log parsing

---

**⚠️ SONNET TERRITORY (15% of tasks):**

**Architecture & Strategy:**
- System architecture decisions (long-term tradeoffs)
- Technology selection (fit for needs)
- API design (usability, performance, extensibility)
- Database schema design (query patterns, growth)
- Security review (think like attacker)

**Critical Bug Investigation:**
- Production incidents (multiple systems)
- Race conditions (timing-dependent)
- Memory leaks (subtle accumulation)
- Security vulnerabilities (exploitable edge cases)

**Customer-Facing Content:**
- Marketing copy (emotional resonance)
- Product descriptions (conversion)
- Support escalations (empathy, de-escalation)

**Strategic:**
- Novel problem-solving
- Complex negotiations
- Proposal writing

---

### 🚨 RED FLAGS (Over-Routing)

**Signs you're wasting money:**
- Using Sonnet for CRUD operations
- Using Sonnet for formatting
- Using Sonnet for simple Q&A
- Using Sonnet "just to be safe"
- No tasks going to Haiku
- Defaulting to expensive without thinking

---

## 🎯 Application to Nicholas's Workflow

### Haiku Candidates (Cheap, Fast)

**Life automation (85% of tasks):**
- Calendar checks (`gog calendar events`)
- Weather updates (`curl wttr.in`)
- Reminder processing (Apple Reminders skill)
- File operations (read, write, list)
- Data transformation (JSON parsing, CSV export)
- Status updates (Jira, GitHub)
- Template filling (emails, notes)
- Log parsing (NAS Docker logs)
- Code formatting (Python, Bash)

### Sonnet Candidates (Expensive, Careful)

**Strategic work (15% of tasks):**
- ROADMAP decisions (epic planning, prioritization)
- Architecture discussions (Pi-hole setup, NAS migration)
- Security reviews (v0.13.0 Security epic)
- Epic notes writing (strategic documentation)
- Complex debugging (production incidents)
- Customer-facing (Wiley content - RPM, Design Discrepancy)

---

## 📋 Next Steps

### 1. Verify Available Models

**Check GitHub Copilot settings:**
- VS Code → Copilot settings → Available models
- Or: GitHub.com → Settings → Copilot → Model selection

**Question:** Does Nicholas have access to Haiku via GitHub Copilot?

### 2. Configure Model Routing (OpenClaw)

**If Haiku available:**

Add to `openclaw.json`:
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "github-copilot/claude-sonnet-4.5"
      },
      "models": {
        "github-copilot/claude-sonnet-4.5": {},
        "github-copilot/claude-haiku-4": {}
      }
    }
  }
}
```

### 3. Create Model Routing Skill

**File:** `~/.openclaw/workspace/model-routing.md`

**Content:** Decision framework (3 questions) + task classification

**Integration:** Add to AGENTS.md (reference on session start)

### 4. Session-Level Override

**Use `session_status` tool:**
- Check current model: `/status`
- Override for session: Set `model=github-copilot/claude-haiku-4` (if available)

---

## 🏴 Local Models (Future Plan)

### Nicholas's Vision

> "no futuro eu quero pra modelos LOCAIS. imagina algo com coding capabilities que eh mais demordo, voce podec usar a noite enquanto executa o que combinamos em design architecture."

**Translation:** Use local models at night for slow coding tasks (while Nicholas sleeps)

**Use case:** Long-running code generation, refactoring, architecture implementation

### Local Model Options (Future)

**Ollama (most popular):**
- Models: Llama 3.3, CodeLlama, DeepSeek Coder
- Runs on Mac (M3 with 36GB RAM = good enough)
- Free, no API costs
- Slower than cloud (but overnight = doesn't matter)

**LM Studio:**
- GUI for local models
- Supports same models as Ollama
- Good for testing/experimentation

**MLX (Apple Silicon native):**
- Optimized for M-series chips
- Faster inference on Mac
- Smaller ecosystem (experimental)

### Workflow Pattern (Night Jobs)

**Day (Nicholas working):**
- Use cloud models (Sonnet/Haiku) for fast responses
- Interactive, real-time feedback
- Expensive but necessary

**Night (Nicholas sleeping):**
- Use local models for batch work
- Code generation, refactoring, docs
- Slow but free
- Results ready in morning

**Implementation:**
- Cron job (evening): Switch to local model
- Cron job (morning): Switch back to cloud
- Sub-agent for night jobs (isolated session)
- Results delivered to Telegram in morning

---

## 💰 Cost Analysis (Hypothetical)

### Current (All Sonnet)

**Assumptions:**
- 100 tasks/day
- All using Claude Sonnet 4.5
- $0.015/1K input tokens, $0.075/1K output tokens
- Average task: 2K input, 500 output tokens

**Daily cost:** 100 × (2K × $0.015/1K + 500 × $0.075/1K) = $6.75/day = **$200/month**

### Optimized (85% Haiku, 15% Sonnet)

**Assumptions:**
- 85 tasks/day on Haiku ($0.0008/1K input, $0.004/1K output)
- 15 tasks/day on Sonnet (same as above)

**Daily cost:**
- Haiku: 85 × (2K × $0.0008/1K + 500 × $0.004/1K) = $0.31/day
- Sonnet: 15 × (2K × $0.015/1K + 500 × $0.075/1K) = $1.01/day
- **Total: $1.32/day = $40/month**

**Savings: $160/month (80% reduction)**

**Matt's claim: 97% reduction = $1,500 → $50/month**  
**Reality for Nicholas: ~80% reduction = $200 → $40/month**

(Difference: Matt's users probably use WAY more tokens)

---

## 🔮 Future Architecture (Hybrid Cloud + Local)

### Day Mode (Cloud Models)

**Fast tasks (Haiku):**
- Calendar, weather, reminders
- File ops, data transformation
- Status updates, template filling

**Strategic tasks (Sonnet):**
- ROADMAP, epic planning
- Architecture decisions
- Security reviews

### Night Mode (Local Models)

**Batch tasks (Ollama/LM Studio):**
- Code generation (entire features)
- Refactoring (large codebases)
- Documentation generation (full projects)
- Test suite generation

**Cron-triggered:**
- 10pm: Switch to local model
- Run queued tasks (sub-agent)
- 6am: Switch back to cloud
- Deliver results to Telegram

---

## 📚 References

- Matt Ganzak Token Optimization Guide (Instagram screenshots)
- GitHub Copilot pricing: https://github.com/features/copilot/plans
- OpenClaw model config: `/opt/homebrew/lib/node_modules/openclaw/docs/`
- Ollama: https://ollama.ai
- LM Studio: https://lmstudio.ai

---

**Next:** Verify GitHub Copilot model access, create `model-routing.md`, test with real tasks.
