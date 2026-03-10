# v0.25.0 - Local LLM Infrastructure

### Models Downloaded (GGUF)

Location: `~/.ollama/models/blobs/` — Total: ~64 GB (4 models)

**Benchmark:** Prompt "Write a haiku about code" (2026-03-10, warm start)

| Engine | Metric | [qwen3.5:27b](https://ollama.com/library/qwen3.5:27b) (17GB) | [qwen2.5:32b](https://ollama.com/library/qwen2.5:32b) (19GB) | [qwen3.5:35b](https://ollama.com/library/qwen3.5:35b) (23GB) | [qwen2.5-7b](https://ollama.com/library/qwen2.5-7b) (4.7GB) |
|--------|--------|-------|-------|-------|-------|
| **Ollama** | TTFT | *Pending* | *Pending* | *Pending* | *Pending* |
| **Ollama** | tok/s | *Pending* | ✅ 23.75 | *Pending* | *Pending* |
| **llama-server** ¹ | TTFT | *Pending* | *Pending* | *Pending* | *Pending* |
| **llama-server** ¹ | tok/s | *Pending* | *Pending* | *Pending* | *Pending* |
| **llama-cli** ² | TTFT | *Pending* | *Pending* | *Pending* | *Pending* |
| **llama-cli** ² | tok/s | *Pending* | *Pending* | *Pending* | *Pending* |
| **node-llama-cpp** ³ | TTFT | *Pending* | *Pending* | *Pending* | *Pending* |
| **node-llama-cpp** ³ | tok/s | *Pending* | ❌ 12.25 (crash) | *Pending* | *Pending* |

**Footnotes:**
- **¹ llama-server config:** `--n-gpu-layers 999 --ctx-size 4096 --port 8080` (Metal full)
- **² llama-cli config:** `--n-gpu-layers 999 --ctx-size 2048 --threads 8 --n-predict 50`
- **³ node-llama-cpp:** Default config (auto Metal detection), crashed on cleanup (SIGABRT)

## Engine Choice

**Winner:** llama.cpp (ecosystem + Metal server)

## Model Selection (Phase 1: ~24GB)

| Model | Size | Speed | Use |
|-------|------|-------|-----|
| Qwen-Coder 32B Q4_K_M | ~20GB | 18-22 tok/s | Code agents, Defense |
| nomic-embed-text-v1.5 | ~274MB | Fast | All agents (Librarian) |
| Qwen-Coder 7B Q4_K_M | ~4GB | 30-40 tok/s | Secretaria |

## Workflow Matrix

| Workflow | Model | When |
|----------|-------|------|
| **Code** | Qwen-Coder 32B | Development (unassisted) |
| **Text** | Qwen 72B | UXR, Docs, Legal (unassisted) |
| **Vision** | Qwen2-VL 72B | Design visuals (unassisted) |
| **Defense** | Qwen-Coder 32B | Assisted work iterations |
| **Secretaria** | Qwen-Coder 7B | Clerical tasks |
| **Strategic** | Claude Sonnet | Epic planning (cloud) |

## Hybrid Strategy

**Unassisted = high reasoning (32B/72B)**  
**Assisted = fast latency (7B/32B)**  
**Strategic = cloud (Claude)**

Phase 1 installs ~24GB. Scale to 72B when needed.

---

## Inventory (2026-03-10)

### Engines Installed

- **ollama** (`/opt/homebrew/bin/ollama`) - Model runtime + API server
- **llama-cli** (`/opt/homebrew/bin/llama-cli`) - llama.cpp CLI inference
- **llama-server** (`/opt/homebrew/bin/llama-server`) - llama.cpp HTTP server (Metal accelerated)

