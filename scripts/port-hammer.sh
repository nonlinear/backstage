#!/bin/bash
# Port Hammer 🔨
# Clears port conflicts before starting services
# Usage: ./port-hammer.sh <port> <service-name>

set -e

PORT=$1
SERVICE=$2

if [ -z "$PORT" ] || [ -z "$SERVICE" ]; then
    echo "Usage: $0 <port> <service-name>"
    echo "Example: $0 3004 backstage"
    exit 1
fi

echo "🔨 Hammering port $PORT for $SERVICE..."
echo ""

# 1. Clear Tailscale proxies
echo "1️⃣  Removing Tailscale proxies..."
tailscale serve --https=$PORT off 2>/dev/null && echo "   ✓ HTTPS proxy removed" || echo "   ○ No HTTPS proxy"
tailscale serve --http=$PORT off 2>/dev/null && echo "   ✓ HTTP proxy removed" || echo "   ○ No HTTP proxy"
echo ""

# 2. Clear PM2
echo "2️⃣  Stopping PM2 process..."
if pm2 delete $SERVICE 2>/dev/null; then
    echo "   ✓ PM2 process '$SERVICE' stopped"
else
    echo "   ○ No PM2 process named '$SERVICE'"
fi
echo ""

# 3. Kill stragglers
echo "3️⃣  Killing any lingering processes..."
PIDS=$(lsof -ti :$PORT 2>/dev/null || true)
if [ -n "$PIDS" ]; then
    echo "   Found PIDs: $PIDS"
    echo "$PIDS" | xargs kill -9 2>/dev/null && echo "   ✓ Processes killed" || echo "   ○ Already dead"
else
    echo "   ○ No processes found"
fi
echo ""

# 4. Wait for OS cleanup
echo "4️⃣  Waiting for OS cleanup..."
sleep 2
echo "   ✓ Done"
echo ""

# 5. Verify port is clear
echo "5️⃣  Verifying port $PORT is clear..."
if lsof -i :$PORT 2>/dev/null; then
    echo ""
    echo "❌ Port $PORT still occupied!"
    echo ""
    echo "Manual check needed:"
    echo "  lsof -i :$PORT"
    echo "  tailscale serve status | grep $PORT"
    exit 1
else
    echo "   ✓ Port $PORT is clear!"
    echo ""
    echo "✅ Port $PORT ready for $SERVICE"
fi
