# Docker Backup Strategy

**Goal:** Automated daily backups for Docker containers with databases (PostgreSQL, SQLite).

**Prevents repeat of Kavita incident:** Container deleted = data lost.

---

## Scope

### Containers

1. **PostgreSQL** (OpenProject, future apps):
   - Daily `pg_dump` → `~/Backups/CONTAINER/YYYY-MM-DD.sql`
   - Git-friendly (text SQL dumps)

2. **SQLite** (Focalboard, Kavita):
   - Daily `.backup` → `~/Backups/CONTAINER/YYYY-MM-DD.db`

3. **Retention:** 30 days (auto-rotate)

### Implementation

**Backup script:** `~/Apps/scripts/docker-backup.sh`
- Auto-detect containers with databases
- Execute pg_dump or sqlite backup
- Rotate old backups (>30 days)

**Cronjob:** Daily 3am (BEFORE health-check)

**Alerts:** Telegram notification on failure

---

## Recovery Procedures

### PostgreSQL

```bash
# Backup
docker exec openproject pg_dump -U postgres > backup.sql

# Restore
docker exec -i openproject psql -U postgres < backup.sql
```

### SQLite

```bash
# Backup
docker exec kavita sqlite3 /config/data/kavita.db ".backup '/tmp/backup.db'"
docker cp kavita:/tmp/backup.db ./backup.db

# Restore
docker cp ./backup.db kavita:/config/data/kavita.db
docker restart kavita
```

---

## Lessons from Kavita Incident

**What went wrong:**
1. Container deletion = data loss (no external backup)
2. Internal backups existed BUT not automated/documented
3. Recovery took 1h+ (manual)
4. Trust damaged

**What this fixes:**
1. ✅ Daily automated backups
2. ✅ External storage (outside Docker volumes)
3. ✅ Documented recovery
4. ✅ Alerts on failure
5. ✅ Git-friendly format (SQL = text)

---

## Dependencies

- `~/Apps/scripts/health-check.sh` (runs after backup)
- Telegram env vars (`$TELEGRAM_BOT_TOKEN`, `$TELEGRAM_CHAT_ID`)
- `~/Backups/` directory (auto-created)

---

## Notes

- **30 days retention:** Balance disk space + recovery window
- **SQL dumps vs volume snapshots:** Text = git-friendly, portable, inspectable
- **Telegram alerts:** Instant notification on failure
- **PostgreSQL caveat:** Container must be running for pg_dump
- **SQLite caveat:** `.backup` requires absolute path inside container
