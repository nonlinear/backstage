# v0.25.0 - Local LLM Infrastructure

### Models Downloaded (GGUF)

Location: `~/.ollama/models/blobs/`

| Model | Size | llama.cpp | llama.cpp + OpenClaw | Ollama | Ollama + OpenClaw |
|-------|------|-----------|----------------------|--------|-------------------|
| [qwen3.5:27b](https://ollama.com/library/qwen3.5:27b) | 17 GB | - | - | - | - |
| [qwen2.5:32b](https://ollama.com/library/qwen2.5:32b) | 19 GB | - | - | ✅ | - |
| [qwen3.5:35b](https://ollama.com/library/qwen3.5:35b) | 23 GB | - | - | - | - |
| [qwen2.5-7b](https://ollama.com/library/qwen2.5-7b) | 4.7 GB | - | - | - | - |

**Total:** ~64 GB (4 models)

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

