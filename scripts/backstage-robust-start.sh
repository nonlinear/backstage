#!/bin/bash
# Robust Backstage startup - never fails silently
# Used by LaunchAgent for boot persistence

set -e

LOG_FILE="/tmp/backstage-robust-startup.log"
PORT=3004
APP_DIR="/Users/nonlinear/Backstage/app"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "=== Backstage Robust Startup: $(date) ==="

# 1. Hammer the port (clean everything)
echo "Step 1: Hammering port $PORT..."
/Users/nonlinear/Backstage/scripts/port-hammer.sh $PORT backstage || {
    echo "❌ Port hammer failed!"
    exit 1
}

# 2. Start the app
echo "Step 2: Starting Backstage app..."
cd "$APP_DIR"
nohup /opt/homebrew/bin/npm run dev < /dev/null > /tmp/backstage-app.log 2>&1 &
APP_PID=$!

echo "   App started with PID: $APP_PID"
sleep 3  # Give app time to initialize

# 3. Wait for app to be ready (max 30 seconds)
echo "Step 3: Waiting for app to respond..."
for i in {1..30}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|302\|307"; then
        echo "✅ App responding on http://localhost:$PORT"
        break
    fi
    
    echo "   Waiting... ($i/30)"
    sleep 1
done

# Verify app is actually responding
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|302\|307"; then
    echo "❌ App failed to respond after 30 seconds!"
    echo "Last 20 lines of app log:"
    tail -20 /tmp/backstage-app.log
    exit 1
fi

# 4. Configure Tailscale (app is PROVEN working first)
echo "Step 4: Configuring Tailscale..."
tailscale serve --bg --https $PORT localhost:$PORT || {
    echo "⚠️  Tailscale configuration failed (but app is running locally)"
}

# 5. Final verification
echo "Step 5: Final end-to-end test..."
sleep 2

if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|302\|307"; then
    echo "✅ Backstage fully operational!"
    echo "   Local: http://localhost:$PORT"
    echo "   Tailscale: https://studio.adal-rigel.ts.net:$PORT"
else
    echo "❌ Final verification failed!"
    exit 1
fi

# Keep script alive (LaunchAgent needs foreground process)
# Don't wait on backgrounded npm process - it will always exit
# Instead, keep script alive and periodically check app health
while true; do
    if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|302\|307"; then
        echo "⚠️  App stopped responding! Attempting restart..."
        exit 1  # LaunchAgent will restart us
    fi
    sleep 60  # Check every minute
done
