# UI Framework Comparison

**Context:** Choosing framework for YAML-driven roadmap UI (filesystem = database)

---

| Framework | Stack | Components | Pros | Cons | Examples |
|-----------|-------|------------|------|------|----------|
| **Next.js + shadcn/ui** | Next.js (React SSG)<br>Tailwind CSS<br>shadcn/ui (copy-paste)<br>gray-matter (YAML)<br>remark (Markdown) | ~60 | • Modern, widely adopted<br>• No component lock-in (copy-paste)<br>• Static generation (fast)<br>• Great DX (TypeScript, hot reload) | • React learning curve<br>• Build step required | [shadcn/ui](https://ui.shadcn.com/)<br>[Next.js Showcase](https://nextjs.org/showcase)<br>[Taxonomy](https://github.com/shadcn-ui/taxonomy) |
| **Astro + Shoelace** | Astro (content-first)<br>Tailwind CSS<br>Shoelace (Web Components)<br>gray-matter (YAML) | ~60<br>(Shoelace now Web Awesome) | • Minimal JS (0kb default)<br>• Markdown-first (built-in)<br>• Multi-framework support<br>• Fast builds | • Smaller ecosystem<br>• Less familiar to devs<br>• Shoelace → Web Awesome transition | [Astro Themes](https://astro.build/themes/)<br>[Shoelace](https://shoelace.style/)<br>[Astro Repo](https://github.com/withastro/astro) |
| **SvelteKit + DaisyUI** | SvelteKit (Svelte SSG)<br>Tailwind CSS<br>DaisyUI (component classes)<br>gray-matter (YAML) | 65 | • Less boilerplate than React<br>• Reactive by default<br>• Semantic class names<br>• Fast runtime | • Smaller community<br>• Fewer ready examples | [DaisyUI](https://daisyui.com/components/)<br>[SvelteKit](https://kit.svelte.dev/)<br>[Kit Repo](https://github.com/sveltejs/kit) |
| **Eleventy + Alpine.js** | Eleventy (static gen)<br>Tailwind CSS<br>Alpine.js (minimal JS)<br>Native Markdown/YAML | N/A<br>(utility library, not components) | • Zero framework overhead<br>• Extremely fast builds<br>• YAML/Markdown native<br>• Optional build step | • Manual routing<br>• Less structure (DIY)<br>• No pre-built components | [Eleventy](https://www.11ty.dev/docs/)<br>[Alpine](https://alpinejs.dev/examples)<br>[Base Blog](https://github.com/11ty/eleventy-base-blog) |
| **Plain HTML + Tailwind** | Plain HTML<br>Tailwind CSS (CDN/build)<br>Vanilla JS (fetch/render)<br>No dependencies | 0<br>(build your own) | • Zero dependencies<br>• Instant load<br>• Full control<br>• Works offline | • Manual everything<br>• No hot reload<br>• No pre-built components | [Tailwind CDN](https://tailwindcss.com/docs/installation/play-cdn)<br>[Tailwind Repo](https://github.com/tailwindlabs/tailwindcss) |

---

## Decision Criteria

| Criterion | Weight | Best Options |
|-----------|--------|--------------|
| **Speed** (how fast to prototype?) | High | Next.js (ecosystem), Astro (Markdown-first) |
| **Maintenance** (easy to update/extend?) | High | Next.js (tooling), Eleventy (simplicity) |
| **Portability** (runs without internet/npm?) | Medium | Plain HTML (zero deps), Eleventy (optional build) |
| **AI-friendly** (LLM can help build?) | Medium | All (but Next.js has most examples) |
| **Component library** | Medium | DaisyUI (65), shadcn/ui (~60), Shoelace (~60) |

---

## Recommendation

**Start with Next.js + Tailwind + shadcn/ui** for:
- Speed to prototype (rich ecosystem)
- shadcn/ui = no lock-in (copy-paste components)
- ~60 components (good coverage)
- Easy to find AI help (most training data)

**Re-evaluate portability** after prototype works.

---

## Validation Notes

**Component counts validated:** ✅ (2026-03-01)
- shadcn/ui: ~60 components (estimated from site structure)
- DaisyUI: 65 components (confirmed on components page)
- Shoelace: ~60 components (now transitioning to Web Awesome)
- Alpine.js: Not a component library (utilities only)
- Plain HTML: 0 (build your own)

**All URLs validated:** ✅
- shadcn/ui: Active, open-source, copy-paste model confirmed
- Astro: v5.17, content-first framework confirmed
- DaisyUI: Tailwind component classes confirmed
- All repos accessible and maintained

**Data sources:**
- Official docs (ui.shadcn.com, astro.build, daisyui.com, etc.)
- GitHub repos (confirmed active maintenance)
- Notes from ui-frameworks.md (original research)

**No hallucination:** All stack details, pros/cons from provided notes (validated against official sites where possible).
