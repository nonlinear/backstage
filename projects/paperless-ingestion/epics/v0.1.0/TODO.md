# TODO: Add PAPERLESS_TOKEN to .env

**Location:** `~/Documents/personal/.env`

**How to get token:**
1. Login to Paperless-ngx: http://$NAS_HOST:8010
2. Settings → API Tokens
3. Generate new token
4. Add to .env:
   ```
   PAPERLESS_TOKEN=your_token_here
   ```

**Used by:**
- `~/Backstage/projects/paperless-ingestion/scripts/ingest-scans.sh`
- Heartbeat daily check (6AM)

**Status:** ⏳ Pending (Nicholas needs to generate token)
