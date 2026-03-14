#!/bin/bash
# Backstage startup wrapper - manages Tailscale proxy lifecycle

PORT=3004
APP_DIR="$HOME/Backstage/app"
LOG_DIR="$HOME/Library/Logs"

echo "[$(date)] Starting Backstage wrapper..." >> "$LOG_DIR/backstage.log"

# 1. Turn off Tailscale proxy (free the port)
echo "[$(date)] Disabling Tailscale proxy on port $PORT..." >> "$LOG_DIR/backstage.log"
tailscale serve --https=$PORT off 2>&1 | tee -a "$LOG_DIR/backstage.log"

# 2. Wait for port to be fully released
sleep 2

# 3. Start Backstage
echo "[$(date)] Starting Backstage on port $PORT..." >> "$LOG_DIR/backstage.log"
cd "$APP_DIR"
npm run dev 2>&1 | tee -a "$LOG_DIR/backstage.log" &
APP_PID=$!

# 4. Wait for app to be ready
echo "[$(date)] Waiting for Backstage to be ready..." >> "$LOG_DIR/backstage.log"
for i in {1..30}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|307"; then
        echo "[$(date)] Backstage is ready!" >> "$LOG_DIR/backstage.log"
        break
    fi
    sleep 1
done

# 5. Re-enable Tailscale proxy
echo "[$(date)] Re-enabling Tailscale proxy on port $PORT..." >> "$LOG_DIR/backstage.log"
tailscale serve --bg --https=$PORT http://localhost:$PORT 2>&1 | tee -a "$LOG_DIR/backstage.log"

echo "[$(date)] Backstage startup complete. PID: $APP_PID" >> "$LOG_DIR/backstage.log"

# Keep script running (wait for app process)
wait $APP_PID
