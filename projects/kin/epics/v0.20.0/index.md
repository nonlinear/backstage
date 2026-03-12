# Foundations

**Goal:** OpenClaw Mobile - Flutter multi-platform app (iOS, Android, web, desktop).

**Status:** Planned (graduation candidate - external users, ships product, own repo)

---

## Problem

**OpenClaw only works on:**
- Web chat (desktop browser)
- Message channels (Telegram, Signal, etc.)

**Missing:**
- Native mobile app (iOS, Android)
- Desktop app (macOS, Windows, Linux standalone)
- Offline mode
- Better UX (native UI vs web chat)

---

## Goal

**OpenClaw everywhere:**
- iOS, Android (native apps)
- Web (PWA)
- Desktop (macOS, Windows, Linux)
- Single codebase (Flutter)

---

## Architecture

### Tech Stack
- **Flutter** (Dart) - Single codebase, all platforms
- **Gateway integration** (existing OpenClaw backend)
- **Local storage** (offline mode, caching)
- **Push notifications** (background alerts)

### Features
**Core:**
- Chat interface (like web chat, but native)
- Voice input (STT built-in)
- Voice output (TTS built-in)
- File attachments (photos, docs)

**Platform-specific:**
- iOS: Siri shortcuts, widgets, Apple Watch
- Android: Google Assistant, widgets, Wear OS
- Desktop: Menu bar/system tray, keyboard shortcuts

**Offline:**
- Cache recent conversations
- Queue messages (send when online)
- Local models (if hybrid infrastructure ready)

---

## Epic-to-Project Decision

**Graduation criteria:**

| Criteria | OpenClaw Mobile | Decision |
|----------|----------------|----------|
| External stakeholders? | ✅ Users (not just Nicholas) | YES |
| Ships something? | ✅ Apps (App Store, Play Store) | YES |
| Own revenue? | ✅ Potentially (donations, subscriptions) | YES |
| Needs git repo? | ✅ Separate from main workspace | YES |
| Multiple epics? | ✅ v1.0 (MVP), v1.1 (features), etc. | YES |

**Decision:** 🚀 **Graduate to project** when starting development

---

## Project Structure (When Graduated)

```
~/Documents/openclaw-mobile/
├── README.md
├── VISION.md
├── backstage/
│   ├── ROADMAP.md (v1.0.0 MVP, v1.1.0 iOS, v1.2.0 Android, etc.)
│   ├── POLICY.md
│   ├── HEALTH.md
│   └── epic-notes/
├── lib/ (Flutter code)
├── android/
├── ios/
├── web/
├── linux/
├── macos/
├── windows/
└── .git/
```

---

## User Stories

**Nicholas:**
- "I want to talk to Claw from my phone (not just web browser)"
- "I want voice commands while working out (hands-free)"
- "I want offline mode (subway, airplane)"

**External users (future):**
- "I want OpenClaw on my Android phone"
- "I don't want to self-host (cloud option?)"
- "I want better UX than web chat"

---

## Revenue Options (If Public)

1. **Donations** (Ko-fi, Patreon)
2. **Freemium** (basic free, advanced features paid)
3. **Cloud hosting** (pay for managed instance)
4. **Enterprise** (teams, custom deployment)

---

## Success Metrics

### Phase 1: MVP
- [ ] Single platform app working (iOS or Android)
- [ ] Can chat with OpenClaw gateway
- [ ] Voice input/output working

### Phase 2: Multi-Platform
- [ ] iOS + Android both working
- [ ] Web PWA working
- [ ] Desktop apps (macOS, Windows, Linux)

### Phase 3: Adoption
- [ ] 10+ external users (not just Nicholas)
- [ ] App Store / Play Store published
- [ ] Community feedback loop

---

## Next Steps

1. **Decide:** Start now OR backlog until main workspace stable?
2. **If start:** Graduate to project (follow graduation protocols)
3. **If backlog:** Document here, revisit later

---

## Why This Matters

**OpenClaw = personal AI assistant.**

**Assistant should be:**
- ✅ Always available (mobile)
- ✅ Hands-free (voice)
- ✅ Works offline (local cache)
- ✅ Native UX (not web chat)

**Mobile app = last mile for true ubiquity.** 🏴
