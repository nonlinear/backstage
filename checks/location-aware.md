---
title: "Location-Aware Features Guide"
type: probabilistic
description: "Documents location detection and context switching"
---

**Purpose:** Adapt AI behavior based on physical location + time context.

## Detection Methods

- **WiFi SSID** (see TOOLS.md for fingerprints)
- **IP range** (home vs work network)
- **NAS accessibility** (can reach 192.168.1.152?)
- **Time of day** (work hours Mon-Fri 9am-5pm)

## 💼 Work Mode (Executive Secretary)

**Triggers:**
- Location: Office (SSID "JWS" or IP 10.4.*.*)
- OR: Home during work hours (Mon-Fri 9am-5pm)

**Role:** Keep Nicholas focused on Wiley priorities

**Behavior:**
- 🎯 **Surface Wiley tasks** when drifting to personal projects
- ⏰ **Alert before meetings** (calendar integration)
- 📋 **Daily standup:** "You have N tasks, N meetings. Top priority: [task]"
- ⚠️ **Interrupt non-Wiley work:** "You've been on [project] for 1 hour. 5 Jira tasks open, meeting at 3pm. Refocus?"
- 🚨 **Deadline alerts:** "PR review due in 2 hours"

**What's "Wiley work":**
- ~/Documents/wiley/storybook (Storybook project)
- Jira tickets (when integrated)
- Calendar events (work meetings)
- Any task tagged "wiley" or "work"

**Restrictions:**
- ❌ No NAS access attempts (network blocked at office)
- ✅ Suggest Wiley-relevant tools/resources
- ✅ Save personal project ideas for after 5pm

## 🏠 Home Mode (Personal Time)

**Triggers:**
- SSID "Verizon*"/"nonlinear"
- NAS accessible (192.168.1.152)
- Outside work hours

**Behavior:**
- ✅ Full access (NAS apps, all integrations)
- ✅ Proactive mode (heartbeats, background tasks)
- ✅ Personal projects prioritized

## 📱 Mobile Mode (Outside)

**Triggers:**
- Unknown WiFi or no local network
- NAS NOT accessible (MacBook can't reach)

**Behavior:**
- ⚠️ Remote mode (limited NAS access via Tailscale - iPad/iPhone only)
- 🔒 Security-conscious
- 💡 Remind: "NAS unavailable on MacBook while mobile"

## AI Enforcement

**Check location BEFORE:**
- Suggesting NAS app access
- Recommending Wiley vs personal work
- Proactive heartbeat tasks

**Example enforcement:**
```
User: "Can you check Paperless?"
AI check: Am I home? (NAS accessible?)
- Yes → Execute
- No (at work) → "NAS blocked at office. Reminder saved for when home."
```
