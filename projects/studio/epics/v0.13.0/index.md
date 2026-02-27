# v0.13.0 - Autocomplete (Keyboard App Research)

## Context Snapshot
- **Why this exists:** Understand iOS/Android keyboard extension capabilities before building autocomplete/foyer features
- **Problem solved:** Need delta analysis (what each platform can/cannot do) + cross-platform options
- **Date:** 2026-02-14
- **Assumptions:** Building text tools (autocomplete, foyer pre-send review), need privacy-first approach

---

## Research Summary (2026-02-14)

### iOS Keyboard Extensions

**Capabilities:**
- Replace system keyboard UI
- Text input/autocorrect
- Custom dictionaries
- Access typed text (requires "Allow Full Access")
- Emoji/stickers/GIFs

**Limitations:**
- **Cannot access secure fields** (passwords/credit cards)
- **Cannot make network requests without permission**
- **Cannot access iOS Text Replacements** (system substitutions)
- **Cannot persist data without permission**
- **No clipboard access without user action**
- **Manual enable required** (Settings → Keyboards → Add New Keyboard)

**Privacy Model:**
- "Allow Full Access" = can transmit data to external servers
- Secure fields (passwords, credit cards) = ALWAYS isolated (no third-party access)
- User must explicitly grant permissions

---

### Android IME (Input Method Editor)

**Capabilities:**
- Full keyboard replacement
- Text access
- Custom dictionaries
- Network requests (with permission)
- Voice/gesture input

**Limitations:**
- **No password field access** (secure fields isolated)
- **No system autocorrect modifications** (can't edit Android's built-in autocorrect)
- **Explicit selection required** (user must manually switch to custom keyboard)
- **Limited clipboard access** (requires explicit permission)

**Privacy Model:**
- User must enable keyboard in Settings
- Permissions required for network, clipboard, accessibility
- Secure fields always isolated

---

## Delta Analysis: iOS vs Android

| Feature | iOS Keyboard Extension | Android IME | Notes |
|---------|------------------------|-------------|-------|
| **Replace system keyboard** | ✅ Yes | ✅ Yes | Both can fully replace UI |
| **Access typed text** | ✅ Yes (with "Allow Full Access") | ✅ Yes | iOS requires explicit permission |
| **Custom dictionaries** | ✅ Yes | ✅ Yes | Both support |
| **Network requests** | ⚠️ Limited (needs permission) | ✅ Yes (with permission) | iOS more restrictive |
| **Secure field access** | ❌ No (passwords/cards) | ❌ No (passwords) | Both block for security |
| **Clipboard access** | ⚠️ Limited (user action) | ⚠️ Limited (permission) | Both require explicit grants |
| **Voice input** | ❌ No | ✅ Yes | Android only |
| **Gesture input** | ⚠️ Limited | ✅ Yes | Android more flexible |
| **System autocorrect mods** | ❌ No (cannot read/write) | ❌ No | Neither can modify OS autocorrect |
| **Emoji/stickers/GIFs** | ✅ Yes | ✅ Yes | Both support |
| **Persist data** | ⚠️ Limited (needs permission) | ✅ Yes (with permission) | iOS more restrictive |

**Key takeaway:** Android IME = more capabilities, iOS = more restrictions (privacy-focused)

---

## Cross-Platform Keyboard Apps

**Question:** Which keyboard apps work on BOTH iOS + Android?

**Popular cross-platform keyboards:**
1. **Gboard** (Google) - iOS + Android
2. **SwiftKey** (Microsoft) - iOS + Android
3. **Grammarly Keyboard** - iOS + Android
4. **Fleksy** - iOS + Android

**Research needed:**
- [ ] Test each keyboard (features available on both platforms)
- [ ] Identify capabilities delta (what works on Android but not iOS, vice versa)
- [ ] Privacy policies (do they transmit data? how?)

---

## Foyer Pre-Send Review

**Goal:** Pre-send message review (edit before sending to chat)

**Options:**

### Option 1: Share Extension (BEST)
- **How:** User selects text → Share → Foyer → Edit → Send
- **Pros:** User control, works on iOS + Android, no background permissions
- **Cons:** Extra step (not automatic), requires user action

