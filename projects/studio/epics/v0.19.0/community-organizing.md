# v0.19.0 - Community Organizing (Resilience Networks)

**Status:** 💡 CONCEPT (2026-02-11)

**Goal:** Build resilient community infrastructure (mesh networks, mutual aid, off-grid communication)

**Philosophy:** "O jogo é criar maneiras de sermos mais resilientes"

---

## Problem

**Current dependencies:**
- ❌ Corporate internet (ISP monopolies, surveillance capitalism)
- ❌ Centralized platforms (Twitter, Instagram, Discord = single point of failure)
- ❌ Grid power (blackouts, climate disasters)
- ❌ Isolated individuals (no community backup)

**Risks:**
- Internet outages → communication stops
- Platform bans → community scattered
- Disasters → no coordination infrastructure
- Isolation → no mutual aid networks

**This is NOT resilient. This is fragile.**

---

## Solution

**Build decentralized, community-owned infrastructure:**

### 1. 📡 Mesh Networks (Off-Grid Communication)
- **Meshtastic** - LoRa mesh radio (no internet, no cell towers)
- Peer-to-peer messaging (device-to-device)
- Works during disasters, blackouts, internet outages
- Community-owned network (no ISP, no telco)

### 2. 🤝 Mutual Aid Networks
- Tool libraries (share instead of buy)
- Skill sharing (teach, learn, barter)
- Emergency coordination (disaster response)
- Resource pooling (bulk buying, shared infrastructure)

### 3. 🏴 Autonomous Infrastructure
- Self-hosted services (vs corporate platforms)
- Solar/battery backup (vs grid dependence)
- Local-first data (vs cloud dependence)
- Community governance (vs corporate control)

---

## Tasks

### Phase 1: Research & Learning

