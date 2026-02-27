# v0.28.0 - Docker Backup Strategy

**Status:** 📋 TODO  
**Priority:** HIGH (prevent data loss like Kavita incident)  
**Created:** 2026-02-25

---

## Goal

**Automated daily backups for Docker containers with databases (PostgreSQL, SQLite).**

**Prevents repeat of Kavita incident (container deleted = data lost).**

---

## Scope

### In Scope

1. **PostgreSQL containers** (OpenProject, future apps):
   - Daily `pg_dump` → `~/Backups/CONTAINER/YYYY-MM-DD.sql`
   - Keep last 30 days (rotate)
   - Git-friendly (text SQL dumps)

2. **SQLite containers** (Focalboard, Kavita):
   - Daily `.backup` command → `~/Backups/CONTAINER/YYYY-MM-DD.db`
   - Keep last 30 days

3. **Backup script** (`~/Apps/scripts/docker-backup.sh`):
   - Auto-detect containers with databases
   - Execute appropriate backup method (pg_dump vs sqlite)
   - Rotate old backups (delete >30 days)

4. **Cronjob** (daily 3am):
   - Run backup script BEFORE health-check
   - Telegram alert if backup fails

5. **Recovery docs**:
   - How to restore PostgreSQL dump
   - How to restore SQLite backup
   - Add to `~/Documents/personal/connections/docker.md`

### Out of Scope

- Volume snapshots (handled by Time Machine)
- Application-level exports (future epic)
- Real-time replication (overkill for personal use)

---

## Success Criteria

- [ ] `~/Apps/scripts/docker-backup.sh` created
- [ ] PostgreSQL backup tested (pg_dump + restore)
- [ ] SQLite backup tested (.backup + restore)
- [ ] Cronjob configured (daily 3am)
- [ ] Telegram alerts working (backup failure notifications)
- [ ] Documentation updated (docker.md recovery procedures)
- [ ] 30-day rotation verified (old backups deleted automatically)

---

## Tasks

1. **Create backup script**:
   ```bash
   #!/bin/bash
   # ~/Apps/scripts/docker-backup.sh
   
   BACKUP_DIR="$HOME/Backups"
   RETENTION_DAYS=30
   
   # PostgreSQL containers
   for container in $(docker ps --format '{{.Names}}' | grep -E 'openproject|postgres'); do
       mkdir -p "$BACKUP_DIR/$container"
       docker exec "$container" pg_dump -U postgres > "$BACKUP_DIR/$container/$(date +%Y-%m-%d).sql"
   done
   
   # SQLite containers
   for container in kavita focalboard; do
       if docker ps | grep -q "$container"; then
           mkdir -p "$BACKUP_DIR/$container"
           docker exec "$container" sqlite3 /path/to/db ".backup '$BACKUP_DIR/$container/$(date +%Y-%m-%d).db'"
       fi
   done
   
   # Rotate old backups
   find "$BACKUP_DIR" -name "*.sql" -o -name "*.db" -mtime +$RETENTION_DAYS -delete
   ```

2. **Test PostgreSQL backup/restore**:
   ```bash
   # Backup
   docker exec openproject pg_dump -U postgres > test-backup.sql
   
   # Restore (if needed)
   docker exec -i openproject psql -U postgres < test-backup.sql
   ```

3. **Test SQLite backup/restore**:
   ```bash
   # Backup
   docker exec kavita sqlite3 /config/data/kavita.db ".backup '/tmp/test.db'"
   docker cp kavita:/tmp/test.db ./test-backup.db
   
   # Restore (if needed)
   docker cp ./test-backup.db kavita:/config/data/kavita.db
   docker restart kavita
   ```

4. **Add to cronjob**:
   ```bash
   # Edit crontab
   crontab -e
   
   # Add BEFORE health-check (ensure backup completes first)
   0 3 * * * ~/Apps/scripts/docker-backup.sh && ~/Apps/scripts/health-check.sh
   ```

5. **Add Telegram alerts**:
   ```bash
   # In docker-backup.sh, if backup fails:
   if [ $? -ne 0 ]; then
       curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
           -d "chat_id=$TELEGRAM_CHAT_ID" \
           -d "text=🚨 Docker backup FAILED for $container"
   fi
   ```

6. **Update docker.md**:
   - Backup strategy section
   - Recovery procedures (step-by-step)
   - Where backups stored (`~/Backups/`)
   - Retention policy (30 days)

---

## Dependencies

- Existing: `~/Apps/scripts/health-check.sh` (runs after backup)
- Existing: Telegram env vars (`$TELEGRAM_BOT_TOKEN`, `$TELEGRAM_CHAT_ID`)
- New: `~/Backups/` directory (auto-created by script)

---

## Lessons from Kavita Incident

**What went wrong:**
1. Container deletion = data loss (no external backup)
2. Internal Kavita backups existed (`~/Desktop/backups/`) BUT not automated/documented
3. Recovery took 1h+ (manual restoration)
4. Trust damaged (could have been prevented)

**What this epic fixes:**
1. ✅ Daily automated backups (no manual intervention)
2. ✅ External storage (`~/Backups/` outside Docker volumes)
3. ✅ Documented recovery (no guessing how to restore)
4. ✅ Alerts on failure (know immediately if backup breaks)
5. ✅ Git-friendly format (SQL dumps = text = trackable)

---

## Timeline

**Estimate:** 2-3 hours

1. Script creation: 30min
2. Testing (PostgreSQL + SQLite): 1h
3. Cronjob + alerts: 30min
4. Documentation: 30min
5. Verification (wait for next 3am run): next day

---

## Notes

- **Why 30 days retention?** Balance between disk space + recovery window
- **Why SQL dumps vs volume snapshots?** Text = git-friendly, portable, inspectable
- **Why Telegram alerts?** Instant notification if backup fails (don't discover at recovery time)
- **PostgreSQL caveat:** Container must be running for pg_dump (health-check ensures this)
- **SQLite caveat:** `.backup` requires absolute path inside container (check paths first)

---

## Related Epics

- v0.26.0 Travel Mode (depends on backup strategy being solid)
- v0.3.0 PM Tool Evaluation (OpenProject needs backup before production use)

---

**End epic definition.**
