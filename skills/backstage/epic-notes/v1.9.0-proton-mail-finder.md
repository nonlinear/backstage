# v1.9.0 - proton-mail-finder

## Context Snapshot
- **Why this exists:** Proton Mail has powerful search syntax but no CLI/API access, need URL builders for quick access
- **Problem solved:** Build search URLs to jump directly to filtered results (from/to, subject, date, folder, advanced syntax)
- **Date:** 2026-02-15
- **Assumptions:** Proton Mail web UI, no official API, URL patterns stable

---

## Research Summary (2026-02-15)

### Proton Mail Search Capabilities

**Web UI Search (Official):**
- **Simple search:** Keywords in subject/body
- **Advanced search:** Filters (from, to, subject, date range, folder)
- **Content search:** Requires "Search message content" enabled (creates local encrypted index)

**Search Syntax (Metadata Only):**
- **Logical OR:** `|` (hello | world)
- **Logical NOT:** `!` or `–` (hello !world)
- **Phrase:** `"` ("hello world")
- **Proximity:** `~N` ("hello world"~10)
- **Start:** `^hello`
- **End:** `world$`
- **Wildcards:** `*` and `?` (hel* matches hello, help)

**Source:** https://proton.me/support/search

---

## URL Search Patterns

### Basic Pattern
```
https://mail.proton.me/u/0/all-mail#from=sender@email.com
```

**Structure:**
- Base: `https://mail.proton.me/u/0/`
- Folder: `all-mail`, `inbox`, `drafts`, `sent`, `archive`
- Parameters: `#from=`, `#to=`, `#subject=`, etc.

---

### From Sender
```
https://mail.proton.me/u/0/all-mail#from=sender@email.com
```

**Use case:** All emails from specific sender

---

### To Recipient
```
https://mail.proton.me/u/0/all-mail#to=recipient@email.com
```

**Use case:** All emails sent to specific recipient

---

### Subject Contains
```
https://mail.proton.me/u/0/all-mail#subject=invoice
```

**Use case:** All emails with "invoice" in subject

---

### Folder Filter
```
https://mail.proton.me/u/0/inbox#from=sender@email.com
https://mail.proton.me/u/0/sent#to=recipient@email.com
https://mail.proton.me/u/0/drafts
```

**Folders:**
- `inbox` - Inbox
- `sent` - Sent
- `drafts` - Drafts
- `archive` - Archive
- `spam` - Spam
- `trash` - Trash
- `all-mail` - All Mail (default)

---

### Date Range (Research Needed)
```
https://mail.proton.me/u/0/all-mail#from=sender&start=2024-01-01&end=2024-12-31
```

**Status:** Need to test (date parameter format unclear)

---

### Advanced Syntax (Combine Filters)
```
https://mail.proton.me/u/0/all-mail#from=sender@email.com&subject=invoice
```

**Combine:** Use `&` to chain multiple filters

---

### Wildcards (Research Needed)
```
https://mail.proton.me/u/0/all-mail#from=*@example.com
```

**Status:** Need to test (wildcard support in URLs unclear)

---

## Skill Implementation

### Script: `proton-mail-search.sh`

**Basic usage:**
```bash
# Search from sender
proton-mail-search --from sender@email.com

# Search to recipient
proton-mail-search --to recipient@email.com

# Search subject
proton-mail-search --subject invoice

# Combine filters
proton-mail-search --from sender@email.com --subject invoice --folder inbox

# Advanced syntax
proton-mail-search --query "hello | world"
```

**Output:**
```
Opening: https://mail.proton.me/u/0/inbox#from=sender@email.com&subject=invoice
```

---

### URL Builder Function

```bash
#!/bin/bash

build_proton_url() {
    local base="https://mail.proton.me/u/0"
    local folder="all-mail"
    local params=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --from)
                params="${params}from=$2&"
                shift 2
                ;;
            --to)
                params="${params}to=$2&"
                shift 2
                ;;
            --subject)
                params="${params}subject=$2&"
                shift 2
                ;;
            --folder)
                folder="$2"
                shift 2
                ;;
            --query)
                params="${params}q=$2&"
                shift 2
                ;;
            *)
                shift
                ;;
        esac
    done
    
    # Remove trailing &
    params="${params%&}"
    
    # Build final URL
    echo "${base}/${folder}#${params}"
}

# Open in browser
open "$(build_proton_url "$@")"
```

---

## Proton Pass Research

### Question: Does Proton Pass have similar search/URL patterns?

**Research needed:**
- Is there a Proton Pass web UI?
- Can we build URLs to search passwords/logins?
- Is there an API or CLI tool?

**Proton Pass official docs:**
- https://proton.me/pass
- https://proton.me/support/pass

**Expected answer:**
- Proton Pass likely has similar URL patterns (if web UI exists)
- May have CLI tool (check GitHub: https://github.com/ProtonMail)
- API unlikely (encryption model prevents server-side search)

**Action:**
- [ ] Check Proton Pass web UI (does it exist? URL patterns?)
- [ ] Search GitHub for Proton Pass CLI (community tools?)
- [ ] Document findings in epic-notes

---

## Examples

### Common Searches

**1. All emails from specific sender:**
```bash
proton-mail-search --from boss@company.com
```

**2. Invoices in inbox:**
```bash
proton-mail-search --subject invoice --folder inbox
```

**3. Sent emails to specific recipient:**
```bash
proton-mail-search --to client@example.com --folder sent
```

**4. Advanced: Multiple senders (OR):**
```bash
proton-mail-search --query "from:alice@example.com | from:bob@example.com"
```

**5. Exclude sender (NOT):**
```bash
proton-mail-search --query "subject:newsletter !from:spam@example.com"
```

**6. Phrase search:**
```bash
proton-mail-search --query '"urgent request"'
```

---

## Testing Checklist

- [ ] Test basic URL patterns (from, to, subject)
- [ ] Test folder filters (inbox, sent, drafts)
- [ ] Test date range (if supported)
- [ ] Test advanced syntax (OR, NOT, wildcards)
- [ ] Test URL encoding (spaces, special characters)
- [ ] Verify links open in Proton Mail web UI
- [ ] Test on different browsers (Chrome, Firefox, Safari)

---

## Open Questions

1. **Date range format:** What's the correct URL parameter? (`start=`, `from_date=`, etc.)
   - Need to test in Proton Mail web UI
   - Check browser network inspector (when filtering by date)

2. **Wildcard support:** Do wildcards work in URLs?
   - Test: `#from=*@example.com`
   - May only work in UI search bar, not URLs

3. **URL encoding:** Do spaces/special characters need encoding?
   - Test: `#subject=urgent request` vs `#subject=urgent%20request`

4. **Proton Pass:** Similar URL patterns? CLI tool? API?
   - Research Proton Pass web UI
   - Check GitHub for community tools

5. **Content search:** Can URLs trigger content search?
   - Requires "Search message content" enabled
   - May only work via UI search bar (encrypted local index)

---

## Success Criteria

- ✅ URL builder creates valid Proton Mail search links
- ✅ Basic filters work (from, to, subject, folder)
- ✅ Advanced syntax supported (OR, NOT, phrase, wildcards)
- ✅ Proton Pass research complete (URL patterns or CLI documented)
- ✅ Examples documented (common use cases)
- ✅ Testing complete (verified on all browsers)

---

## Related Skills
- find-books - Piracy search (similar URL builder pattern)
- system-detective - System diagnostics (Chrome Relay integration)

---

**Status:** 🔍 RESEARCH PHASE
**Next:** Test URL patterns in Proton Mail web UI, research Proton Pass web UI/CLI
