# Local LLM Infrastructure

**Goal:** Self-hosted LLM inference (Qwen, MLX, llama.cpp) for speed, privacy, cost savings.

---

## Engine Comparison

| Engine | Metal % | Setup | Add Model | API | Best For |
|--------|---------|-------|-----------|-----|----------|
| **llama.cpp** | 100% | CMake | Manual .gguf | Server | Max perf, proven |
| **MLX** | 100% | pip | Convert | Python | Apple-backed |
| **Ollama** | 95% | brew | `ollama pull` | REST | Easiest |

**Winner:** **llama.cpp** (ecosystem + server) or **MLX** (Apple-backed)

---

## Cloud vs Local Trade-offs

| Model | Reasoning | Latency | Cost | Privacy | Context |
|-------|-----------|---------|------|---------|---------|
| Claude Sonnet 4.5 | 10/10 ⭐⭐⭐⭐⭐ | 2-5s | Paid | ❌ Cloud | 200k |
| Qwen 72B | 9/10 ⭐⭐⭐⭐⭐ | 0.8-1.5s | FREE | ✅ Local | 32k |
| Qwen 32B | 8.5/10 ⭐⭐⭐⭐⭐ | 0.5-1s | FREE | ✅ Local | 32k |
| Qwen 7B | 6/10 ⭐⭐⭐⭐ | <0.5s | FREE | ✅ Local | 32k |

**Sweet Spot: Qwen 32B** = 85% Claude quality, 4x faster, FREE, private

---

## Model Selection

### Phase 1: ESSENTIAL (~24GB)

| Model | Size | Speed | Use |
|-------|------|-------|-----|
| Qwen-Coder 32B Q4_K_M | ~20GB | 18-22 tok/s | Code agents, Defense, Daily |
| nomic-embed-text-v1.5 | ~274MB | Fast | All agents (Librarian) |
| Qwen-Coder 7B Q4_K_M | ~4GB | 30-40 tok/s | Secretaria (clerical) |

### Phase 2: SCALE (~80GB)

| Model | Size | Speed | Use |
|-------|------|-------|-----|
| Qwen 72B Instruct Q4_K_M | ~40GB | 10-15 tok/s | Text agents (unassisted) |
| Qwen2-VL 72B Q4_K_M | ~40GB | Slow | Vision agents (Design, Marketing) |

---

## Workflow Matrix

| Workflow | Model | Speed | Quality | When |
|----------|-------|-------|---------|------|
| **Code** | Qwen-Coder 32B | 18-22 tok/s | ⭐⭐⭐⭐⭐ | Development (unassisted) |
| **Text** | Qwen 72B | 10-15 tok/s | ⭐⭐⭐⭐⭐ | UXR, Docs, Legal (unassisted) |
| **Vision** | Qwen2-VL 72B | Slow | ⭐⭐⭐⭐⭐ | Design, Marketing (unassisted) |
| **Defense** | Qwen-Coder 32B | 18-22 tok/s | ⭐⭐⭐⭐⭐ | Present work (assisted) |
| **Secretaria** | Qwen-Coder 7B | 30-40 tok/s | ⭐⭐⭐⭐ | File ops, queries (assisted) |
| **Strategic** | Claude Sonnet | 2-5s | ⭐⭐⭐⭐⭐ | Epic planning (cloud) |

---

## Hybrid Strategy

**Use both (not either/or):**

**Claude (Cloud):**
- Strategic planning, complex architecture
- Context >32k tokens
- Already paid (GitHub Copilot)

**Local (llama.cpp/MLX):**
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

## MLX Strategy (2026-02-26)

**Testing MLX mxfp4 vs GGUF Q4:**
- **122B MLX** (nightmedia/Qwen3.5-122B-A10B-Text-mxfp4-mlx) - Unsupervised (night shift)
- **35B MLX** (Heretic version) - Supervised (Defense)
- **27B MLX** (mlx-community/Qwen3.5-27B-heretic-8bit) - Secretaria

**Critical question:** How fast is 122B MLX on M4 Max?
- Signal feedback: "122B Q4 slow, might not be worth it"
- MLX may perform better than GGUF (Apple native)
- Night shift = slow acceptable IF completes before 6AM

**Testing priority:**
1. Benchmark 122B MLX (tokens/sec)
2. Estimate night shift task time (5-10 reminders)
3. Calculate: Can complete in 6h window?

---

## M4 Max 64GB = Perfect Fit

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
- Parallel: Embedding + LLM
- **Feels like expert conversation**

---

## Infrastructure Investment Ethics

**Hardware caro = obrigação de otimização total.**

Mac Studio M4 Max 64GB = $$$ investido  
→ **Qualquer ganho marginal é justificado**

**Minimal gains matter:**
- 5% faster? **Worth it.**
- 10% less RAM? **Worth it.**
- Metal native vs generic? **Always Metal.**
- Gains accumulate: 5% + 5% + 5% = 15%

**Platform selection:**
1. Most native (MLX > llama.cpp for Apple Silicon)
2. Maximum efficiency (even small gains justified)
3. Full Metal support (100% > 95%)
4. Sustainable at scale

---

## Future Vision: Autonomous Content

**Long-term direction (multi-year):**

**Phase 1 (Now):** Nicholas builds + executes  
**Phase 2 (Near):** Agents execute, Nicholas reviews  
**Phase 3 (Mature):** Agents create content, **Nicholas = art director**

**Storyboards as contracts:**
- Nicholas sketches storyboard (iPad/paper)
- Vision model reads storyboard (Qwen-VL)
- Agent generates Lottie animation + TTS
- Browser render + ffmpeg capture
- Morning review: 3 variants (A/B/C)
- Approve → publish (TikTok/Reels/Shorts)

**Marketing deliverables:**
- Vertical videos (9:16 format)
- Lottie animations + audio
- Local vision models (storyboard → execution)
- Night shift generation (3AM-6AM)

---

## Storage Location

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

## Inventory (2026-03-10)

**Engines installed:**
- **ollama** (`/opt/homebrew/bin/ollama`) - Model runtime + API
- **llama-cli** (`/opt/homebrew/bin/llama-cli`) - llama.cpp CLI
- **llama-server** (`/opt/homebrew/bin/llama-server`) - HTTP server (Metal)

**Models downloaded:** qwen3.5:9b, qwen3.5:27b, qwen3.5:35b

**Location:** `~/.ollama/models/blobs/`

---

**Goal:** Hybrid local+cloud = speed + privacy + cost savings + quality. 🏴
