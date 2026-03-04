---
title: "BYOB Setup Guide"
type: probabilistic
description: "Instructions for Bring Your Own Backend setup"
---

```mermaid
graph TD
    Start[Clone Repository] --> Check{.git/info/exclude exists?}
    
    Check -->|No| Create[Create .git/info/exclude]
    Check -->|Yes| Verify[Verify Content]
    
    Create --> Content[Add exclusion patterns]
    Verify --> Content
    
    Content --> Books[books/**/*.epub<br/>books/**/*.pkl<br/>books/**/*.index<br/>books/metadata.json<br/>engine/models/]
    
    Books --> AddBooks[Add Your Books]
    AddBooks --> Organize[Run organize_books.py]
    Organize --> Index[Run indexer.py]
    Index --> GitCheck[Run gitignore-local.sh]
    
    GitCheck --> Pass{Check Passes?}
    Pass -->|No| Fix[Fix .git/info/exclude]
    Fix --> GitCheck
    Pass -->|Yes| Done[✅ Setup Complete<br/>Library stays private]
    
    style Done fill:#90EE90
    style Pass fill:#FFB6C1
```

**This is a personal library management system - NOT a collaborative repository.**

Each person runs their own instance with their own books. Nothing syncs to GitHub except code/scripts.

## For Contributors

**Want to contribute code?** Contact Nicholas first to discuss environment setup - don't submit PRs directly.

**Just want to use it?** Fork it, clone it, use it. Your books/data stay 100% local.

## Setup After Clone

**1. Verify `.git/info/exclude` exists:**

```bash
cat .git/info/exclude
```

Expected content:

```
books/**/*.epub
books/**/*.pkl
books/**/*.index
books/metadata.json
engine/models/
```

**Why:** Keeps your library private + enables autocomplete for book links.

**2. Add your books:**

```bash
python3.11 .github/engine/scripts/organize_books.py

python3.11 engine/scripts/indexer.py
```

**AI enforcement:**
- Check `gitignore-local.sh` passes (verifies .git/info/exclude)
- Remind user to run indexer after adding new books
