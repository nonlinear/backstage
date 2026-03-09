## Task: Decide on UI Framework

**Goal:** Choose modern framework for YAML-driven roadmap UI

**Constraints:**
- Filesystem = database (no containers, no fragile DBs)
- YAML + Markdown = source of truth
- Must be readable by: human, UI, AI
- Prefer lightweight (copy-paste > npm bloat)

**Options:**

### Option 1: Next.js + Tailwind + shadcn/ui
**Stack:**
- Next.js (React framework, file-based routing, SSG)
- Tailwind CSS (utility-first styling)
- shadcn/ui (copy-paste components, no npm dependency)
- gray-matter (YAML frontmatter parser)
- remark (Markdown renderer)

**Pros:**
- Modern, widely adopted
- shadcn = no component library lock-in
- Static site generation (fast, hostable anywhere)
- Great DX (TypeScript, hot reload)

**Cons:**
- React learning curve (if unfamiliar)
- Build step required

**Examples:**
- https://ui.shadcn.com/ (component library)
- https://nextjs.org/showcase (Next.js apps)
- https://github.com/shadcn-ui/taxonomy (full stack example)


### Option 2: Astro + Tailwind + Shoelace
**Stack:**
- Astro (content-focused framework, multi-framework)
- Tailwind CSS
- Shoelace (Web Components, framework-agnostic)
- gray-matter (YAML parser)

**Pros:**
- Minimal JS (ships 0kb by default)
- Markdown-first (built-in support)
- Multi-framework (can use React, Vue, Svelte components)
- Fast builds

**Cons:**
- Smaller ecosystem than Next.js
- Less familiar to most devs

**Examples:**
- https://astro.build/themes/ (starter themes)
- https://shoelace.style/ (Web Components)
- https://github.com/withastro/astro (official repo)


### Option 3: SvelteKit + Tailwind + DaisyUI
**Stack:**
- SvelteKit (Svelte framework, file-based routing)
- Tailwind CSS
- DaisyUI (Tailwind component classes)
- gray-matter (YAML parser)

**Pros:**
- Less boilerplate than React
- Reactive by default (no hooks)
- DaisyUI = semantic class names (easy theming)
- Fast runtime

**Cons:**
- Smaller community than React
- Fewer ready-made examples

**Examples:**
- https://daisyui.com/components/ (components)
- https://kit.svelte.dev/ (SvelteKit docs)
- https://github.com/sveltejs/kit (official repo)


### Option 4: Eleventy + Tailwind + Alpine.js
**Stack:**
- Eleventy (static site generator, zero-JS)
- Tailwind CSS
- Alpine.js (minimal JS for interactivity)
- Markdown + YAML native support

**Pros:**
- Zero framework (just HTML/CSS/JS)
- Extremely fast builds
- YAML/Markdown first-class citizens
- No build complexity (optional)

**Cons:**
- Manual routing (no framework magic)
- Less structure (more DIY)

**Examples:**
- https://www.11ty.dev/docs/ (Eleventy docs)
- https://alpinejs.dev/examples (Alpine examples)
- https://github.com/11ty/eleventy-base-blog (starter)


### Option 5: Plain HTML + Tailwind (Zero framework)
**Stack:**
- Plain HTML files
- Tailwind CSS (via CDN or build)
- Vanilla JS (fetch YAML, render)
- No build step (optional)

**Pros:**
- Zero dependencies
- Instant load (no framework overhead)
- Full control
- Works offline (no npm, no node_modules)

**Cons:**
- Manual everything (routing, state, rendering)
- No hot reload (unless custom setup)

**Examples:**
- https://tailwindcss.com/docs/installation/play-cdn (CDN setup)
- https://github.com/tailwindlabs/tailwindcss (official repo)


**Decision criteria:**
- **Speed:** How fast to prototype?
- **Maintenance:** How easy to update/extend?
- **Portability:** Can run without internet/npm?
- **AI-friendly:** Can LLM help build/modify?

**Recommendation:** Start with **Option 1 (Next.js + Tailwind + shadcn/ui)** for speed, then evaluate portability needs.


## Epic Note: Philosophy

**Backstage legível para:**
- **Humanos** - Folder-friendly, markdown, visual hierarchy
- **AIs** - YAML structure, semantic versioning, predictable paths
- **GUIs** - Structured data, relationships, status tracking

**Checks enforce policy:**
- Folder changes detected automatically
- Sync with others (templates, shared checks)
- Policy-as-code (declarative, versionable)

**If folders change, checks detect and adapt.**


## Epic Note: DRY Principle

**Redundância = mismatch, confusão, bugs.**

**Problema exemplo:**
- Folder name: `v2.0.0/`
- YAML field: `version: v2.0.0`

**Se folder = v2.0.0, por que repetir no YAML?**

**Consequências:**
- Folder diz uma coisa, YAML diz outra
- Rename folder → esquece atualizar YAML → inconsistência
- Checks precisam validar dois lugares
- Mais código, mais bugs

**Solução:**
- **Folder name = source of truth** (version inferida do path)
- YAML só tem o que NÃO está no folder (name, status, tier, tasks)

**Future refactor:** Remove `version` field do epic.yaml completamente.
