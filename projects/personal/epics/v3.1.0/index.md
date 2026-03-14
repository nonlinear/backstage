# New Useful Apps

**Goal:** Evaluate new self-hosted apps from PikaPods catalog for potential deployment on Mac Studio or NAS.

**Source:** https://www.pikapods.com/apps#new

---

## Why Evaluate?

- Discover better alternatives to current tools
- Replace paid services with self-hosted (privacy + cost)
- Expand self-hosted infrastructure capabilities
- Learn new workflows/features

---

## Evaluation Criteria

For each app, consider:

1. **Need:** Do we have this problem?
2. **Alternative:** Better than what we use now?
3. **Complexity:** Easy to deploy/maintain?
4. **Resources:** CPU/RAM/storage requirements?
5. **Integration:** Works with existing stack?
6. **Privacy:** Self-hosted advantage?

---

## Priority Categories

### 🔥 High Priority (Immediate Value)
- Finance/budgeting tools (already exploring Sure)
- Knowledge management (note-taking, wikis)
- Monitoring/analytics (complement Uptime Kuma)
- Workflow automation (reduce manual tasks)

### 🌟 Medium Priority (Nice to Have)
- Media management (books, music, photos)
- Bookmarks/read-later (organize research)
- RSS readers (news aggregation)
- Document management (already have Paperless)

### 💡 Low Priority (Explore Later)
- CRM/project management (not immediate need)
- Forums/community (no community to manage yet)
- Design tools (not primary workflow)
- Email infrastructure (already stable)

---

## Already Deployed

- ✅ Actual Budget (http://192.168.1.152:5006)
- ✅ Changedetection (http://192.168.1.152:5555)
- ✅ Kavita (http://192.168.1.152:5007)
- ✅ Komga (http://192.168.1.152:25600)
- ✅ Paperless-ngx (http://192.168.1.152:8010)
- ✅ Uptime Kuma (http://192.168.1.152:3001)

---

## Evaluation Process

1. **Quick Research** (5-10min per app)
   - Read docs, check GitHub stars/activity
   - Watch demo video if available
   - Scan Reddit/community discussions

2. **Test Deployment** (if promising)
   - Docker Compose or PikaPods trial
   - Import sample data
   - Test core features

3. **Decision**
   - Keep (deploy to NAS)
   - Archive (note why, revisit later)
   - Reject (document reason)

---

## Notes

- **PikaPods:** Managed hosting option (if self-hosting too complex)
- **Docker:** Most apps have official containers
- **Resource limits:** Mac Studio = development, NAS = production
- **Backups:** Any deployed app needs backup strategy

---

## Related

- Epic v2.4.0 - Finances (Sure evaluation)
- connections/docker.md (deployment patterns)
- ~/Apps/ (current Docker apps)
