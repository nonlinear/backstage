# Stack as Domain

## Context

When a project declares its tech stack (e.g., "Hugo", "Next.js", "Python"), Backstage should automatically provide context-aware affordances:

- **Checks:** Build validation, link checking, deploy verification (stack-specific)
- **MCP Servers:** Language-specific tooling (LSP, formatters, linters)
- **Skills:** Deployment workflows, versioning, preview environments
- **Tools:** Stack-appropriate CLI, frameworks, libraries

Fits into Checkpoint Research epic (v0.31.0) — stacks define default check requirements.

## Tasks

- [ ] Define stack taxonomy (Hugo, Next.js, Python, etc.)
- [ ] Map stacks → default checks (build validation, link checking, etc.)
- [ ] Map stacks → MCP servers (language-specific tooling)
- [ ] Map stacks → skills (deployment workflows, versioning)
- [ ] Design stack declaration in project metadata

## Research

**Checkpoint architecture:**
- OPA for hierarchical policies (global → stack → project)
- Stack as scope tier (between global and project)
- Conflict resolution (project overrides > stack defaults > global)

**Examples:**
- Hugo → check: `hugo build`, `link-checker`, `deploy-preview`
- Next.js → check: `npm test`, `npm run build`, `lighthouse`
- Python → check: `pytest`, `mypy`, `black --check`

## Done
