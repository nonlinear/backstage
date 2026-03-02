# Better Skills - Frontmatter Schema

**For skills in `better/` folder** (browser/app customization).

## Folder vs Name Convention

**Folder structure:** `skills/better/{app}/`  
**Skill name:** `better-{app}`

**Example:**
```
skills/better/openclaw/SKILL.md  ← folder: better/openclaw/
name: better-openclaw            ← skill name (published)
```

**Why:**
- **Folder** = organization (grouped by better/)
- **Name** = identity (published as better-openclaw)
- **Best of both:** Visual grouping + independent packages

## Frontmatter Schema

**All skills in `better/` folder must:**
1. Use `type: better`
2. Use `name: better-{app}` format
3. Include `better:` nested block

```yaml
---
name: better-{app}
type: better
version: X.Y.Z
better:
  type: css | service-worker | browser-extension | bookmarklet | userscript
  app:
    name: AppName
    url: https://app-url.com
    version: X.Y.Z  # tested version
  platform: web | ios | android | desktop  # optional, default: web
  browser: chrome | firefox | safari | edge | all  # optional, if web
  reference: technique-doc.md  # link to canonical technique
---
```

## Fields

**`better.type`** - Customization technique:
- `css` - CSS injection
- `service-worker` - Service worker override
- `browser-extension` - Full browser extension
- `bookmarklet` - Bookmarklet snippet
- `userscript` - Tampermonkey/Greasemonkey script

**`better.app.name`** - Target app name (human-readable)

**`better.app.url`** - Official app URL

**`better.app.version`** - Tested version (compatibility tracking)

**`better.platform`** - Target platform:
- `web` (default)
- `ios`
- `android`
- `desktop`

**`better.browser`** - Browser compatibility (if web):
- `chrome`
- `firefox`
- `safari`
- `edge`
- `all`

**`better.reference`** - Link to technique doc (shared across skills)

## Example

```yaml
---
name: better-openclaw
type: better
version: 0.1.0
better:
  type: css
  app:
    name: OpenClaw
    url: https://openclaw.ai
    version: 2026.2.9
  browser: chrome
  reference: css-customization.md
---
```

## Structure

```
skills/better/
├── SKILL.md (master skill - better group)
├── openclaw/
│   └── SKILL.md (name: better-openclaw)
├── kavita/
│   └── SKILL.md (name: better-kavita)
└── komga/
    └── SKILL.md (name: better-komga)
```

**Canonical technique docs** live in better/ repo docs, skills reference them.

## AI Enforcement

**When creating better/ skills:**
- Verify frontmatter follows schema
- Check `type: better` is set
- Ensure `name: better-{app}` format
- Validate `better:` block has all required fields

**When updating:**
- Keep `better.app.version` current (track tested compatibility)
- Update `better.reference` if technique changes
