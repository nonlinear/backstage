---
service: "LLM Models"
description: "Choose model for task (reasoning/speed/cost), understand model capabilities, or configure model settings (temperature/tokens)"
providers: "GitHub Copilot, Ollama (local)"
---

# Models - LLM Model Management

**Location:** `~/Models/` (261GB total)

**Backup policy:** NOT backed up by Time Machine (models are standard/re-downloadable)

**Storage:** Moved to NAS (`/serve/models/`) with local symlink for compatibility

---

## Why Models Aren't Backed Up

Models are **standard artifacts** - publicly available from HuggingFace/ModelScope. Re-downloading is cheaper than storing 261GB of duplicates in backup.

**Time Machine exclusion:**
```bash
tmutil addexclusion ~/Models
```

---

## Current Inventory (as of 2026-03-02)

### GGUF Models (138GB)
**Format:** llama.cpp compatible (CPU/Metal inference)

- **Qwen2.5-72B-Instruct-FP16** (134GB)
  - Source: `bartowski/Qwen2.5-72B-Instruct-GGUF`
  - Quantization: FP16 (42 shards)
  - Use case: High-quality reasoning, full precision

- **Qwen2.5-7B-Instruct-Q4_K_M** (4.4GB)
  - Source: `bartowski/Qwen2.5-7B-Instruct-GGUF`
  - Quantization: Q4_K_M (4-bit quantized)
  - Use case: Fast inference, low memory

### MLX Models (122GB)
**Format:** Apple MLX optimized (Metal Performance Shaders)

- **Qwen3.5-122B** (60GB)
  - Source: `mlx-community/Qwen3.5-122B-4bit`
  - Quantization: 4-bit
  - Use case: Largest reasoning model (experimental)

- **Qwen3.5-35B** (34GB)
  - Source: `mlx-community/Qwen3.5-35B-4bit`
  - Quantization: 4-bit
  - Use case: Balanced size/performance

- **Qwen3.5-27B** (28GB)
  - Source: `mlx-community/Qwen3.5-27B-4bit`
  - Quantization: 4-bit
  - Use case: Mid-tier reasoning

---

## Reconstruction Commands

**If you lose ~/Models and need to rebuild:**

### 1. Create directory structure
```bash
mkdir -p ~/Models/{gguf,mlx}
```

### 2. Download GGUF models (llama.cpp)
```bash
# Qwen2.5-72B-Instruct-FP16 (134GB)
cd ~/Models/gguf
huggingface-cli download bartowski/Qwen2.5-72B-Instruct-GGUF \
  --include "qwen2.5-72b-instruct-fp16-*" \
  --local-dir qwen2.5-72b

# Qwen2.5-7B-Instruct-Q4_K_M (4.4GB)
huggingface-cli download bartowski/Qwen2.5-7B-Instruct-GGUF \
  --include "Qwen2.5-7B-Instruct-Q4_K_M.gguf" \
  --local-dir qwen2.5-7b
```

### 3. Download MLX models (Apple Silicon optimized)
```bash
cd ~/Models/mlx

# Qwen3.5-122B-4bit (60GB)
huggingface-cli download mlx-community/Qwen3.5-122B-4bit \
  --local-dir qwen3.5-122b

# Qwen3.5-35B-4bit (34GB)
huggingface-cli download mlx-community/Qwen3.5-35B-4bit \
  --local-dir qwen3.5-35b

# Qwen3.5-27B-4bit (28GB)
huggingface-cli download mlx-community/Qwen3.5-27B-4bit \
  --local-dir qwen3.5-27b
```

### 4. Alternative: Restore from NAS backup
```bash
# If NAS backup exists (faster than re-downloading)
source ~/Documents/personal/.env
rsync -avhP $NAS_USER@$NAS_HOST:/serve/models/ ~/Models/
```

---

## Usage

**llama.cpp (GGUF models):**
```bash
# Run 72B model
llama-server \
  --model ~/Models/gguf/qwen2.5-72b/qwen2.5-72b-instruct-fp16-00001-of-00042.gguf \
  --ctx-size 32768 \
  --n-gpu-layers 99

# Run 7B model (faster)
llama-server \
  --model ~/Models/gguf/qwen2.5-7b/Qwen2.5-7B-Instruct-Q4_K_M.gguf \
  --ctx-size 8192 \
  --n-gpu-layers 99
```

**MLX (Apple Silicon optimized):**
```bash
# Run 122B model
mlx-server \
  --model ~/Models/mlx/qwen3.5-122b \
  --max-tokens 32768

# Run 35B model
mlx-server \
  --model ~/Models/mlx/qwen3.5-35b \
  --max-tokens 16384
```

---

## Storage Strategy

**Current setup (2026-03-02):**
1. ✅ Models moved to NAS (`/serve/models/`) - 1.7TB free
2. ✅ Symlink created: `ln -s /Volumes/NAS/models ~/Models`
3. ✅ Time Machine exclusion set: `tmutil addexclusion ~/Models`
4. ✅ Backup disk freed: ~261GB reclaimed

**Why NAS?**
- Persistent storage (survives Mac wipes)
- Accessible from other devices (Tailscale)
- Time Machine focuses on irreplaceable data (documents, code, configs)

---

## Dependencies

**HuggingFace CLI:**
```bash
pip install huggingface-hub
```

**llama.cpp:**
```bash
brew install llama.cpp
```

**MLX:**
```bash
pip install mlx mlx-lm
```

---

## Notes

- **Total download time:** ~2-3 hours on fast connection (100 Mbps)
- **Disk space required:** 261GB minimum
- **Quantization tradeoff:** FP16 = higher quality, Q4 = smaller/faster
- **Model selection:** Prefer MLX on Apple Silicon (Metal acceleration), GGUF elsewhere

---

**Created:** 2026-03-02
**Last updated:** 2026-03-02
