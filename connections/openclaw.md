# OpenClaw - Control UI Remote Access

**Last updated:** 2026-03-09 13:37 EDT

---

## ✅ WORKING CONFIG (iPad/iPhone via Tailscale)

**This configuration works. Don't change unless you know why.**

### Complete Setup (One-Time)

**1. Enable Tailscale Serve Mode:**

```bash
openclaw config set gateway.tailscale.mode serve
openclaw config set gateway.auth.allowTailscale true
```

**2. Add Tailscale URL to allowed origins:**

```bash
openclaw config set gateway.controlUi.allowedOrigins '["https://studio.adal-rigel.ts.net:18789"]' --strict-json
```

**3. Gateway will auto-restart (LaunchAgent)**

Wait ~10 seconds for restart to complete.

**4. Access from iPad:**

Open Safari: **https://studio.adal-rigel.ts.net:18789**

**5. Approve Device Pairing (First Time Only):**

On Mac:
```bash
openclaw devices list
openclaw devices approve <requestId>
```

**6. Done!**

iPad can now access Control UI without token (Tailscale identity auth).

---

## Why This Config Works

**`gateway.tailscale.mode: serve`**
- Enables Tailscale Serve integration
- Control UI accessible via MagicDNS

**`gateway.auth.allowTailscale: true`**
- Uses Tailscale identity headers for auth
- No token required (Tailscale verifies identity)
- Simpler than token management

**`gateway.controlUi.allowedOrigins`**
- Allows browser connections from Tailscale URL
- Security: blocks unauthorized origins

**Device pairing:**
- One-time security approval
- Prevents unauthorized access even with Tailscale
- Device remembered after approval

---

## What DOESN'T Work (Lessons Learned)

❌ **Token via URL hash (`#token=`):**
- Token stripped from URL immediately
- Can't save as webapp bookmark (token disappears)
- Chicken-and-egg: need token to save token

❌ **`allowTailscale: false` + token:**
- Token doesn't persist between sessions
- Must re-enter every time

❌ **`gateway.tailscale.mode: off`:**
- Tailscale identity headers not available
- Must use token (which doesn't persist)

✅ **Solution:** Serve mode + allowTailscale = tokenless auth

---

## Device Pairing Notes

**When accessing from iPad for first time:**

1. Open Safari: https://studio.adal-rigel.ts.net:18789
2. If you see "disconnected (1008): pairing required" - this is NORMAL
3. On Mac, list pending requests:
   ```bash
   openclaw devices list
   ```
4. Approve the iPad request:
   ```bash
   openclaw devices approve <requestId>
   ```

**Notes:**
- Local connections (localhost) are auto-approved
- Remote connections (Tailscale, LAN) require one-time approval
- Each browser profile needs separate approval
- Once approved, device is remembered (no re-approval needed)
- Clearing browser data = need to re-approve

---

## Current Config (WORKING)

**Gateway:**
- Port: 18789
- Bind: loopback (localhost only, Tailscale proxies it)
- Auth mode: Tailscale identity (tokenless)
- Tailscale mode: **serve** (CRITICAL)
- allowTailscale: **true** (CRITICAL)

**Tailscale access:**
- URL: https://studio.adal-rigel.ts.net:18789
- Auth: Automatic via Tailscale identity headers
- No token required

**Allowed origins:**
- https://studio.adal-rigel.ts.net:18789

**Paired devices:**
- 4 devices currently paired (check with `openclaw devices list`)

---

## Config Commands (Reference)

**View current config:**
```bash
openclaw config get gateway.tailscale.mode
openclaw config get gateway.auth.allowTailscale
openclaw config get gateway.controlUi.allowedOrigins
```

**Gateway token (for local access if needed):**
```bash
openclaw config get gateway.auth.token
```

---

## Troubleshooting

**"origin not allowed" error:**
- Add Tailscale URL to `gateway.controlUi.allowedOrigins` (see above)

**"disconnected (1008): pairing required":**
- Approve device with `openclaw devices approve <requestId>`

**Config validation failed:**
- Key is `controlUi` (lowercase i), not `controlUI`
- Use `--strict-json` flag for arrays

**Gateway not responding:**
- Check status: `openclaw status`
- Restart: `openclaw gateway restart`

---

## References

- OpenClaw docs: /opt/homebrew/lib/node_modules/openclaw/docs/web/control-ui.md
- Device pairing: /opt/homebrew/lib/node_modules/openclaw/docs/web/dashboard.md
- Tailscale integration: ~/Backstage/connections/tailscale.md
