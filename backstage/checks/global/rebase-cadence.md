# Rebase Cadence

**When to offer rebase:**

Suggest rebase when **BOTH** conditions are true:
- ✅ Branch >7 days without rebase
- ✅ Main has new commits (detected by `rebase-divergence.sh`)

**Detection flow:**
1. Run `rebase-divergence.sh` (exit 0 = diverged)
2. Check last rebase timestamp (git log)
3. If diverged AND >7 days → offer rebase

**Offer format:**
```
⚠️ Branch [name] is [N] days behind main ([X] commits).
Last rebase: [date]
Offer: Update branch with main? (y/n)
```

**User decides:**
- `y` → Execute rebase
- `n` → Continue (document skip)

**Why soft enforcement:**
- Rebase can break things (conflicts)
- User may be mid-work (not ready to sync)
- Forcing = bad UX

**Cadence rationale:**
- <7 days = minor drift (acceptable)
- >7 days + divergence = significant drift (warn)
- No divergence = no warning (even if >7 days)
