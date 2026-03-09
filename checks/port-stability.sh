#!/bin/bash
# Port Stability Check
# Validates services running on expected ports (no drift)
# Exit 0 = all stable, Exit 1 = port moved or service down

set -e

# Port Registry (source of truth)
declare -A SERVICES=(
    ["3004"]="backstage"
    ["3011"]="uptime-kuma"
    ["18789"]="openclaw"
    ["5007"]="kavita"
    ["8065"]="matrix"
)

FAILED=0

echo "🔍 Port Stability Check"
echo ""

for PORT in "${!SERVICES[@]}"; do
    SERVICE="${SERVICES[$PORT]}"
    
    echo "Checking $SERVICE on port $PORT..."
    
    # Check if port is responding
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT --connect-timeout 2 | grep -qE "^(200|301|302|401|403)"; then
        echo "  ✓ Port $PORT responding"
        
        # Check Tailscale exposure (if applicable)
        if tailscale serve status 2>/dev/null | grep -q ":$PORT"; then
            echo "  ✓ Tailscale proxy configured"
        else
            echo "  ⚠ Tailscale proxy missing (may be intentional)"
        fi
    else
        echo "  ❌ Port $PORT not responding"
        FAILED=1
    fi
    
    echo ""
done

if [ $FAILED -eq 0 ]; then
    echo "✅ All ports stable"
    exit 0
else
    echo "❌ Some ports failed check"
    exit 1
fi
