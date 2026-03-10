# v0.25.0 - Local LLM Infrastructure

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

### Models Downloaded (Ollama)

Location: `~/.ollama/models/blobs/`

| Model | Size | Downloaded | Notes |
|-------|------|------------|-------|
| qwen3.5:27b | 17 GB | 2026-03-05 | - |
| qwen2.5:32b | 19 GB | 2026-03-04 | Code agents, Defense |
| qwen3.5:35b | 23 GB | 2026-03-04 | - |
| qwen2.5-7b | 4.7 GB | 2026-03-04 | Secretaria |

**Total:** ~64 GB (4 models)
