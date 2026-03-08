# Python Paths - Environment Setup

**Problem:** Multiple Python versions causing import errors.

**Solution:** Explicitly use `/opt/homebrew/bin/python3.11` for scripts.

---

## Standard Shebang (USE THIS)

```bash
#!/opt/homebrew/bin/python3.11
```

**NOT:**
- `#!/usr/bin/env python3` (might use 3.14, missing packages)
- `#!/usr/bin/env python3.11` (PATH-dependent, unreliable)

---

## Why python3.11?

**Packages installed here:**
- `websockets` (for hot reload, WebSocket servers)
- `sentence-transformers` (for librarian embeddings)
- `faiss-cpu` (vector search)
- All librarian dependencies

**Location:** `/opt/homebrew/lib/python3.11/site-packages/`

**python3.14 has NOTHING** - clean install, no packages.

---

## Usage Pattern

**Shell scripts calling Python:**
```bash
/opt/homebrew/bin/python3.11 script.py
```

**Python scripts (shebang):**
```python
#!/opt/homebrew/bin/python3.11
import websockets  # Works!
```

**Direct execution:**
```bash
./script.py  # Uses shebang
```

---

## Projects Using This

- **Librarian** (`~/Documents/librarian/`) - all scripts
- **Arch hot reload** (`~/.openclaw/skills/arch/scripts/watch-reload.py`)
- **Any script using websockets, transformers, faiss**

---

## Quick Check

```bash
# Which python3 is default?
which python3  # Probably 3.14 (wrong)

# Which has websockets?
/opt/homebrew/bin/python3.11 -c "import websockets; print('✅ Works')"

# Wrong version fails
python3 -c "import websockets; print('✅ Works')"  # ModuleNotFoundError
```

---

## If You Forget

**Symptom:** `ModuleNotFoundError: No module named 'websockets'`

**Fix:** Change shebang to `/opt/homebrew/bin/python3.11`

---

## Future-Proofing

**When upgrading Python:**
1. Install new version via Homebrew
2. Reinstall packages: `pip3.11 install websockets sentence-transformers faiss-cpu`
3. Update shebangs if switching versions
4. Test librarian + arch scripts

**Don't use `python3` generic - always specify version.**
