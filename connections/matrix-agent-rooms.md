# Matrix Agent Rooms

**User:** @nonlinear:studio.adal-rigel.ts.net  
**Access Token:** syt_bm9ubGluZWFy_uInDdrJbwbjgqBAASffT_0Q5k5S

## Rooms

### Main Squad
- **Room ID:** !jrvKNHacSALaHzDOdn:studio.adal-rigel.ts.net
- **Alias:** #main:studio.adal-rigel.ts.net
- **Agents:** business-analyst, defense, secretaria, strategic

### Engineering Squad
- **Room ID:** !DSvwIuYDpunsRqDvRy:studio.adal-rigel.ts.net
- **Alias:** #engineering:studio.adal-rigel.ts.net
- **Agents:** design-engineer

## OpenClaw Configuration

**Routing:** @mention (e.g., "@design-engineer review this")

**When message contains @agent-name:**
- OpenClaw routes to that specific agent
- Agent processes message
- Agent responds in same room

**Example:**
```
User: "@business-analyst what's the market size for X?"
→ Routes to main/business-analyst
→ Agent responds with analysis
```

**Next:** Configure OpenClaw Matrix integration to monitor these rooms.
