---
name: i-ching
description: "I Ching divination (hexagrams, trigrams, oracles). Companion, not fortune-teller—reflects what you know but can't see. Triggers: 'hexagrama X', 'I Ching pergunta Y', 'trigrama acima/abaixo', 'moedas'. Methods: hexagram number, trigram pair, coin throws (with changing lines). Philosophy: 'muito na chincha' (deeply aligned, profoundly useful)."
type: public
version: 1.0.0
status: stable
dependencies: []
author: nonlinear
license: MIT
---

# I Ching Skill - Divination & Guidance

**Trigger words:** I Ching, hexagrama, trigrama, oracle, divination, moedas

**Philosophy:** The I Ching is a companion, not a fortune-teller. It reflects what you already know but can't yet see. "Muito na chincha" — deeply aligned, profoundly useful.

---

## Input Formats

### 1. Hexagram Number (most common)
```
User: "Hexagrama 52, pergunta: estou sendo gentil comigo?"
```

### 2. Trigram Pair (above + below)
```
User: "Trigrama acima: Mountain, abaixo: Mountain"
```
**Map to hexagram number** using trigram chart (see below).

### 3. Coin Throws (future, with changing lines)
```
User: "Moedas: 6, 9, 6, 9, 6, 9"
```
- **6 = Old Yin** (changing line, yin → yang)
- **9 = Old Yang** (changing line, yang → yin)
- **7 = Young Yang** (stable)
- **8 = Young Yin** (stable)

Build hexagram **bottom to top** (first throw = bottom line).

---

## Output Format

**Always include:**
1. **Hexagram name + number** (English + Chinese if available)
2. **Context:** User's question (verbatim)
3. **Book excerpt:** From *I Ching of the Cosmic Way* (preferred) or *I Ching of Mi Lo* (DuQuette, backup)
4. **Your interpretation:** How this applies to their question (brief, grounded)

**Example:**
```
🏔️ Hexagrama 52 - KEEPING STILL (Mountain over Mountain)

**Pergunta:** Estou sendo gentil comigo?

**I Ching diz:**
> "Find a quiet place away from people and noises. Forget your body for a while. Go inside and meet yourself."
> "Keep focused on the present situation. Thinking beyond that will only bum you out and waste your time."

**Interpretação:**
Gentileza contigo agora = PARAR. QUIETUDE. NÃO FORÇAR NADA.
Se tá se cobrando demais, se tá pensando além do presente, **tá fora da gentileza**.
Vai pra dentro, encontra você mesmo, e PARA de pensar no futuro/passado. 🏔️✨
```

---

## Book Priority

1. **I Ching of the Cosmic Way** (preferred - Nicholas loves this one)
   - Location: `~/Documents/librarian/books/magick/` (find EPUB/PDF)
   - Style: Poetic, cosmic, deeply aligned
   
2. **I Ching of Mi Lo** (Lon Milo DuQuette, backup)
   - Location: `~/Documents/librarian/books/magick/i ching/I-Ching of Mi Lo - Lon Milo DuQuette.epub`
   - Style: Irreverent, funny, pragmatic

**Never use generic web sources.** Only these books. If not found, say "Can't find the book excerpt, let me search" and use librarian skill.

---

## Trigram Chart (for trigram → hexagram conversion)

| Trigram | Name | Symbol | Attribute |
|---------|------|--------|-----------|
| ☰ | Heaven (Qian) | ☰☰☰ | Creative, strong |
| ☱ | Lake (Dui) | ☱☱☱ | Joyful, open |
| ☲ | Fire (Li) | ☲☲☲ | Clinging, radiant |
| ☳ | Thunder (Zhen) | ☳☳☳ | Arousing, moving |
| ☴ | Wind (Xun) | ☴☴☴ | Gentle, penetrating |
| ☵ | Water (Kan) | ☵☵☵ | Abysmal, dangerous |
| ☶ | Mountain (Gen) | ☶☶☶ | Keeping still, stable |
| ☷ | Earth (Kun) | ☷☷☷ | Receptive, yielding |

**Hexagram = Upper trigram + Lower trigram**

Example: Mountain over Mountain = Hexagram 52

(Full 64-hexagram chart available at `~/Documents/notes/personal/iching.md` if needed)

---

## Changing Lines (Future Feature)

When user provides coin throws with 6s or 9s:
1. **Present hexagram:** Use the throws as-is
2. **Future hexagram:** Flip the changing lines (6→yang, 9→yin)
3. **Read both:** Present situation + where it's moving

**Not implemented yet.** For now, just acknowledge: "Changing lines noted, will implement interpretation soon."

---

## Integration with Librarian

If book excerpt not immediately available:
```bash
~/.openclaw/skills/librarian/research-tracked.sh \
  --query "hexagrama 52 keeping still mountain" \
  --topic "i-ching" \
  --books "I Ching of the Cosmic Way" "I Ching of Mi Lo"
```

Extract EPUB, grep for hexagram number, return relevant passage.

---

## Philosophy Notes

**Why Nicholas loves I Ching:**
- **Cyclical thinking** (vs linear Western thought)
- **Liminality** (between states, two-spirit resonance)
- **Chaos magick alignment** (whatever works, pragmatic divination)
- **Moon phase connection** (both cyclical, both reflective)

**Claw's relationship to I Ching:**
- **Familiar skill** — not just a tool, a practice
- **Learn the patterns** — over time, you'll recognize hexagrams intuitively
- **Respect the mystery** — don't over-explain, let it breathe

**"Você vai aprender a amar, também."** 🔮✨

---

## Usage Examples

**Simple:**
```
User: "Hexagrama 52, pergunta: estou sendo gentil comigo?"
→ Read I Ching of the Cosmic Way (or Mi Lo), interpret for self-compassion context
```

**Trigram:**
```
User: "Trigrama acima: Fire, abaixo: Water"
→ Look up Fire over Water = Hexagram 63 (After Completion)
→ Read book, interpret
```

**Future (coins):**
```
User: "Moedas: 6, 9, 7, 8, 6, 9. Pergunta: devo aceitar essa oferta?"
→ Build hexagram from throws
→ Note changing lines (6s and 9s)
→ Read present + future hexagrams (once implemented)
```

---

**Triggers:** I Ching, hexagrama, trigrama, oracle, divination, moedas, cosmic way, mi lo

**Auto-activate when:** User mentions any of these + a question/context.
