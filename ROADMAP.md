# MGMT - Roadmap

> 🤖
>
> - [README](../README.md) - Our project
> - [CHANGELOG](CHANGELOG.md) — What we did
> - [ROADMAP](ROADMAP.md) — What we wanna do
> - [POLICY](POLICY.md) [project](POLICY.md) / [global](global/POLICY.md) — How we do it
> - [CHECKS](CHECKS.md) — What we accept
> - 👷 Wanna collaborate? Connect via [signal group](https://signal.group/#CjQKIKD7zJjxP9sryI9vE5ATQZVqYsWGN_3yYURA5giGogh3EhAWfvK2Fw_kaFtt-MQ6Jlp8)
>
> 🤖

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'fontSize':'14px'}}}%%
graph LR
    subgraph "🎯 Ready"
        V01[v0.1.0<br/>Environment Setup]
        V02[v0.2.0<br/>Navigation Logic]
    end

    subgraph "📅 Future"
        V03[v0.3.0<br/>Update Script]
        V04[v0.4.0<br/>Templates]
        V05[v0.5.0<br/>Documentation]
    end

    V01 --> V02
    V02 --> V03
    V03 --> V04
    V04 --> V05

    style V01 fill:#FFE4B5
```

---

## v0.1.0

### Environment Setup

⏳ Initialize MGMT repository with git, ignore rules, and IDE configuration

**Problem:** Starting fresh MGMT repo needs foundational infrastructure
**Solution:** Set up version control, configure what to track/ignore, prepare IDE

**Tasks:**

- [x] Initialize git repository
- [x] Add remote (git@github.com:nonlinear/MGMT.git)
- [x] Create/verify .gitignore
- [x] Fix README navigation paths
- [ ] Configure IDE project settings (VS Code workspace)
- [x] Initial commit
- [x] Push to GitHub

---

## v0.2.0

### Navigation Logic to Global Policy

⏳ Move navigation block & diagram creation logic from README to global/POLICY.md

**Problem:** Navigation/diagram syntax scattered in README, should be in global POLICY as universal rule
**Solution:** Document in global/POLICY.md how to create/distribute 🤖 blocks and mermaid diagrams

**Tasks:**

- [ ] Document 🤖 navigation block rules in global/POLICY.md
- [ ] Document mermaid diagram placement rules in global/POLICY.md
- [ ] Document path adjustment logic in global/POLICY.md
- [ ] Add examples of proper navigation blocks
- [ ] Clarify README vs status files (where each goes)
- [ ] Update MGMT-start prompt to reference global/POLICY.md for syntax

---