### Option 2: Clipboard Monitor
- **How:** Monitor clipboard, detect copied text, prompt for review
- **Pros:** Automatic detection
- **Cons:** Privacy risk (always-on clipboard monitoring), iOS restrictions

### Option 3: Accessibility Service (Android Only)
- **How:** Intercept text before send via accessibility API
- **Pros:** Automatic, seamless
- **Cons:** Android-only, requires accessibility permission (risky), privacy concerns

**Recommendation:** Share extension (Option 1) = best balance (privacy + user control + cross-platform)

---

## iOS Text Replacements Integration

**Question:** Can third-party keyboards read/write iOS system substitutions?

**Answer:** ❌ **NO**

**Why:**
- iOS Text Replacements = system-level feature (Settings → General → Keyboard → Text Replacement)
- Third-party keyboards **cannot access** this database (privacy/security)
- Apps can create their own substitution systems, but cannot sync with iOS's

**Implication:**
- If building autocomplete, must maintain **parallel database** (separate from iOS Text Replacements)
- Users must manually duplicate entries (iOS replacements + app replacements)
- OR: Build migration tool (import iOS replacements once, maintain separately)

---

## Network Access Patterns

**iOS:**
- Requires "Allow Full Access" permission
- No network access in secure fields (passwords/cards)
- User must explicitly grant permission

**Android:**
- Requires INTERNET permission (declared in manifest)
- No network access in password fields
- User grants permission during install

**Best practice:**
- Minimize network requests (privacy-first)
- Only transmit when necessary (autocomplete suggestions, sync)
- Encrypt all data in transit
- Document what data is transmitted (transparency)

---

## Clipboard Access

**iOS:**
- No automatic clipboard access (user must paste manually)
- Keyboard can read clipboard when user pastes
- Cannot write to clipboard without user action

**Android:**
- Requires CLIPBOARD permission
- Can read/write clipboard (with permission)
- More flexible than iOS

**Implication:**
- Clipboard monitor (Option 2 for Foyer) = easier on Android, harder on iOS
- Share extension (Option 1) = works on both without clipboard permissions

---

## Voice/Gesture Input

**iOS:**
- Limited voice input (dictation via system keyboard only)
- No custom gesture input

**Android:**
- Full voice input (third-party keyboards can implement)
- Gesture input supported (swipe, draw, custom gestures)

**Implication:**
- Voice autocomplete = easier on Android
- iOS = must use system dictation (cannot customize)

---

## Next Steps

### Research Tasks
- [ ] Test Gboard, SwiftKey, Grammarly, Fleksy (iOS + Android)
- [ ] Document feature delta (what works on both vs platform-specific)
- [ ] Privacy policy review (what data do they transmit?)
- [ ] Find iOS Text Replacements export tool (for migration)

### Design Decisions
- [ ] Foyer implementation: Share extension (confirmed best option?)
- [ ] Autocomplete database: Separate from iOS (parallel DB or migration?)
- [ ] Network strategy: When to transmit? (sync, suggestions, backup)
- [ ] Privacy model: What data persists? What transmits? (document clearly)

### Prototype Tasks
- [ ] Build share extension prototype (iOS + Android)
- [ ] Test clipboard monitor (Android only, compare UX)
- [ ] Create autocomplete DB schema (local storage)
- [ ] Import iOS Text Replacements (one-time migration tool)

---

## Open Questions

1. **Cross-platform sync:** How to sync autocomplete DB across iOS + Android?
   - Option A: Cloud sync (iCloud + Google Drive)
   - Option B: Self-hosted server (NAS)
   - Option C: Manual export/import

2. **Privacy trade-offs:** Is "Allow Full Access" acceptable?
   - Pro: Full keyboard capabilities
   - Con: Can transmit data (must document clearly)

3. **Voice input:** Worth implementing on Android only?
   - Pro: Better UX (hands-free autocomplete)
   - Con: Platform fragmentation (iOS users miss feature)

4. **Gesture input:** Use case for autocomplete?
   - Example: Swipe to select suggestion, draw to trigger macro
   - Platform: Android only

---

## Related Epics
- v0.11.0 - Memory Architecture (data persistence, sync)
- v0.3.0 - Design Strategy (user research, UX decisions)

---

**Status:** 🔍 RESEARCH PHASE
**Next:** Delta analysis (test cross-platform keyboards), decide Foyer implementation
