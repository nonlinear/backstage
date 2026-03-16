# Epic v0.11.0: Memory Architecture

**Research-driven memory system based on Reddit tutorial + Librarian findings**

See `epic.yaml` for full implementation plan.

**Status:** backlog (needs implementation)

**Key components:**
- 3-layer structure (Brain/Memory/Reference)
- 5 triggers (recover, checkpoint, trim, recalibrate, checkboard)
- Hybrid RAG retrieval (vector + BM25)
- Token budget enforcement
- Write discipline protocol

**Current state (2026-03-15):**
- ✅ Daily files (memory/YYYY-MM-DD.md)
- ✅ MEMORY.md as index
- ✅ Session startup reads memory
- ⏳ Reference layer (needs creation)
- ⏳ Five triggers (need implementation as skills)
- ⏳ Hybrid RAG (needs configuration)
