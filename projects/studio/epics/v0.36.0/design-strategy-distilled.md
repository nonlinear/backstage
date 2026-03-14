# 📌 Design Strategy → Personal ROADMAP (Destilado)

**Conversa longa:** ChatGPT estratégia de negócio, agentes, memory architecture

**Data:** 2026-02-21 (noite)

---

## Principais Insights

### 1. Memory Architecture (Night Protocol)
- **Memory = index, não storage** (synaptic pruning como feature)
- **Sleep = defragmentation** (replay → downscale → abstraction)
- **Working file → Synthesis → Decision artifact** (nunca manter working)
- **Systems that cannot forget cannot generalize**

### 2. No Paywall Model
- **Marketing + UX convergem** (sem separação comercial antes/depois paywall)
- **Feedback = stakeholder input** (não customer vs user)
- **Revenue streams:** Donations, grants, partnerships (não sales)

### 3. Design Studio Philosophy
- **Design-driven dev house** (full stack: develop + deploy + publish)
- **Not all prototypes become products** (experiments stay experiments, open source = others can pick up)
- **Tiers define product attention** (Tier 1 flagship → Tier 4 archived, products move up/down based on traction/resources)
- **Top of mind > lucro direto** (reverberação, reconhecimento, colaboração)
- **Low overhead** (Nicholas-only, apresentado como equipe)

### 4. Agent Hierarchy
- **Primeiro agente:** Business Strategist (mapeia company vision)
- **HR Bot:** Detecta skill gaps, sugere canonical books, cria novos agentes
- **Agentes:** Legal, Marketing, Growth, UX Research
- **Comunicação:** Drafts → Questions → Approval (Nicholas dá direção final)

### 5. VISION.md = Prefrontal Cortex Emulator
- **Não é documentação passiva** (é gating logic, runtime policy)
- **Inhibitory control** (devagar é rápido, measure twice cut once)
- **Bicameral vision** (Nicholas + Kin = depth perception via offset)

---

## O Que Foi Pra Epics Existentes

### v0.2.0 → Company Skeleton
- Agent swarm architecture
- Intake questions (strategic planning)
- Agent placeholders (Temporal orchestration)
- Migrate roadmaps + tasks to Open Project

### v0.7.0 → Finances
- (Nada adicionado - analytics foi pra v0.22.0)

---

## Novos Epics Criados

### v0.21.0 - Business Model for Commons
- Intake questionnaire, canonical books, HR bot
- No paywall model, legal structure, brand positioning
- Agent hierarchy (business strategist → spawns others)

### v0.22.0 - Feedback Loops
- Self-hosted analytics (PostHog/Matomo/Plausible)
- User testing, social media monitoring
- Growth strategist + UX research overlap

---

## Global Check Criado

**`checks/global/epic-notes-orphan-detection.md`**

- Detecta epic notes sem epic linkado
- Grep pattern: `grep -L "^\*\*Epic:\*\*" epic-notes/*.md`
- Output format: `📌 filename.md` (órfãos marcados)

---

## Epic Notes (Contexto, Não Tasks)

**v0.21.0 epic-notes:**
- No paywall philosophy
- Agent communication flows
- Canonical books (business strategy, commons, nonprofits)

**v0.22.0 epic-notes:**
- Marketing + UX convergence (no paywall implications)
- Analytics tooling (self-hosted, privacy-first)
- Feedback → roadmap lifecycle

**Órfão (Memory Architecture):**
- Night Protocol theory (sleep, pruning, consolidation)
- Hebbian learning (fire together wire together)
- VISION.md as runtime policy engine
- **Candidato:** Epic v0.23.0 Memory Metabolism (se quiser implementar Night Protocol)

---

## Canonical Books Mencionados

**Business Strategy:**
- Good Strategy/Bad Strategy (Rumelt)
- Strategy Safari (Mintzberg)
- Competitive Strategy (Porter)

**Commons & Nonprofits:**
- Managing the Non-Profit Organization (Drucker)
- Enterprising Nonprofits
- Designing and Planning Programs for Nonprofit and Government Organizations

**Design Studios:**
- The Design Studio Method
- Strategic Design Thinking

---

## Próximos Passos (Não Tasks, Direções)

1. **Answer intake questions** (business strategist onboarding)
2. **Index canonical books** (Librarian integration)
3. **Choose analytics tool** (PostHog vs Matomo vs Plausible)
4. **Define agent hierarchy** (which roles, which order)
5. **HR bot prototype** (skill gap detection)

---

**Criado:** 2026-02-21  
**Contexto:** Conversa longa sobre design studio, memory architecture, no paywall model  
**Status:** Destilado, pronto pra commit
