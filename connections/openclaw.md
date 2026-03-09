# OpenClaw - Control UI Remote Access

**Last updated:** 2026-03-09 13:23 EDT

---

## Tailscale Access (iPad/iPhone)

### 1. Enable Tailscale Origin

**Add Tailscale URL to allowed origins:**

```bash
openclaw config set gateway.controlUi.allowedOrigins '["https://studio.adal-rigel.ts.net:18789"]' --strict-json
```

**Restart gateway to apply:**

```bash
openclaw gateway restart
```

---

### 2. Device Pairing (First Time Only)

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

---

## Current Config

**Gateway:**
- Port: 18789
- Bind: loopback (localhost only, Tailscale proxies it)
- Auth: token mode
- Tailscale HTTPS: https://studio.adal-rigel.ts.net:18789

**Allowed origins:**
- https://studio.adal-rigel.ts.net:18789 (Tailscale access)

**Paired devices:**
- 3 devices currently paired (check with `openclaw devices list`)

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
