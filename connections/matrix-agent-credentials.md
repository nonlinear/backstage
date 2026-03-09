# Matrix Agent Credentials

**Password (all agents):** YD!zDAYKSwnESDcF0qGYR^uSh

## Business Analyst
- **User ID:** @business-analyst:studio.adal-rigel.ts.net
- **Access Token:** syt_YnVzaW5lc3MtYW5hbHlzdA_OtvrClzekQyvpZVjzsZn_02UQq0
- **Room:** !jrvKNHacSALaHzDOdn:studio.adal-rigel.ts.net (Main Squad)

## Design Engineer
- **User ID:** @design-engineer:studio.adal-rigel.ts.net
- **Access Token:** syt_ZGVzaWduLWVuZ2luZWVy_ryPXimIVOOxpnIZRzpaQ_1SXYj1
- **Room:** !DSvwIuYDpunsRqDvRy:studio.adal-rigel.ts.net (Engineering Squad)

## OpenClaw Multi-Account Config

Each agent needs separate Matrix account in openclaw.json:

```json
{
  "channels": {
    "matrix": {
      "accounts": {
        "business-analyst": {
          "homeserver": "http://localhost:8008",
          "userId": "@business-analyst:studio.adal-rigel.ts.net",
          "accessToken": "syt_YnVzaW5lc3MtYW5hbHlzdA_OtvrClzekQyvpZVjzsZn_02UQq0"
        },
        "design-engineer": {
          "homeserver": "http://localhost:8008",
          "userId": "@design-engineer:studio.adal-rigel.ts.net",
          "accessToken": "syt_ZGVzaWduLWVuZ2luZWVy_ryPXimIVOOxpnIZRzpaQ_1SXYj1"
        }
      }
    }
  }
}
```
