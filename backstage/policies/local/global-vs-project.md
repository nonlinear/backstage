# Global vs Project Files

**🔴 DO NOT CONFUSE THESE!**

## Global Files (global/POLICY.md, global/HEALTH.md)

**Scope:** ALL projects using backstage framework MUST follow these rules

**Content:**
- **global/POLICY.md** = Universal workflow rules (epic dance, commits, branching) - **FOR HUMANS**
- **global/HEALTH.md** = Universal health checks (code to run, validation tests) - **FOR CODE**

**Who edits:** Framework maintainers only (changes affect ALL projects)

---

## Project Files (POLICY.md, HEALTH.md)

**Scope:** THIS backstage project ONLY (dogfooding - we use our own framework)

**Content:**
- **POLICY.md** = Backstage-specific rules and deviations - **FOR HUMANS**
- **HEALTH.md** = Backstage-specific checks (dual-layer structure, symlinks, etc.) - **FOR CODE**

**Who edits:** Backstage project contributors

---

## Rule of Thumb

- **Global = framework (everyone follows)**
- **Project = this repo only (backstage dogfooding itself)**

**When in doubt:** If rule applies to ALL projects using backstage → global. If only backstage repo → project.
