# Research Exchange - Locked Gains

**Date:** 2026-03-14

## Epic YAML Parse Error Fixed

**Problem:** 
- Research Exchange showed "1 epic" but empty when opened
- v0.1.0 epic.yaml had closing `---` marker
- Created multi-document YAML → js-yaml parse error → epic silently ignored

**Root cause:**
```yaml
# WRONG (multi-document)
---
version: v0.1.0
...
---

# CORRECT (single document)
---
version: v0.1.0
...
```

**Fix:** Removed closing `---` from v0.1.0/epic.yaml

**Commit:** 0c27236

**Verification:**
```bash
cd ~/Backstage/app
node -e "const yaml = require('js-yaml'); const fs = require('fs'); console.log(yaml.load(fs.readFileSync(process.env.HOME + '/Backstage/projects/research-exchange/epics/v0.1.0/epic.yaml', 'utf-8')).version);"
# Output: v0.1.0 ✅
```

**Status:** LOCKED ✅

---

## Checklist for Future Epics

**Before committing epic.yaml:**
- [ ] One `---` at START only (no closing marker)
- [ ] Test parse: `cd ~/Backstage/app && node -e "const yaml = require('js-yaml'); const fs = require('fs'); yaml.load(fs.readFileSync('PATH/epic.yaml', 'utf-8'));"`
- [ ] No multi-document YAML errors

**This prevents silent failures.**

---

**Next time epic doesn't show:** Check for closing `---` first.
