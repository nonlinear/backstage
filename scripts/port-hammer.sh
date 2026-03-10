#!/bin/bash
# Port Hammer - Clean any port completely before starting service
# Usage: ./port-hammer.sh <port> <service-name>

set -e

PORT=$1
SERVICE=$2

if [ -z "$PORT" ] || [ -z "$SERVICE" ]; then
    echo "Usage: $0 <port> <service-name>"
    exit 1
fi

echo "🔨 Hammering port $PORT for $SERVICE..."

# 1. Clear Tailscale proxies (invisible network-layer)
echo "1. Removing Tailscale proxies..."
tailscale serve --https=$PORT off 2>/dev/null || true
tailscale serve --http=$PORT off 2>/dev/null || true

# 2. Wait for Tailscale cleanup
sleep 2

# 3. Kill any process using the port
echo "2. Killing processes on port $PORT..."
# Try multiple methods (lsof, pkill, ps grep)
if command -v /usr/sbin/lsof &> /dev/null; then
    /usr/sbin/lsof -ti :$PORT 2>/dev/null | xargs kill -9 2>/dev/null || true
fi

# Also kill by process name pattern
pkill -9 -f "next dev -p $PORT" 2>/dev/null || true
pkill -9 -f "next.*$PORT" 2>/dev/null || true

# Nuclear option: kill all node processes (DANGEROUS but effective)
# Commented out by default - uncomment if desperate
# killall -9 node 2>/dev/null || true

# 4. Wait for OS cleanup
sleep 2

# 5. Verify port is clear
echo "3. Verifying port $PORT is clear..."
if command -v /usr/sbin/lsof &> /dev/null; then
    if /usr/sbin/lsof -i :$PORT 2>/dev/null; then
        echo "❌ Port $PORT still occupied!"
        exit 1
    fi
else
    echo "   (lsof not available, trusting pkill worked)"
fi

echo "✅ Port $PORT clear for $SERVICE!"
