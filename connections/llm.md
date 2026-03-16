---
service: "Local LLM"
description: "Use Qwen models (7B/14B/32B/72B), configure Ollama, manage model contexts, or troubleshoot local inference"
models: "Qwen2.5-Coder (7B/14B/32B), Qwen2.5 (72B)"
---

# LLM Models - Local Setup

**What:** Download, manage, and run local LLM models (llama.cpp, GGUF)

---

## Download Models (Hugging Face)

**Command:** `hf download` (NOT `huggingface-cli`)

### Download single file:
```bash
hf download REPO/MODEL filename.gguf --local-dir /path/to/models/
```

### Download specific files (shards):
```bash
# Single shard
hf download Qwen/Qwen2.5-72B-Instruct-GGUF qwen2.5-72b-instruct-fp16-00012-of-00042.gguf --local-dir .

# Multiple shards (loop)
for i in {01..42}; do
  hf download Qwen/Qwen2.5-72B-Instruct-GGUF qwen2.5-72b-instruct-fp16-000${i}-of-00042.gguf --local-dir .
done
```

### Download entire repo:
```bash
hf download REPO/MODEL --local-dir /path/to/models/
```

**Notes:**
- Use `hf download` (from `huggingface_hub` Python package)
- NOT `huggingface-cli` (command not found in ml-env)
- `--local-dir .` = download to current directory
- Auto-resumes if interrupted

---

## Model Storage

**Location:** `~/Models/gguf/`

**Structure:**
```
~/Models/gguf/
├── qwen2.5-72b/
│   ├── qwen2.5-72b-instruct-fp16-00001-of-00042.gguf
│   ├── qwen2.5-72b-instruct-fp16-00002-of-00042.gguf
│   └── ... (42 parts total)
├── qwen-coder-32b/
└── qwen-coder-7b/
```

**Sharded models:**
- Large models split into ~3.5GB parts (00001-of-00042)
- Must unify before use (cat all parts into single file)

---

## Unify Sharded Models

**Problem:** llama.cpp needs single GGUF file (not 42 shards)

**Solution:** Concatenate all parts:

```bash
cd ~/Models/gguf/qwen2.5-72b/

# Unify all shards (order matters!)
cat qwen2.5-72b-instruct-fp16-00001-of-00042.gguf \
    qwen2.5-72b-instruct-fp16-00002-of-00042.gguf \
    ... \
    qwen2.5-72b-instruct-fp16-00042-of-00042.gguf \
    > qwen2.5-72b-instruct-fp16.gguf
```

**Automated unify:**
```bash
cd ~/Models/gguf/qwen2.5-72b/

# Generate file list in order
ls qwen2.5-72b-instruct-fp16-*-of-*.gguf | sort -V > files.txt

# Concatenate (cat @files.txt not supported, use xargs)
cat $(ls qwen2.5-72b-instruct-fp16-*-of-*.gguf | sort -V) > qwen2.5-72b-instruct-fp16.gguf
```

**Verify:**
```bash
# Check file size (should be ~131GB for 72B fp16)
du -sh qwen2.5-72b-instruct-fp16.gguf

# Count shards (should match total, e.g., 42)
ls qwen2.5-72b-instruct-fp16-*-of-*.gguf | wc -l
```

**Clean up shards (optional):**
```bash
# After verifying unified file works
rm qwen2.5-72b-instruct-fp16-*-of-*.gguf
```

---

## Run Models (llama.cpp)

**llama.cpp location:** `~/llama.cpp/` (compiled with Metal support)

### Start llama-server:
```bash
cd ~/llama.cpp/
./llama-server \
  -m ~/Models/gguf/qwen2.5-72b/qwen2.5-72b-instruct-fp16.gguf \
  --port 8080 \
  --ctx-size 32768 \
  --n-gpu-layers 999
```

**Flags:**
- `-m` = model path
- `--port` = API port (default 8080)
- `--ctx-size` = context window (32k for Qwen)
- `--n-gpu-layers 999` = offload all layers to Metal (M4 Max)

### Multiple models (different ports):
```bash
# 72B on port 8082 (strategic/night jobs)
./llama-server -m ~/Models/gguf/qwen-72b.gguf --port 8082

# 32B on port 8080 (defense/daily)
./llama-server -m ~/Models/gguf/qwen-coder-32b.gguf --port 8080

# 7B on port 8081 (secretaria/clerical)
./llama-server -m ~/Models/gguf/qwen-coder-7b.gguf --port 8081
```

---

## OpenClaw Integration

**Switch to local model:**
```bash
/model http://localhost:8080/v1  # Use local 32B
/model http://localhost:8082/v1  # Use local 72B
```

**Switch back to cloud:**
```bash
/model github-copilot/claude-sonnet-4.5
```

---

## Troubleshooting

### Missing shards
**Symptom:** `cat: qwen2.5-72b-instruct-fp16-00012-of-00042.gguf: No such file or directory`

**Fix:** Re-download missing parts:
```bash
hf download Qwen/Qwen2.5-72B-Instruct-GGUF qwen2.5-72b-instruct-fp16-00012-of-00042.gguf --local-dir .
```

### Command not found: huggingface-cli
**Problem:** Using wrong command

**Fix:** Use `hf download` (not `huggingface-cli`)

### Model won't load
**Symptoms:**
- llama-server crashes
- "invalid GGUF file"
- Segmentation fault

**Checks:**
- [ ] File size correct? (`du -sh model.gguf`)
- [ ] All shards unified? (`ls *-of-*.gguf | wc -l`)
- [ ] Unified file exists? (`ls qwen2.5-72b-instruct-fp16.gguf`)
- [ ] Enough RAM? (72B fp16 = ~131GB, needs 64GB+ RAM)

---

## Model Info

### Qwen 2.5 72B Instruct FP16
- **Size:** ~131GB (42 shards × 3.5GB)
- **Format:** GGUF FP16
- **Context:** 32k tokens
- **Speed:** 10-15 tok/s (M4 Max Metal)
- **Use:** Strategic work, agent night jobs

### Qwen 2.5 Coder 32B Q4_K_M
- **Size:** ~20GB
- **Format:** GGUF Q4_K_M quantized
- **Context:** 32k tokens
- **Speed:** 18-22 tok/s
- **Use:** Code agents, Defense, daily work

### Qwen 2.5 Coder 7B Q4_K_M
- **Size:** ~4GB
- **Format:** GGUF Q4_K_M quantized
- **Context:** 32k tokens
- **Speed:** 30-40 tok/s
- **Use:** Secretaria (clerical, fast ops)

---

**Created:** 2026-02-26 (v0.25.0 Local LLM epic)  
**Related:** ~/Documents/personal/backstage/epic-notes/v0.25.0-local-llm.md
