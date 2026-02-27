# v0.25.0 - Local LLM Infrastructure

**Status:** 🚧 IN PROGRESS (2026-02-26)  
**Priority:** HIGH (Token optimization + night jobs)

---

## 🔍 Engine Comparison

### Tier 1: 100% Metal Support

| Engine | Community | Mac Stories | Setup | Add Model | API | Maintenance | Best For |
|--------|-----------|-------------|-------|-----------|-----|-------------|----------|
| **llama.cpp** | 60k ⭐ | [M4 14tok/s](https://reddit.com/r/LocalLLaMA/comments/1p8orwd/) | CMake | Manual .gguf | Server | Git pull | Max perf, proven |
| **MLX** | 16k ⭐ (Apple) | [Flash=llama](https://reddit.com/r/LocalLLaMA/comments/1h01719/) | pip install | Convert | Python | pip upgrade | Apple-backed |
| **llama-cpp-python** | 8k ⭐ | Same as llama.cpp | pip+compile | Manual .gguf | Python | pip upgrade | Python devs |
| **metalchat** | <100 ⭐ | ❌ None | C++23 | Manual | ❌ None | Git pull | Experimental |

**Winner:** **llama.cpp** (ecosystem + server) or **MLX** (Apple-backed + Python)

---

### Tier 2: 70-95% Metal

| Engine | Metal % | Setup | Add Model | API | Best For |
|--------|---------|-------|-----------|-----|----------|
| **Ollama** | 95% | `brew install` | `ollama pull` | REST | Easiest |
| **LM Studio** | 95% | GUI | GUI download | OpenAI | Non-tech |
| **llamafile** | 90% | Download | Download | HTTP | Portable |
| **ssd-llm** | 70% | Cargo | Manual | Rust | Low RAM |
| **vLLM** | 0% | Docker | Manual | OpenAI | NVIDIA only |

---

## 📊 Cloud vs Local

### Reasoning + Latency

| Model | Reasoning | Latency | Cost | Privacy | Context |
|-------|-----------|---------|------|---------|---------|
| **Claude Sonnet 4.5** | 10/10 ⭐⭐⭐⭐⭐ | 2-5 sec | Paid | ❌ Cloud | 200k |
| **Qwen 72B** | 9/10 ⭐⭐⭐⭐⭐ | 0.8-1.5 sec | FREE | ✅ Local | 32k |
| **Qwen-Coder 32B** | 8.5/10 ⭐⭐⭐⭐⭐ | 0.5-1 sec | FREE | ✅ Local | 32k |
| **Qwen-Coder 7B** | 6/10 ⭐⭐⭐⭐ | <0.5 sec | FREE | ✅ Local | 32k |

**Trade-off map:**
```
Reasoning
 10│ Claude ●                    (slow, smartest)
  9│         Qwen72B ●           (3x faster, 90% quality)
  8│                Qwen32B ●    (4x faster, 85% quality) ← SWEET SPOT
  6│                       Qwen7B ● (10x faster, clerical only)
  0└─────────────────────────────→ Latency (0-5 sec)
```

**Sweet Spot: Qwen 32B** = 85% Claude quality, 4x faster, FREE, private

---

## 📦 Model Selection

### Phase 1: ESSENTIAL (~24GB)

| Model | Size | Speed | Use |
|-------|------|-------|-----|
| **Qwen-Coder 32B Q4_K_M** | ~20GB | 18-22 tok/s | Code agents, Defense, Daily |
| **nomic-embed-text-v1.5** | ~274MB | Fast | ALL agents (Librarian) |
| **Qwen-Coder 7B Q4_K_M** | ~4GB | 30-40 tok/s | Secretaria (clerical) |

---

### Phase 2: SCALE (~80GB)

| Model | Size | Speed | Use |
|-------|------|-------|-----|
| **Qwen 72B Instruct Q4_K_M** | ~40GB | 10-15 tok/s | Text agents (unassisted) |
| **Qwen2-VL 72B Q4_K_M** | ~40GB | Slow | Vision agents (Design, Marketing) |

---

### Phase 3: FALLBACK (~40GB)

| Model | Size | Speed | Use |
|-------|------|-------|-----|
| **Llama 3.3 70B Q4_K_M** | ~40GB | 10-15 tok/s | Only if Qwen 72B insufficient |

---

## 🤖 Workflow Matrix

| Workflow | Model | Speed | Quality | When |
|----------|-------|-------|---------|------|
| **AGENTS - Code** | Qwen-Coder 32B | 18-22 tok/s | ⭐⭐⭐⭐⭐ | Development (unassisted) |
| **AGENTS - Text** | Qwen 72B | 10-15 tok/s | ⭐⭐⭐⭐⭐ | UXR, Docs, Legal, Marketing (unassisted) |
| **AGENTS - Vision** | Qwen2-VL 72B | Slow | ⭐⭐⭐⭐⭐ | Design, Marketing visuals (unassisted) |
| **AGENTS - All** | nomic-embed | Fast | ⭐⭐⭐⭐⭐ | Librarian (citations, research) |
| **DEFENSE** | Qwen-Coder 32B | 18-22 tok/s | ⭐⭐⭐⭐⭐ | Present work, argue changes (assisted) |
| **SECRETARIA** | Qwen-Coder 7B | 30-40 tok/s | ⭐⭐⭐⭐ | File ops, queries (assisted, low stakes) |
| **STRATEGIC** | Claude Sonnet | 2-5 sec | ⭐⭐⭐⭐⭐ | Epic planning, complex decisions (cloud) |

---

## 🔄 Hybrid Strategy

**Use both (not either/or):**

**Claude (Cloud):**
- Strategic planning, complex architecture
- Context >32k tokens
- Already paid (GitHub Copilot)

**Local (llama.cpp):**
- Night jobs (agents unassisted)
- Defense (fast iteration)
- Secretaria (instant clerical)
- Privacy-sensitive work

**OpenClaw routing:**
```bash
/model github-copilot/claude-sonnet-4.5  # Strategic
/model http://localhost:8080/v1          # Defense/Daily (32B)
/model http://localhost:8081/v1          # Secretaria (7B)
/model http://localhost:8082/v1          # Night jobs (72B)
```

---

## 🎯 Anti-Drift Protocol Impact

**Epic-based focus = efficiency:**
- ✅ Clear scope (epic = boundary)
- ✅ Focused research (relevant books only)
- ✅ Justified work (epic success criteria)
- ✅ Easier defense ("epic said X, I did X")

**Result:** Less wasted inference, faster defense, lower metabolic cost

---

## 🎯 M4 Max 64GB = Perfect Fit

**Defense scenario:**
- Nicholas: "Why this design?"
- Agent:
  1. Embedding lookup (nomic) → 0.5 sec
  2. Citation retrieval (cached) → 0.2 sec
  3. Reasoning (Qwen 32B) → 2 sec
  - **Total: <3 sec** = conversational

**M4 Max benefits:**
- 64GB RAM = multiple models in-memory
- Metal 100% = max inference speed
- Parallel: Embedding + LLM (no bottleneck)
- **Feels like expert conversation, not computer waiting**

---

## 📂 Storage Location

**Recommended:** `~/Models/` (dedicated, visible)

```
~/Models/
├── qwen/
│   ├── qwen2.5-coder-32b-instruct-q4_k_m.gguf (~20GB)
│   ├── qwen2.5-coder-7b-instruct-q4_k_m.gguf (~4GB)
│   └── qwen2.5-72b-instruct-q4_k_m.gguf (~40GB)
├── nomic/
│   └── nomic-embed-text-v1.5.Q8_0.gguf (~274MB)
└── llama.cpp/  # if using llama.cpp engine
```

---

## 🚀 Progress (2026-02-26)

**Phase 1: Download + Test**
- [x] Install llama.cpp (CMake build with Metal)
- [ ] Download Qwen-Coder 7B Q4_K_M (~4GB)
- [ ] Download Qwen-Coder 32B Q4_K_M (~20GB)
- [⏳] Download Qwen 72B Instruct FP16 (parte 32/42, 53% - **IN PROGRESS NOW**, 101GB baixados)
- [ ] Test inference (benchmark speed/quality)
- [ ] Start llama-server (port 8080)
- [ ] OpenClaw integration test

**Phase 2: Agent Integration**
- [ ] Configure model routing (workflow → model)
- [ ] Test Defense workflow (Nicholas iterating)
- [ ] Test Secretaria (instant clerical)
- [ ] Monitor: speed, accuracy, RAM usage

**Phase 3: Scale**
- [ ] Test unassisted agents (overnight work)
- [ ] Optimize cache/memory
- [ ] Measure: cost savings, quality maintained

**What's left:**
- Baixar Qwen-Coder 7B Q4_K_M (~4GB)
- Baixar Qwen-Coder 32B Q4_K_M (~20GB)
- Terminar 72B FP16 (10 partes, ~42GB restantes)
- Converter 72B FP16 → Q4_K_M (ou baixar Q4_K_M direto se disponível)
- Benchmark all 3 models
- Setup llama-server (múltiplas portas: 8080 = 32B, 8081 = 7B, 8082 = 72B)
- Test OpenClaw integration

---

## 🔗 Related Epics

- **v0.8.0 iPad Workspace** - remote access
- **v0.9.0 Cellular Router** - mobile connectivity
- **Audio Interface** - voice → local processing

---

**Goal:** Hybrid local+cloud = speed + privacy + cost savings + quality when needed. 🏴

---

## 📊 MLX vs GGUF Strategy Insights (2026-02-26)

**Context:** Signal group feedback on model performance

### Signal Group Feedback

**Question asked:**
> "Anyone have Qwen3.5-122B-A10B GGUF (Q4)? Official repos don't exist yet, community forks empty. Need it for unsupervised work (night shift). Also: any ETA on Qwen3.5-27B?"

**Response received:**
> "Yeah you should be able to run both the 35b and 27b models with decent context at q4, I believe. The 122b would be doable at a low bit quantization but might not be worth it, it would be slow."

### Key Insights

**✅ Validated:**
- **35B Q4** = supervised work (Defense) — decent speed + context
- **27B Q4** = secretaria/clerical — fast enough

**⚠️ Concern:**
- **122B** = slow even at low quantization (might not be worth it)

**🤔 MLX Wild Card:**
- Feedback assumes GGUF Q4
- We're testing **MLX mxfp4** (Apple native optimization)
- MLX may perform better than GGUF on M4 Max
- **Unknown:** How much faster is MLX mxfp4 vs GGUF Q4 on 122B?

### Strategic Decision Tree

**Phase 1: Test 122B MLX (downloading now)**
```
Download complete → Benchmark speed → Decide:
├─ Fast enough → Use for unsupervised (night shift)
└─ Too slow → Fall back to 35B MLX
```

**Phase 2: Model Allocation**

**Scenario A (122B acceptable speed):**
- **Unsupervised:** 122B MLX (max reasoning, night shift = slow okay)
- **Supervised:** 35B MLX (Defense, Nicholas iterating)
- **Secretaria:** 27B MLX (instant clerical)

**Scenario B (122B too slow):**
- **Unsupervised:** 35B MLX (compromise reasoning/speed)
- **Supervised:** 35B MLX (shared model)
- **Secretaria:** 27B MLX (lightweight tasks)

### Critical Question for Testing

**How slow is "too slow" for night shift?**
- Nicholas asleep = latency less critical
- But: Must complete tasks before morning (6AM)
- **Acceptable:** 5-10 min per task
- **Too slow:** >30 min per task (risk incomplete batch)

**Testing priority:**
1. Benchmark 122B MLX inference speed (tokens/sec)
2. Estimate time for typical night shift tasks (reminder research, file ops)
3. Calculate: Can 5-10 reminders complete in 6h window?

### MLX Downloads in Progress

**Current (2026-02-26 18:01):**
- ✅ **35B:** Downloaded GGUF (20GB), deleted (switching to MLX)
- ⏳ **122B:** MLX download started (nightmedia/Qwen3.5-122B-A10B-Text-mxfp4-mlx, 21 files)
- 📋 **27B:** Queued (mlx-community/Qwen3.5-27B-heretic-8bit)

**Why MLX-first:**
- M4 Max 64GB = expensive hardware
- **Philosophy:** Hardware investment demands software efficiency
- MLX = Apple Silicon native (better than llama.cpp generic)
- Maximum performance validates hardware cost

### Next Steps (Weeks Away)

**Week 1-2:**
- [x] Download 122B MLX
- [ ] Download 35B MLX (Heretic version)
- [ ] Download 27B MLX

**Week 3:**
- [ ] Benchmark all 3 models (tokens/sec, RAM usage)
- [ ] Test real-world tasks (reminder processing, research, file ops)
- [ ] Measure: time to complete 5 reminders

**Week 4:**
- [ ] Finalize model allocation strategy
- [ ] Document performance characteristics
- [ ] Update AGENTS.md with model routing rules

**Blockers:**
- None (downloads automated, testing when Nicholas has time)

**Remember:**
- Don't retry GGUF approach (validated slower on Apple Silicon)
- Signal feedback = GGUF baseline, MLX may surprise us
- Night shift = slow acceptable IF completes before 6AM

---

**Decision deferred:** Wait for benchmarks. Don't assume 122B unusable without testing MLX optimization first. 🏴

---

## 🤝 Company Promise: Infrastructure Investment Ethics

**Context:** One-time hardware investment = eternal optimization obligation

### Core Principle

**Hardware caro = obrigação de otimização total.**

Mac Studio M4 Max 64GB = $$$ investido  
→ **Qualquer ganho marginal é justificado**

### Investment Philosophy

**Minimal gains matter:**
- 5% faster? **Worth it.**
- 10% less RAM? **Worth it.**
- Metal native vs generic? **Always Metal.**
- Gains accumulate: 5% + 5% + 5% = 15%

**Always operate at the limit:**
- Powerful dedicated machine = run at maximum capacity
- Don't waste capability
- We have hardware to sustain this
- Extract every possible advantage

### Practical Application

**Platform selection criteria:**
1. **Most native** (MLX > llama.cpp for Apple Silicon)
2. **Maximum efficiency** (even small gains justified)
3. **Full Metal support** (100% > 95% > 90%)
4. **Sustainable at scale** (we'll always push limits)

**Examples:**
- MLX vs llama.cpp: Even 10% gain = choose MLX
- Ollama 95% vs llama.cpp 100%: Choose 100% (we have power budget)
- Quantization: Test all options, pick fastest for our hardware

### Economic Model

**One-time cost, infinite use:**
- Mac Studio = capital expense (paid once)
- Local LLM = no per-token costs
- Optimization = multiplies initial investment value
- **3h/day commons work = sustainable** (no cloud costs)

### Two Practices

**Wiley (9-5):**
- Cloud LLM acceptable (corporate context)
- GitHub Copilot, Claude API (already paid)

**Commons work (3h/day):**
- Local LLM only (ethical alignment)
- Privacy, autonomy, anti-surveillance
- Self-hosted infrastructure

### Promise

> "One-time investment high = eternal optimization obligation.  
> Always operate at the limit.  
> Minimal gains worth it because we have hardware to sustain."

**This justifies:**
- Choosing MLX over GGUF (Apple native)
- Testing multiple quantizations (find optimal)
- Running always-on server (pmset sleep 0)
- Future hardware upgrades (when justified)

---

**Grooming note:** Expand this into standalone epic after OpenProject migration (Infrastructure Investment Philosophy). For now, anchored in v0.25.0 as context for LLM platform choices. 🏴

---

## 🎬 Future Vision: Autonomous Content Creation

**Long-term direction (multi-year)**

### Evolution of Work

**Phase 1 (Now - 2026):**
- Nicholas builds structure (epics, checks, pipelines)
- Nicholas executes tasks
- Nicholas documents processes

**Phase 2 (Near future):**
- Agents execute structured tasks (night shift)
- Nicholas reviews outputs
- Nicholas refines checks/pipelines

**Phase 3 (Mature future):**
- Agents create content (videos, images, copy)
- **Nicholas = art director** (signoff only)
- **Storyboards as contracts** (approval before execution)
- Night shift generates, morning review approves

### Video/Image Workflow (Future)

```
Night Shift (3AM-6AM):
├─ Task: "Create vertical video on X topic"
├─ Agent generates storyboard (contract)
├─ Agent renders video options (A/B/C)
└─ Morning: Nicholas reviews → signoff or iterate

Approval Process:
1. Storyboard contract (what will be created)
2. Agent execution (overnight, no Nicholas needed)
3. Morning review (3 options, pick one or request changes)
4. Publish (after signoff)
```

### Technical Requirements

**Local LLM:** Text, copy, scripts ✅ (already covered)  
**Local vision:** Image generation (Stable Diffusion, Flux)  
**Local video:** Automation tools (research needed)  
**M4 Max GPU:** Can handle image gen, video rendering  

**Content types:**
- Vertical videos (TikTok/Reels/Shorts format, 9:16)
- Static images (posts, thumbnails)
- Motion graphics (titles, transitions)
- B-roll automation (stock footage + captions)

### Connections to Other Systems

- **Backstage 2.0:** Checkpoints validate storyboard → execution
- **Night shift:** Unattended content generation
- **Contract-diagram:** Storyboard = approval before work
- **Commons work:** Ethical content (all local, no surveillance)

### Future Research Tracks

**Video generation:**
- CLI tools for vertical video (ffmpeg automation)
- Local AI video (Runway alternatives)
- Motion graphics automation (After Effects scripting?)
- B-roll stitching (captions + stock footage)

**Image generation:**
- Stable Diffusion XL (local, M4 Max compatible)
- Flux models (quality vs speed)
- ControlNet (precise composition control)

**Asset management:**
- Local stock footage library
- Font/music licensing (Creative Commons)
- Template system (reusable storyboards)

---

**Timeline:** Post OpenProject migration, structure in place, then explore content automation infrastructure. 🎬🏴

---

## 📱 Marketing Deliverables: Lottie + Audio Pipeline

**Viable solution for autonomous vertical video creation**

### Technical Approach

**Lottie animations + audio → browser render → screen capture**

**Why this works:**
- ✅ Lightweight (Lottie JSON = KB, not GB)
- ✅ Browser native (no special software)
- ✅ Perfect sync (audio timeline controls animation)
- ✅ Vertical easy (CSS: 1080x1920 viewport)
- ✅ M4 Max trivial (browser rendering lightweight)

### Night Shift Workflow

```
3AM-6AM automated pipeline:

1. AI generates content plan
   - Topic, key points, call-to-action
   - Visual style, color palette

2. AI writes Lottie JSON
   - Vector animation (scalable, clean)
   - Timed to audio script
   - Vertical format (9:16)

3. AI generates script → TTS
   - macOS `say` command OR
   - Eleven Labs local model
   - Audio: 30-60 seconds

4. HTML assembly
   - Lottie-web player
   - Audio element (sync controls)
   - CSS: 1080x1920 viewport
   - Auto-play on load

5. Browser render + capture
   ffmpeg -f avfoundation -i "1:0" -t 60 -s 1080x1920 vertical.mp4

6. Output: 3 video options (A/B/C)
   - Different visual styles
   - Same script, different animations
   - Ready for morning review
```

### Morning Review (6AM)

**Nicholas reviews:**
- Video A, B, C (pick one or iterate)
- If approved → publish (TikTok/Reels/Shorts)
- If iterate → adjust storyboard, re-run tonight

### Tech Stack

**Required:**
- **Lottie-web** (Airbnb library, free)
- **macOS TTS** (`say` command, built-in)
- **ffmpeg** (screen capture, already installed)
- **Chrome/Safari** (browser rendering)

**Optional upgrades:**
- **Eleven Labs** (better TTS quality)
- **After Effects → Lottie export** (professional animations)
- **Rive** (interactive animations, more control)

### Content Types (Marketing)

**Vertical videos (TikTok/Reels/Shorts):**
- Design tips (UX patterns, accessibility)
- Tool tutorials (quick wins)
- Portfolio highlights (case studies)
- Thought leadership (hot takes)

**Commons work examples:**
- Free design resources
- Open-source tooling
- Community education
- Ethical tech advocacy

### Asset Library (Future)

**Reusable components:**
- Lottie templates (intro/outro, transitions)
- Audio snippets (music beds, sound effects)
- Font licensing (Creative Commons)
- Color palettes (brand-consistent)

**Template system:**
- Storyboard templates (repeatable formats)
- Voice presets (tone, pacing)
- Animation styles (minimal, playful, professional)

### Timeline

**Phase 1 (Proof of concept):**
- [ ] Manual Lottie → TTS → screen capture test
- [ ] Verify M4 Max handles rendering
- [ ] Benchmark: time to produce 1 video

**Phase 2 (Semi-automated):**
- [ ] AI writes Lottie JSON (GPT-4 or local LLM)
- [ ] HTML template system
- [ ] ffmpeg automation script

**Phase 3 (Fully autonomous):**
- [ ] Night shift integration (3AM trigger)
- [ ] Storyboard approval workflow
- [ ] Multi-variant generation (A/B/C)
- [ ] Morning review dashboard

**Post OpenProject migration:** Integrate marketing deliverables as project type with approval workflows.

---

**Marketing = ethical content creation.** Local infrastructure, no surveillance, community-focused. 🏴🎬

---

## 👁️ Vision Model Integration: Storyboard → Animation

**Night shift workflow with visual storyboards**

### Why Vision Model Matters

**Storyboard = contract, but visual:**
- Nicholas thinks visually (drawing/sketching)
- Text descriptions = translation overhead
- Vision model = direct visual understanding
- **Night shift compatible** (M4 Max handles local vision models)

### Complete Workflow

**Evening (Pre-sleep):**
```
1. Nicholas sketches storyboard (iPad/paper)
   - Frame-by-frame visual sequence
   - Camera notes, timing, transitions
   - Visual style references

2. Export as image (PNG/JPG)
   - 1-4 frames per storyboard
   - Annotations visible

3. Queue night shift task:
   "Generate Lottie animation from storyboard.png"
```

**Night Shift (3AM-6AM):**
```
1. Agent loads storyboard.png

2. Vision model (local) reads image:
   - Qwen-VL, LLaVA, or CogVLM
   - Runs on M4 Max (64GB RAM sufficient)
   - Describes each frame in detail:
     "Frame 1: Close-up product, centered, white background, fade in..."
     "Frame 2: Medium shot, feature highlight, zoom in slowly..."

3. Text LLM (Qwen 122B) processes description:
   - Generates Lottie JSON matching frames
   - Applies timing from storyboard notes
   - Creates smooth transitions

4. Browser render + preview:
   - HTML page with Lottie player
   - Screenshot each variant (A/B/C)

5. Output ready for morning:
   - 3 Lottie variants (different visual styles)
   - Preview images (thumbnails)
   - Source JSON (editable if needed)
```

**Morning (6AM Review):**
```
Nicholas reviews:
├─ Visual preview (screenshots)
├─ Browser playback (full animation)
└─ Approve → publish OR iterate storyboard
```

### Vision Models Available (Local)

| Model | Size | Strength | MLX Support |
|-------|------|----------|-------------|
| **Qwen-VL** | ~15GB | Qwen family (consistent) | ✅ Yes |
| **LLaVA-v1.6** | ~13GB | Strong general vision | ✅ Yes |
| **CogVLM** | ~20GB | Best visual understanding | ⚠️ Check |

**M4 Max 64GB = sufficient for all options**

### Contract-Diagram Parallel

**Storyboard = visual contract** (same philosophy as contract-diagram skill):

```
Before execution:
├─ Nicholas draws agreement (storyboard)
├─ AI reads agreement (vision model)
├─ AI proposes execution (Lottie preview)
└─ Nicholas approves → execute

After execution:
├─ Compare storyboard vs output
├─ Detect drift (did AI follow contract?)
└─ Iterate or approve
```

**Philosophy:** Contract prevents hallucination. AI can't make up frames if storyboard exists.

### Hybrid Approach Option

**Text + Visual storyboard:**

```
Nicholas creates:
1. Visual sketch (thinking tool)
2. Shot list (text contract):
   
   SHOT 1 (3s)
   Frame: Close-up, product centered
   Camera: Static
   Animation: Fade in from black
   Audio: "Introducing..."
   
3. Both fed to AI:
   - Vision model reads sketch (visual detail)
   - Text LLM reads shot list (structure/timing)
   - Combined = better output
```

**Best of both:** Visual thinking + precise text control.

### Technical Requirements

**Download (one-time):**
- Vision model: ~15GB (Qwen-VL recommended)
- M4 Max Metal drivers (already installed)

**Runtime:**
- Vision inference: ~30s per storyboard frame
- Text LLM: ~2min for Lottie generation
- Total: ~5-10min per video (acceptable for night shift)

**Storage:**
- Storyboard images: <1MB each
- Lottie JSON output: <100KB each
- Preview screenshots: ~500KB each

### Timeline

**Phase 1 (Current):**
- [ ] Test vision model locally (Qwen-VL)
- [ ] Benchmark: storyboard → description quality
- [ ] Manual workflow (Nicholas triggers, reviews)

**Phase 2 (Semi-automated):**
- [ ] Night shift integration (queue storyboards evening)
- [ ] Multi-variant generation (A/B/C from single storyboard)
- [ ] Preview dashboard (morning review UI)

**Phase 3 (Fully autonomous):**
- [ ] Feedback loop (Nicholas corrections → improve prompts)
- [ ] Style library (visual references for consistency)
- [ ] Template system (recurring video formats)

**Post OpenProject migration:** Storyboard approval workflow as project stage.

---

**Vision model = Nicholas keeps visual thinking, AI handles execution.** Draw → sleep → review. 🎬👁️🏴
