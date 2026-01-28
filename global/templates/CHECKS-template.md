# [Project Name] - Stability Checks

> 🤖
>
> - [README](../README.md) - Our project
> - [CHANGELOG](CHANGELOG.md) — What we did
> - [ROADMAP](ROADMAP.md) — What we wanna do
> - [POLICY](POLICY.md) — How we do it
> - [CHECKS](CHECKS.md) — What we accept
>
> 🤖

---

## Project-Specific Checks

> **Note:** This file contains checks specific to YOUR project.
> Universal checks live in [global/CHECKS.md](global/CHECKS.md)

---

### Test: [Your Test Name]

```bash
# Your test command here
echo "Test passed"
```

Expected: [What should happen]
Pass: ✅ [Success criteria]

---

## Summary

**Project-specific checks ensure:**

- ✅ [Your requirement 1]
- ✅ [Your requirement 2]
- ✅ [Your requirement 3]

---

**Run all checks:**

````bash
# Universal checks (apply to all backstage projects)
bash -c "$(grep -A 1 '^```bash' global/CHECKS.md | grep -v '^```' | grep -v '^--$')"

# Project-specific checks (this project only)
bash -c "$(grep -A 1 '^```bash' CHECKS.md | grep -v '^```' | grep -v '^--$')"
````

---

**Last updated:** [Date]
