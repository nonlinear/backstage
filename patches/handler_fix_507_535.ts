      const baseRouteSession = resolveMatrixBaseRouteSession({
        buildAgentSessionKey: core.channel.routing.buildAgentSessionKey,
        baseRoute,
        isDirectMessage,
        roomId,
        accountId,
      });

      // ========== MATRIX ROUTING FIX (2026-03-14) ==========
      // Calculate effective agentId from room config BEFORE using baseRoute
      const effectiveAgentId = (isRoom && roomConfig?.agentId?.trim()) || baseRoute.agentId;
      
      // Override baseRoute.agentId with effectiveAgentId
      const effectiveBaseRoute = {
        ...baseRoute,
        agentId: effectiveAgentId,
      };

      // Build sessionKey manually with effectiveAgentId (bypasses resolveMatrixBaseRouteSession bug)
      const normalizedRoomId = roomId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const baseSessionKey = `agent:${effectiveAgentId}:matrix:channel:${normalizedRoomId}`;
      const effectiveSessionKey = threadRootId 
        ? `${baseSessionKey}:thread:${threadRootId}` 
        : baseSessionKey;
      // ========== END FIX ==========

      const route = {
        ...effectiveBaseRoute,  // Use overridden baseRoute
        lastRoutePolicy: baseRouteSession.lastRoutePolicy,
