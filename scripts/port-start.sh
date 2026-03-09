#!/bin/bash
# Port Start 🚀
# Complete service startup: hammer port + start service + expose Tailscale
# Usage: ./port-start.sh <service-name>

set -e

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo "Usage: $0 <service-name>"
    echo ""
    echo "Available services:"
    echo "  backstage    (port 3004)"
    echo "  openclaw     (port 18789)"
    echo "  uptime-kuma  (port 3011)"
    echo "  kavita       (port 5007)"
    exit 1
fi

# Service configuration
case $SERVICE in
    backstage)
        PORT=3004
        START_CMD="pm2 start npm --name backstage --cwd ~/Backstage/app -- start -- --port 3004"
        ;;
    openclaw)
        PORT=18789
        START_CMD="openclaw gateway start"
        ;;
    uptime-kuma)
        PORT=3011
        START_CMD="docker start uptime-kuma"
        ;;
    kavita)
        PORT=5007
        START_CMD="docker start kavita"
        ;;
    *)
        echo "❌ Unknown service: $SERVICE"
        echo ""
        echo "Available services:"
        echo "  backstage, openclaw, uptime-kuma, kavita"
        exit 1
        ;;
esac

echo "🚀 Starting $SERVICE on port $PORT..."
echo ""

# Step 1: Hammer the port
echo "Step 1: Clearing port $PORT..."
~/Backstage/scripts/port-hammer.sh $PORT $SERVICE --no-tailscale
echo ""

# Step 2: Start the service
echo "Step 2: Starting $SERVICE..."
eval $START_CMD
echo ""

# Step 3: Wait for service to be ready
echo "Step 3: Waiting for service to respond..."
MAX_WAIT=30
WAITED=0
while [ $WAITED -lt $MAX_WAIT ]; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT --connect-timeout 1 | grep -qE "^(200|301|302|401|403)"; then
        echo "   ✓ Service responding after ${WAITED}s"
        break
    fi
    sleep 2
    WAITED=$((WAITED + 2))
    echo -n "."
done
echo ""

if [ $WAITED -ge $MAX_WAIT ]; then
    echo "❌ Service didn't respond after ${MAX_WAIT}s"
    echo "   Check logs manually"
    exit 1
fi

# Step 4: Expose via Tailscale
echo "Step 4: Configuring Tailscale exposure..."
if tailscale serve --bg --https $PORT localhost:$PORT 2>&1 | grep -q "Available within your tailnet"; then
    echo "   ✓ Tailscale HTTPS proxy configured"
    echo ""
    echo "✅ $SERVICE running and exposed!"
    echo ""
    echo "   Local:     http://localhost:$PORT"
    echo "   Tailscale: https://studio.adal-rigel.ts.net:$PORT"
else
    echo "   ⚠ Tailscale exposure failed"
    echo "   Service is running locally but NOT accessible remotely"
    exit 1
fi
