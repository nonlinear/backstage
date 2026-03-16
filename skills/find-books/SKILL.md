---
name: find-books
description: "Search foundational/seminal books on topics via Anna's Archive. Triggers: 'procura livros sobre X', 'find canonical works on Y', 'livros fundacionais/seminais'. Returns piracy links (fuck copyright hypocrisy). Use for: discovering authoritative sources, building reading lists, research foundation."
type: public
version: 1.0.0
status: stable
dependencies: []
author: nonlinear
license: MIT
---

# SKILL: find-books

**Purpose:** Search for foundational/seminal books on specific topics using Anna's Archive

**Trigger patterns:**
- "procura livros sobre..." / "find books about..."
- "livros fundacionais/seminais/canônicos"
- "canonical/seminal/foundational works on..."

**Terminology:**
- **Foundational** = establishes foundations
- **Seminal** = plants seeds of influential ideas  
- **Canonical** = definitive reference work (part of the canon)
- **Português:** fundacional, seminal, canônico

**What it does:**
1. Identify topic/keywords
2. Emphasize FOUNDATIONAL/SEMINAL works (not just any book)
3. Search Anna's Archive: https://annas-archive.li
4. Return results with links

---

## How to Use

### Manual Search (Anna's Archive)

**Base URL:** `https://annas-archive.li/search?q=QUERY`

**Query construction:**
- Topic keywords (e.g., "fawn response trauma")
- Add filters: `language:en` for English
- Add context: "seminal" or "foundational" to prioritize classics

**Example:**
```
https://annas-archive.li/search?q=fawn+response+trauma+language:en
```

### What Makes a Book "Foundational"?

- **Cited frequently** in academic work
- **Introduced key concepts** (coined terms, frameworks)
- **Widely recommended** by experts in field
- **Changed the field** (paradigm shift)

**Examples:**
- Psychology: *Attachment Theory* by Bowlby (foundational)
- Trauma: *The Body Keeps the Score* by van der Kolk (seminal)
- People-pleasing: *Codependent No More* by Beattie (classic)

---

## Search Strategy

1. **Identify core concepts** (e.g., "fawn response" → trauma, attachment, codependency)
2. **Search broad first** (e.g., "trauma response attachment")
3. **Look for authors cited most** (e.g., Bessel van der Kolk, Pete Walker)
4. **Refine with specific terms** (e.g., "fawn technique codependency")

---

## Output Format

**For each book:**
- Title + Author
- Why it's foundational (1 sentence)
- Anna's Archive link
- Alternative search if not found

**Example:**
```
📚 The Body Keeps the Score - Bessel van der Kolk
   Seminal work on trauma and body responses (includes fawn response context)
   https://annas-archive.li/search?q=body+keeps+score+van+der+kolk

📚 Complex PTSD: From Surviving to Thriving - Pete Walker
   Introduced "4 F's" (Fight/Flight/Freeze/Fawn) framework
   https://annas-archive.li/search?q=complex+ptsd+pete+walker
```

---

## Notes

- Anna's Archive = Z-Library mirror (extensive collection)
- If book not found → suggest alternative search terms
- Prioritize English unless specified otherwise
- **Foundational ≠ newest** - classics over recent pop-psych

---

## Triggers (for AGENTS.md)

Add to skill trigger table:
```
| "procura livros" / "find books" + topic | **STOP. Read find-books SKILL.md.** Search Anna's Archive for foundational works. | `~/.openclaw/skills/find-books/` |
```

---

## ROADMAP: v2.0 - Full Download Pipeline

**Status:** NOT IMPLEMENTED (design phase)

**Goal:** Automate entire flow from search → download → organize → index → test

---

### **Phase 1: Topic Navigation** ✅ (structure exists)

**Workflow:**
1. User: "procura livros sobre X"
2. Claw asks: "Onde quer guardar?"
   - List existing topics (`~/Documents/librarian/books/`)
   - Option to create new topic/subtopic
3. User chooses or creates (e.g., "psychology/trauma")

---

### **Phase 2: Book Selection** ✅ (works now)

**Workflow:**
1. Claw searches Anna's Archive
2. Numbers results (1-10)
3. Shows: title, author, year, formats, MD5 link
4. User: "Quero 1, 3, 5"

---

### **Phase 3: Slow Partner Download** 🆕

**DECISION:** Nicholas downloads manually, Claw organizes afterward.

