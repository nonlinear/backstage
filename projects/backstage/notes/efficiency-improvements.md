# Epic: Backstage Efficiency Improvements

**Version:** TBD (future epic)

---

## Issues to address:

### 1. Health check output too verbose
**Problem:** Prints unnecessary details (python version, file counts, etc)

**Solution options:**
- Add `--quiet` flag to health checks
- Only show failures by default
- Add verbosity levels (0=errors only, 1=warnings, 2=all)

---

### 2. `.last-update-check` created every run
**Problem:** Even when skipping update, file gets touched

**Solution:**
- Only create/update if user actually sees update prompt
- Check if file exists + is today before creating

---

### 3. POLICY protocol invisible
**Status:** Not a problem!
- Skill/prompt obey POLICY internally
- No need for visible output
- Mark as "won't fix" or remove from list

---

**Priority:** Low (nothing broken, just optimization)
