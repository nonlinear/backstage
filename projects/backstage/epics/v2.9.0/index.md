# v2.9.0 - Backstage as Protocol

## Goal

Backstage as protocol for communication between nodes (people, companies, agents).

## Key Questions

### 1. Discovery
**Quem chamo? Como chamo?**
- Node discovery (broadcast? registry? manual?)
- Addressing (how to reach a node)
- Identity (who is this node?)

### 2. Multi-Party Projects
**Projeto usando duas empresas, como fica?**
- Shared roadmap visibility
- Permission boundaries (what each sees)
- Coordination (who does what)
- Conflict resolution (overlapping work)

### 3. Handshake Protocol
**Ler history através de protocol, mostrar o que podemos fazer juntos**
- Read node's capabilities (what skills/checks they have)
- Read node's history (what they've done, redacted sensitive)
- Propose collaboration (match capabilities to needs)
- Establish trust (verify identity, reputation)

## Components

**Protocol layers:**
1. **Discovery** - Find nodes (broadcast, registry)
2. **Handshake** - Establish connection (identity, capabilities)
3. **History** - Read past work (audit trail, redacted)
4. **Capabilities** - What can we do together (skills, checks, resources)
5. **Coordination** - Shared roadmap (who does what, when)
6. **Trust** - Verification (identity, reputation, security)

## Use Cases

**Example 1: Freelancer + Company**
- Freelancer has backstage (personal projects)
- Company has backstage (company projects)
- Handshake: Company sees freelancer capabilities
- Coordination: Shared epic (company assigns tasks, freelancer executes)

**Example 2: Two Companies Collaborate**
- Company A has skill X, Company B needs X
- Handshake: Match capability to need
- Shared roadmap: Both see epic progress
- Boundaries: Each sees only their scope

**Example 3: Agent Swarm**
- Agent nodes discover each other
- Share capabilities (who has which skills)
- Coordinate work (delegate tasks across nodes)
- Trust: Verify agent identity

## Philosophy

**Backstage filesystem = API:**
- Read epics/tasks → discover capabilities
- Write tasks → delegate work
- Protocol = structured access to filesystem
- Permissions = what each node sees/edits

**Decentralized coordination:**
- No central authority (peer-to-peer)
- Trust through verification (not blind faith)
- Shared visibility (redacted appropriately)

## Status

Planning (depends on v2.0 foundation).