**Why:**
- Anna's Archive likely has bot detection
- Chrome Relay = 1 page at a time (inefficient for multiple books)
- Countdown is simultaneous across tabs, but download is sequential
- Manual = faster + safer

**Workflow:**

#### 3.1: Claw opens all MD5 pages in Chrome tabs
```bash
# Open multiple tabs at once
browser open --targetUrl "https://annas-archive.li/md5/{md5_1}"
browser open --targetUrl "https://annas-archive.li/md5/{md5_2}"
browser open --targetUrl "https://annas-archive.li/md5/{md5_3}"
```

#### 3.2: Nicholas clicks "Slow Partner Server" on each tab
- Countdowns run simultaneously
- Nicholas downloads each when ready
- Downloads go to `~/Downloads/`

#### 3.3: Nicholas tells Claw when done
- "baixei tudo" / "downloads prontos"

#### 3.4: Claw organizes files

**Rename syntax:** Delete everything from first "-" onward (keep extension)

```python
# Before: Complex_PTSD-From_Surviving_to_Thriving-Pete_Walker.epub
# After:  Complex_PTSD.epub

import re
filename = re.sub(r'(-.*?)(\.\w+)$', r'\2', original_name)
```

**Move to topic folder:**
```bash
mv ~/Downloads/{filename} ~/Documents/librarian/books/{topic}/{subtopic}/
```

---

### **Phase 4: Index Library** 🆕

**Run:**
```bash
cd ~/Documents/librarian
python3 index.py
```

**What it does:**
- Scans `books/` recursively
- Generates `library.json` (file paths, metadata)
- Used by `research.py` for searches

---

### **Phase 5: Test Research** 🆕

**Sanity check:**
```bash
~/Documents/librarian/research-tracked.sh "test query about X"
```

**Expected:** New books appear in results

**Report to Nicholas:**
- ✅ Downloaded: N books
- ✅ Indexed: library updated
- ✅ Test query: works!

---

## Technical Questions (To Resolve)

### ✅ **Browser Strategy: Manual Download**

**Decision:** Chrome Relay opens tabs, Nicholas downloads, Claw organizes.

**Why:**
- **Bot detection:** Anna's Archive likely flags automated downloads
- **Chrome Relay limitation:** 1 page per relay connection (can't control multiple tabs)
- **Countdown optimization:** Open all tabs → Nicholas clicks all → countdowns run parallel
- **Safety:** Manual download = no risk of ban/block

---

### 🤔 **File Organization:**

**Challenges:**
- Downloaded filenames vary wildly
- Need consistent naming
- Need correct folder placement

**Solution:**
```python
# Scan ~/Downloads/ for recent files (last 5min?)
# Match against expected titles
# Rename (strip from "-" onward)
# Move to topic/subtopic folder
```

---

### 🤔 **Error Handling:**

- What if file not found in Downloads?
- What if filename doesn't match expected?
- What if file already exists in destination?
- What if Nicholas downloaded wrong format?

---

## Implementation: v2.0 - Hybrid Approach

**CHOSEN STRATEGY:** Claw opens tabs → Nicholas downloads → Claw organizes

### **Workflow:**

1. **Claw:** Search Anna's Archive, present numbered results
2. **Nicholas:** "Quero 1, 3, 5" + choose topic/subtopic
3. **Claw:** Open all MD5 pages in Chrome tabs (simultaneous)
4. **Nicholas:** Click "Slow Partner Server" on each → download when ready
5. **Nicholas:** "baixei tudo" / "downloads prontos"
6. **Claw:** 
   - Scan `~/Downloads/` for recent files
   - Match against expected titles
   - Rename (strip from "-" onward)
   - Move to `~/Documents/librarian/books/{topic}/{subtopic}/`
   - Run `index.py`
   - Test with `research-tracked.sh`
   - Report results

### **Why This Works:**
- ✅ No bot detection (Nicholas = human)
- ✅ Parallel countdowns (open all tabs at once)
- ✅ Sequential downloads (Nicholas controls pace)
- ✅ Claw handles tedious organization
- ✅ Safe + fast

---

## Next Steps

**Before implementation:**
1. Inspect Anna's Archive download flow (understand countdown mechanism)
2. Decide: Browser tool or Puppeteer?
3. Test with 1 book manually
4. Write detailed spec if needed

**Current status:** Design phase, not implemented
