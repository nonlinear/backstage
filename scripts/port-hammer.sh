#!/bin/bash
# Port Hammer 🔨
# Clears port conflicts AND configures Tailscale exposure
# Usage: ./port-hammer.sh <port> <service-name> [--no-tailscale]

set -e

PORT=$1
SERVICE=$2
SKIP_TAILSCALE=false

if [ -z "$PORT" ] || [ -z "$SERVICE" ]; then
    echo "Usage: $0 <port> <service-name> [--no-tailscale]"
    echo "Example: $0 3004 backstage"
    echo ""
    echo "Options:"
    echo "  --no-tailscale    Skip Tailscale exposure configuration"
    exit 1
fi

if [ "$3" = "--no-tailscale" ]; then
    SKIP_TAILSCALE=true
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
fi
echo ""

# 6. Configure Tailscale exposure (unless --no-tailscale)
if [ "$SKIP_TAILSCALE" = false ]; then
    echo "6️⃣  Configuring Tailscale exposure..."
    
    # Check if service is running first
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT --connect-timeout 2 | grep -qE "^(200|301|302|401|403)"; then
        echo "   ✓ Service responding on localhost:$PORT"
        
        # Configure Tailscale serve in background
        if tailscale serve --bg --https $PORT localhost:$PORT 2>&1 | grep -q "Available within your tailnet"; then
            echo "   ✓ Tailscale HTTPS proxy configured"
            echo ""
            echo "   🌐 Available at: https://studio.adal-rigel.ts.net:$PORT"
        else
            echo "   ⚠ Tailscale exposure failed (see error above)"
            echo "   Manual: tailscale serve --bg --https $PORT localhost:$PORT"
        fi
    else
        echo "   ⚠ Service not responding on localhost:$PORT yet"
        echo "   Start $SERVICE first, then run:"
        echo "   tailscale serve --bg --https $PORT localhost:$PORT"
    fi
else
    echo "6️⃣  Skipping Tailscale exposure (--no-tailscale flag)"
fi

echo ""
echo "✅ Port $PORT ready for $SERVICE"
