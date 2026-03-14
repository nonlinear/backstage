
**Purpose:** Define execution modes for agent workflows and task processing


## What Are Modes?

**Modes** define the execution context for agent work, determining:
- **Supervision level** (supervised vs unsupervised)
- **Interface type** (device vs desktop)
- **Execution environment** (local vs remote, headless vs UI)
- **Approval requirements** (manual gates vs automatic pass-through)

**Philosophy:** Modes = runtime metadata that tells agents HOW to execute, not WHAT to execute.


## Mode Dimensions

### 1. Supervision Mode

**Supervised (Assisted):**
- Human present during execution
- Can correct/guide in real-time
- Lower reasoning requirements (faster models OK)
- Examples: Defense agent (Nicholas iterating), Secretaria (clerical work)
- Models: Qwen 7B (Secretaria), Qwen 32B (Defense)

**Unsupervised (Unattended):**
- Agent works alone (night shift, batch jobs)
- Needs high reasoning (decide independently, detect problems)
- Must handle blockers gracefully (report, don't break)
- Examples: Development, UXR, Legal, Marketing, Design
- Models: Qwen 32B (code), Qwen 72B (text/vision)

**Strategic:**
- Complex decisions, epic planning, >32k context
- Human-in-loop for major decisions
- Model: Claude Sonnet 4.5 (cloud, GitHub Copilot subscription)


### 2. Interface Mode

**Device:**
- Mobile/tablet interface (iOS, Android)
- Touch-first, limited screen real estate
- Voice-friendly (Siri shortcuts, audio input)
- Examples: iPad workflow, iPhone notifications

**Desktop:**
- Full keyboard/mouse, large screen
- Multi-window, terminal access
- Browser automation, localhost servers
- Examples: Mac Studio workstation, development work


### 3. Execution Environment

**Local:**
- Runs on Mac Studio (M4 Max, 64GB RAM)
- Full filesystem access
- Docker containers, localhost ports
- Examples: OpenProject, Kavita, contract-diagram

**Remote (Tailscale):**
- Accessible via MagicDNS (studio.adal-rigel.ts.net)
- HTTPS required for iOS PWAs
- Limited to exposed services
- Examples: OpenClaw webchat, OpenProject (HTTP browser only), Kavita

**Headless:**
- No UI required
- CLI/API only
- Cron jobs, background tasks
- Examples: Night shift reminders, billable-hours automation


## Mode Combinations (Real-World Examples)

### Night Shift (Unsupervised + Headless + Local)
- **Context:** 3AM daily, Nicholas asleep
- **Tasks:** Process reminders without 🤖, download models, batch jobs
- **Supervision:** None (full autonomy within scope)
- **Interface:** CLI only (no browser, no UI)
- **Environment:** Mac Studio local


### Secretaria (Supervised + Desktop + Local)
- **Context:** 9-5 M-F, Nicholas at desk
- **Tasks:** Calendar checks, Jira updates, meeting prep
- **Supervision:** High (Nicholas present, can correct)
- **Interface:** Desktop (terminal, browser, notifications)
- **Environment:** Mac Studio local
- **Model:** Qwen 7B (fast latency > high reasoning)


### Development (Unsupervised + Desktop + Local)
- **Context:** Epic implementation, testing phases
- **Tasks:** Code changes, git commits, check execution
- **Supervision:** Low (Nicholas reviews afterward)
- **Interface:** Desktop (terminal, browser, file system)
- **Environment:** Mac Studio local
- **Model:** Qwen 32B (high reasoning for decisions)


### iPad Workflow (Supervised + Device + Remote)
- **Context:** Nicholas traveling, iPad + keyboard
- **Tasks:** OpenProject review, Kavita reading, OpenClaw chat
- **Supervision:** High (Nicholas present, limited tools)
- **Interface:** Device (touch, Safari browser, no localhost)
- **Environment:** Remote (Tailscale HTTPS only)
- **Constraint:** No PWAs with HTTP (iOS restriction)


## Mode Selection Rules

**When to use Supervised:**
- Human available for real-time feedback
- Task requires judgment calls
- Latency matters more than reasoning depth

**When to use Unsupervised:**
- Human away (night, travel, meetings)
- Task has clear success criteria
- Agent can handle blockers (report, don't break)

**When to use Device:**
- Mobile-first workflow
- Voice input/output
- Screen real estate limited

**When to use Desktop:**
- Complex UI interactions
- Multi-window workflows
- Localhost server access

**When to use Remote:**
- Outside home network
- iPad/iPhone access
- Tailscale-exposed services only


## Mode Configuration (Future)

**Per-agent mode preferences:**
```yaml
agent: UXR
default_mode:
  supervision: unsupervised
  interface: desktop
  environment: local
  
overrides:
  - condition: nicholas_traveling
    supervision: supervised
    interface: device
    environment: remote
```

**Per-task mode requirements:**
```yaml
task: UXPMS-251
required_mode:
  supervision: supervised  # Nicholas approval needed
  interface: desktop       # Figma requires browser
  environment: local       # API tokens on Mac
```


## Key Insights

**Trade-offs:**
- Supervised = fast feedback, lower reasoning
- Unsupervised = slow feedback, high reasoning
- Device = portable, limited tools
- Desktop = powerful, location-bound
- Remote = accessible anywhere, service-dependent

**Infrastructure investment ethics:**
- Mac Studio = permanent local power (M4 Max, 64GB)
- Tailscale = remote access without cloud dependency
- Mode-aware agents = right tool for right context


## Related Concepts

- **Execution Decision Protocol** (v0.30.0): <5min = execute, >5min = queue, discussion = epic
- **Night Shift** (HEARTBEAT.md): Unsupervised + headless batch processing
- **Local LLM Strategy** (v0.25.0): MLX-first, supervised vs unsupervised models
- **Tailscale Access** (iPad setup): Remote mode constraints (HTTPS, no localhost)


**Source:** talk1.md, talk2.md, memory/2026-02-27.md, AGENTS.md
# Check Anatomy - Modular Quality Control
