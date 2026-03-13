# Extensions

**Goal:** Browse workspace extensions (skills, MCPs) and read markdown docs in fullscreen.

## Context

**Problem:**
- Skills scattered across `~/.openclaw/workspace/skills/`
- No visual overview of installed skills/MCPs
- SKILL.md files hard to read (terminal cat vs proper viewer)
- Markdown docs need fullscreen reader (not embedded in epic views)

**Solution:**
- `/extensions` page with 3 tabs: Skills | MCPs | Reader
- Skills browser: List all skills, parse frontmatter, show triggers
- MCP browser: List installed MCPs, status, capabilities
- Markdown reader: Fullscreen viewer with syntax highlighting, TOC, dark mode

## Research

### Skills Discovery

**Scan logic:**
```bash
find ~/.openclaw/workspace/skills/*/SKILL.md -type f
```

**Parse frontmatter (YAML):**
```yaml
---
name: pomodoro
description: Pomodoro timer with Calendar integration
version: 1.0.0
triggers:
  - "pomo"
---
```

**Extract:**
- Name, description, version, triggers
- Symlink status (is it linked to `~/.openclaw/skills/`?)
- Errors (invalid YAML, missing fields)

### MCP Discovery

**Config locations:**
- `~/.openclaw/openclaw.json` (MCP servers config)
- `~/.openclaw/mcp/` (MCP installation directory?)

**Metadata to show:**
- Name, version, status (running/stopped)
- Capabilities (tools, resources, prompts)
- Link to docs/README

### Markdown Reader

**Features:**
- Fullscreen overlay (Esc to close)
- Syntax highlighting (Prism.js or Shiki)
- Auto-generated TOC (from `## Headers`)
- Dark mode (match Backstage theme)
- Search within doc (Cmd+F browser native + custom highlighting)
- Print/export to PDF (browser print dialog)

**Component:**
```tsx
<MarkdownReader
  content={skillContent}
  onClose={() => setReaderOpen(false)}
  darkMode={true}
/>
```

## Tasks

### Phase 1: Skills Browser
- [ ] Scan `skills/*/SKILL.md`
- [ ] Parse frontmatter (name, description, triggers, version)
- [ ] Display table with filter/search
- [ ] Click skill → open in markdown reader

### Phase 2: MCP Browser
- [ ] List installed MCPs
- [ ] Show status, capabilities
- [ ] Link to docs

### Phase 3: Markdown Reader
- [ ] Fullscreen component
- [ ] Syntax highlighting, TOC
- [ ] Dark mode, search, print

### Phase 4: Integration
- [ ] `/extensions` route
- [ ] Tab switcher (Skills | MCPs | Reader)
- [ ] Keyboard shortcuts

## Links

**Skills directory:** `~/.openclaw/workspace/skills/`
**MCP config:** `~/.openclaw/openclaw.json`
**Markdown libraries:**
- `react-markdown` (rendering)
- `remark-gfm` (GitHub Flavored Markdown)
- `rehype-highlight` (syntax highlighting)

## Notes

**Why useful:**
- Quick reference: "What skills do I have?"
- Debugging: "Is skill installed? Is YAML valid?"
- Documentation: Read SKILL.md without terminal cat
- Discovery: Browse available MCPs, see what they do

**Future expansion:**
- Install skills from ClawHub directly via UI
- Enable/disable skills (toggle symlinks)
- MCP control panel (start/stop/restart)
