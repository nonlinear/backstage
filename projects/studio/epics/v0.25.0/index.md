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
