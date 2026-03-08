#!/bin/bash
# Execute this on the NAS to block ALL Amazon domains

set -e

echo "🏴 Blocking ALL Amazon domains via Pi-hole regex..."

sqlite3 /etc/pihole/gravity.db << 'SQL'
INSERT INTO domainlist (type, domain, enabled, comment) 
VALUES 
  (3, '(^|\.)amazon\.', 1, 'Block ALL Amazon domains - 2026-02-21'),
  (3, '(^|\.)amazonaws\.com$', 1, 'Block AWS - 2026-02-21'),
  (3, '(^|\.)amazonalexa\.', 1, 'Block Alexa - 2026-02-21'),
  (3, '(^|\.)amazontrust\.', 1, 'Block Amazon CDN - 2026-02-21');
SQL

echo "✅ Regex added. Reloading Pi-hole..."

pihole restartdns reload-lists

echo "✅ DONE! Amazon is now blocked on ALL devices."
echo ""
echo "Test:"
echo "  nslookup amazon.com 192.168.1.152"
echo "  (should return 0.0.0.0)"