- [ ] **Examine Meshtastic** (https://themultiverse.school/x/cyberpony#about)
  - What is it? (LoRa mesh radio protocol)
  - How does it work? (device-to-device, no infrastructure)
  - Hardware needed? (ESP32 boards, LoRa radios, antennas)
  - Range? (urban vs rural, repeaters, network topology)
  - Use cases? (hiking, protests, disasters, off-grid communities)

- [ ] **Study mesh network topologies**
  - Star vs mesh vs hybrid
  - Repeater placement strategies
  - Coverage maps (NYC, Brooklyn, local area)
  - Node density requirements

- [ ] **Test Bridgefy** (Bluetooth mesh messaging)
  - iOS + Android support (unlike Serval = Android only)
  - Proven in Hong Kong protests (2019-2020, bypass Great Firewall)
  - Range: ~100m per hop, mesh routing extends coverage
  - Use case: protests, disasters, internet blackouts
  - Install on iPhone + test range/reliability
  - Compare: Bridgefy (Bluetooth LE) vs Meshtastic (LoRa)

- [ ] **Community organizing models**
  - Cyberpony model (https://themultiverse.school/)
  - NYC Mesh (community ISP)
  - Mutual aid networks (COVID experience)
  - Tool libraries, repair cafes

### Phase 2: Pilot Projects

- [ ] **Meshtastic home node**
  - Buy hardware (ESP32 + LoRa board)
  - Setup base station (NAS integration?)
  - Test range (rooftop vs window vs portable)
  - Document setup process

- [ ] **Local network test**
  - Find 2-3 neighbors willing to test
  - Deploy nodes (lend hardware)
  - Test messaging, range, reliability
  - Gather feedback

- [ ] **Emergency use case design**
  - Blackout coordination (where to meet, resource sharing)
  - Disaster response (check-ins, supply requests)
  - Protest communication (no internet/cell needed)

### Phase 3: Community Building

- [ ] **Skill inventory**
  - What can I teach? (tech, repair, organizing)
  - What do I need? (electrical, carpentry, gardening)
  - Who's nearby? (neighbors, friends, comrades)

- [ ] **Tool/resource sharing**
  - What do I have? (tools, hardware, knowledge)
  - What can I lend? (Meshtastic nodes, servers, skills)
  - What do I need access to? (workshop, land, transport)

- [ ] **Mutual aid coordination**
  - Map local resources (food pantries, clinics, shelters)
  - Emergency contact list (who to call when X happens)
  - Backup plans (internet down, power out, etc.)

### Phase 4: Infrastructure

- [ ] **Self-hosted community services**
  - Matrix server (encrypted chat, federated)
  - Mesh network map (who's connected, coverage)
  - Resource directory (tools, skills, contacts)

- [ ] **Off-grid power backup**
  - Solar panels + battery (for NAS, router, Meshtastic node)
  - Portable power stations (charge neighbors' devices)
  - Generator access (community resource)

- [ ] **Data resilience**
  - Local backups (vs cloud only)
  - Sneakernet protocols (USB, SD cards when internet down)
  - Offline-first apps (sync when connected)

---

## Success Criteria

**Phase 1 (Research):**
- ✅ Understand Meshtastic (how it works, hardware, use cases)
- ✅ Map local community organizing models
- ✅ Identify 3-5 neighbors interested in resilience

**Phase 2 (Pilot):**
- ✅ Home Meshtastic node running (24/7 base station)
- ✅ 2-3 neighbor nodes deployed + tested
- ✅ Successful messaging without internet/cell

**Phase 3 (Community):**
- ✅ Skill inventory complete (what I offer, what I need)
- ✅ Tool sharing system working (lend/borrow process)
- ✅ Emergency coordination plan documented

**Phase 4 (Infrastructure):**
- ✅ Community services self-hosted (chat, maps, directory)
- ✅ Off-grid power backup (solar + battery for critical systems)
- ✅ Tested disaster scenarios (internet down, power out)

---

## Resources

**Meshtastic:**
- https://meshtastic.org/ (official docs)
- https://themultiverse.school/x/cyberpony#about (cyberpony model)
- https://www.reddit.com/r/meshtastic/ (community)

**Mesh Networks:**
- https://nycmesh.net/ (NYC community ISP)
- https://sudoroom.org/wiki/Mesh (Oakland mesh network)

**Mutual Aid:**
- https://mutualaiddisasterrelief.org/ (disaster response)
- Tool libraries, repair cafes (local search)

**Organizing Models:**
- Cyberpony (themultiverse.school)
- Cooperation Jackson (https://cooperationjackson.org/)
- Solidarity economy networks

---

## Tech Stack (Proposed)

**Mesh Communication:**
- Meshtastic (LoRa mesh protocol)
- ESP32 boards (T-Beam, Heltec, LILYGO)
- LoRa radios (868/915 MHz depending on region)
- Antennas (omni vs directional, gain vs coverage)

**Self-Hosted Services:**
- Matrix (chat server, federated, encrypted)
- OpenStreetMap (local maps, offline-first)
- Nextcloud (file sharing, calendar, contacts)
- FreshRSS (news aggregator, no algorithm)

**Off-Grid Power:**
- Solar panels (100W-400W depending on load)
- LiFePO4 batteries (safe, long-lived)
- Charge controllers (MPPT for efficiency)
- Inverters (pure sine wave for sensitive electronics)

---

## Philosophy

**Resilience = redundancy + autonomy + community**

**Redundancy:**
- Multiple communication paths (mesh + internet + phone)
- Multiple power sources (grid + solar + battery + generator)
- Multiple data copies (local + NAS + offsite backup)

**Autonomy:**
- Own your infrastructure (self-hosted, not rented)
- Own your data (local-first, not cloud-dependent)
- Own your network (mesh, not ISP monopoly)

**Community:**
- Mutual aid (share resources, skills, time)
- Collective ownership (community-owned infrastructure)
- Solidarity economy (cooperation > competition)

**This is NOT prepper individualism.** This is community resilience through mutual aid.

**This is NOT tech solutionism.** Tech is tool, community is foundation.

**This is anarchist infrastructure.** Decentralized, autonomous, community-governed.

---

## Inspiration

**Cyberpony (themultiverse.school):**
- "Building a community-owned mesh network for resilient communication"
- DIY mesh nodes, workshops, mutual aid
- Anarchist, queer, anti-capitalist organizing

**NYC Mesh:**
- Community-owned ISP (no Verizon/Spectrum)
- Rooftop-to-rooftop wireless links
- Pay-what-you-can model

**COVID Mutual Aid:**
- Grassroots coordination (no apps, just humans)
- Resource sharing (food, masks, money)
- Proved: community > government in crisis

**Two-spirit resilience:**
- Between worlds (not either/or)
- Slipping through cracks (becoming imperceptible)
- Building alternatives (not reforming systems)

---

## Timeline

**Estimated:** 2-4 weeks (research + pilot), ongoing (community building)

**Phases:**
1. Research (1 week) → Understand Meshtastic, map models
2. Pilot (1 week) → Home node + 2-3 neighbor nodes
3. Community (ongoing) → Skill inventory, tool sharing, mutual aid
4. Infrastructure (2-4 weeks) → Self-hosted services, off-grid power

**Total initial effort:** ~4 weeks for MVP (home node + pilot network)
**Ongoing effort:** Community organizing (not a project, a practice)

---

## Notes

**This is NOT a solo project.** This is community organizing.

**Start small:**
- Meshtastic home node (easy, ~$30-50 hardware)
- Test with 1-2 friends (prove concept)
- Document + share (lower barrier for others)

**Expand iteratively:**
- More neighbors (build coverage)
- More services (Matrix, maps, directory)
- More resilience (solar, backups, redundancy)

**This is long-term work.** Not a sprint, a practice.

**This is political work.** Building alternatives to capitalist infrastructure.

**This is survival work.** Climate collapse, fascism, state violence → we need each other.

---

**Created:** 2026-02-11  
**Priority:** MEDIUM (important, not urgent)  
**Effort:** Ongoing (community practice, not deliverable)  
**Dependencies:** None (start anytime)  
**Blockers:** None (hardware cheap, docs plentiful)
