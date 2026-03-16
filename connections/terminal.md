---
service: Terminal
description: "Configure shell (zsh), manage aliases, troubleshoot PATH issues, or customize terminal environment"
shell: zsh
---

# Terminal - Shared Sessions (tmux)

**Purpose:** Nicholas + Kin see/control same terminal simultaneously

**Tool:** tmux (terminal multiplexer)

---

## Setup (One-time)

**Install:**
```bash
brew install tmux
```

**Verify:**
```bash
which tmux
# Should show: /opt/homebrew/bin/tmux
```

---

## Daily Workflow (ALWAYS DO THIS)

**Nicholas starts shared session:**
```bash
tmux new -s shared
```

**Kin attaches (after Nicholas creates):**
```bash
tmux attach -t shared
```

**Result:**
- ✅ Both see EXACTLY the same terminal
- ✅ Both can type commands
- ✅ Real-time sync (no copy-paste needed)
- ✅ Survives disconnects

---

## Commands Inside tmux

**Detach (leave session running):**
```
Ctrl+B, then D
```

**Kill session:**
```bash
tmux kill-session -t shared
```

**List active sessions:**
```bash
tmux ls
```

**Reattach to existing session:**
```bash
tmux attach -t shared
```

---

## Why This Matters

**Before tmux:**
- Nicholas runs command → sees output in Terminal
- Kin runs command via exec → sees output in chat
- **NO PARITY** (different views, copy-paste overhead)

**With tmux:**
- Nicholas sees terminal
- Kin sees terminal (via exec → tmux attach)
- **PERFECT PARITY** (same screen, no translation needed)

---

## Troubleshooting

**"no sessions" error:**
```bash
# Nicholas didn't create session yet
# Solution: Nicholas runs `tmux new -s shared` first
```

**"sessions should be nested" warning:**
```bash
# Already inside tmux
# Solution: Ctrl+B D to detach, then attach to shared
```

**Kin can't attach:**
```bash
# Permissions issue or wrong session name
tmux ls  # Check session exists
```

---

## Protocol

**Every session start:**
1. Nicholas: `tmux new -s shared`
2. Nicholas: "tmux rodando" (tells Kin)
3. Kin: `tmux attach -t shared` (auto-attaches)
4. **Work together** (both see/control terminal)

**Session end:**
1. Nicholas: Ctrl+B, D (or just close Terminal)
2. Session stays alive until killed
3. Can reattach later with `tmux attach -t shared`

---

## How We Use Terminal (Updated 2026-02-25 22:27)

**Rule established:** "de agora em diante quando falo pra fazer algo no terminal, quero que abra o tmux pra gente poder ver junto."

**What this means:**
- **Any terminal command request = use tmux shared session**
- No more exec-only (different views)
- Perfect paridade = both see same screen
- Zero metabolic cost (no "what do you see?" questions)

**Nicholas workflow:**
- Opens Terminal → `tmux new -s shared`
- Tells Kin "tmux rodando"
- Both work in same view

**Kin workflow:**
- When Nicholas says "do X in terminal" → use `process write` in tmux session
- Both see commands execute in real-time
- No need to repeat/confirm what happened (Nicholas already saw it)

**Success metric:** "muito melhor com tmux" (2026-02-25 22:27)

---

**Created:** 2026-02-25  
**Why:** Paridade real = less metabolic cost (no copy-paste, no "what do you see?")
