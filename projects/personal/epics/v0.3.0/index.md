# v0.3.0

### PM Tool Evaluation 🔬

| Tool | Open Source | Self-hosted | API | Task Granularity | Gantt | Modern? | Mobile | Roadmap Migration | Status |
|------|-------------|-------------|-----|------------------|-------|---------|--------|-------------------|--------|
| **[OpenProject](https://www.openproject.org/)** | ✅ GPL | ✅ Docker | ⭐⭐⭐⭐⭐ Full CRUD + webhooks | ✅ Custom fields | ✅ Built-in | ❌ Traditional UI | ⚠️ Ugly but exists | ✅ **Tested, API works** | ✅ **RECOMMENDED** |
| **[Plane](https://plane.so/)** | ✅ AGPL | ✅ Docker | ❌ Auth broken (self-hosted) | ❓ Untested | ✅ Built-in | ✅ Modern | 💰 Paid only | ❌ **Blocked (auth fails)** | ❌ **ELIMINATED** |
| **[Tuleap](https://www.tuleap.org/)** | ✅ GPL | ✅ Docker | ⭐⭐⭐⭐⭐ Extensive REST | ✅ Custom fields | ✅ Built-in | ❓ | ⏳ | ⏳ **Installing now** | ⏳ **TESTING NOW** |
| **[Focalboard](https://www.focalboard.com/)** | ✅ MIT | ✅ Installed | ⭐⭐⭐ REST API | ✅ Custom properties | ❌ No Gantt | ✅ Modern | ⏳ | ❌ **Session-based auth** | ⚠️ **Tested** |
| **[Taiga](https://taiga.io/)** | ✅ AGPL | ✅ Installed | ⭐⭐⭐⭐ REST + webhooks | ✅ Custom fields | ⚠️ Limited | ❌ Ugly UI | ⏳ | ⏳ | ⚠️ **Tested** |
| **[Leantime](https://leantime.io/)** | ✅ AGPL | ✅ Installed | ⭐⭐⭐⭐ REST API | ✅ Custom fields | ✅ Built-in | ⚠️ Mixed | ⏳ | ⏳ | ⏳ **Ready to test** |

**API gradation:**
- ⭐⭐⭐⭐⭐ = Full CRUD + webhooks + excellent docs
- ⭐⭐⭐⭐ = REST + webhooks
- ⭐⭐⭐ = Basic REST API
- ❌ = No API or broken

**Roadmap Migration = API test:**
- Migrate 1 epic via API (create project, tasks, custom fields)
- Success = API usable for automation
- Blocked = deal-breaker

**Kin's opinion:**

**OpenProject:**
- ✅ API perfeito (full CRUD, webhooks, docs excelentes)
- ✅ Gantt robusto (export PDF, Excel)
- ✅ Custom fields funcionam
- ❌ UI tradicional/pesada (não modern)
- ❌ Mobile feio (mas existe)
- **Veredito:** Funciona, mas não é bonito. API compensa.

**Plane:**
- ✅ UI linda (modern, responsive)
- ✅ Mobile bom (mas pago 💰)
- ❌ Auth quebrado (self-hosted inútil)
- ❌ API bloqueado (não testamos nada)
- **Veredito:** Bonito mas inacessível. Eliminado.

**Next:** Install Focalboard (Docker). Se API for boa + customizável, pode ganhar (modern UI + MIT license).

**Details:** [v0.3.0-pm-tool-evaluation.md](epic-notes/v0.3.0-pm-tool-evaluation.md)

---
