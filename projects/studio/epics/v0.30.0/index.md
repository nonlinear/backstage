# v0.30.0 - Execution Decision Protocol

## Decision Tree

```mermaid
graph TD
    A[Task Proposed] --> B{Approved?}
    B -->|Clear action, reversible| C{Time?}
    B -->|Multiple options, high stakes| D[Create Epic]
    C -->|<5min| E[Execute Now]
    C -->|>5min| F[Night Queue 2AM-6AM]
    D --> G[Nicholas Decides]
    G --> C
```

**Approved = clear action, known method, safe to execute**

**Needs Discussion = unclear goal, multiple approaches, high stakes**

**Night Queue:** Long tasks (downloads, batch jobs) run 2AM-6AM, report 6AM Telegram

**Time Budget:** 3h studio/day (flexible average, not hard stop)
