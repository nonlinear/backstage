# Update Backstage Flow Diagram

**Purpose:** Visual spec for "update backstage" trigger (sync checks/global with upstream)

---

```mermaid
flowchart TD
    TRIGGER["🔄 Trigger: update backstage"]
    
    FIND["Find backstage/ folder<br/>(search CWD)"]
    
    SYMLINK{"Symlinked?"}
    SKIP["✅ Already auto-updates<br/>(report + exit)"]
    
    CONFIRM{"Confirm upstream?<br/>github.com/nonlinear/backstage"}
    ABORT1["❌ Aborted"]
    
    FETCH["Fetch upstream<br/>(git clone --depth 1)"]
    OFFLINE{"Clone<br/>success?"}
    ABORT2["❌ Offline or repo moved"]
    
    DIFF["Compare local vs upstream<br/>(diff checks/global/)"]
    
    CHANGES{"Changes<br/>found?"}
    UPTODATE["✅ Already up to date"]
    
    CHANGELOG["Generate mini changelog<br/>NEW: ...<br/>CHANGED: ...<br/>REMOVED: ..."]
    
    APPROVE{"User approves<br/>update?"}
    ABORT3["❌ Aborted"]
    
    APPLY["rsync --delete<br/>upstream → local"]
    
    REPORT["🎉 Updated!<br/>Files changed: N<br/>Next: run backstage start"]
    
    TRIGGER --> FIND
    FIND --> SYMLINK
    
    SYMLINK -->|Yes| SKIP
    SYMLINK -->|No| CONFIRM
    
    CONFIRM -->|No| ABORT1
    CONFIRM -->|Yes| FETCH
    
    FETCH --> OFFLINE
    OFFLINE -->|No| ABORT2
    OFFLINE -->|Yes| DIFF
    
    DIFF --> CHANGES
    
    CHANGES -->|No| UPTODATE
    CHANGES -->|Yes| CHANGELOG
    
    CHANGELOG --> APPROVE
    
    APPROVE -->|No| ABORT3
    APPROVE -->|Yes| APPLY
    
    APPLY --> REPORT
```

---

## Key Decision Points

1. **Symlink check** - Admin mode users already auto-update (skip)
2. **Upstream confirmation** - Safety check (could be wrong repo)
3. **Offline handling** - Graceful failure if git clone fails
4. **User approval** - Show what changes before applying
5. **Report** - What changed + next steps

## Edge Cases Handled

- ✅ Symlinked (admin mode) → skip
- ✅ No changes → "Already up to date"
- ✅ Offline → "Can't reach upstream"
- ✅ User declines → "Aborted" at multiple points
- ✅ Conflicts (user modified global) → TODO (future enhancement)

---

**Created:** 2026-02-25  
**Implementation:** `update-backstage.sh`  
**Status:** Implemented + documented
