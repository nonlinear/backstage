# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.22.0 - Feedback Loops

**Epic:** [v0.22.0 Feedback Loops](../ROADMAP.md#v0220)



## Philosophy

### No Paywall = Merged Departments
- **Traditional model:** Before paywall = marketing, after paywall = user
- **Our model:** No paywall = marketing + UX converge (same people, same journey)
- **Implication:** Growth strategist + UX researcher have overlapping skillsets

### Feedback as Stakeholder Input
- **No customer vs user distinction** - Everyone contributes (donors, users, partners)
- **All feedback = roadmap input** - Analytics, user testing, social reactions
- **Self-hosted analytics** - Privacy-first, no surveillance capitalism
- **Nicholas as stakeholder** - Departments (agents) demo work, Nicholas gives feedback, refines autonomous checks over time


## Internal Feedback Loop (Nicholas ← Agents)

### Agents Show Work
- **Demos** - Working prototypes, UI mockups, code samples
- **Progress reports** - What was done, blockers, next steps
- **Proposals** - "Here's what we recommend, what do you think?"

### Nicholas Acts as Stakeholder
- **Quality control** - Review output, approve/reject, suggest changes
- **Strategic alignment** - Does this match vision? Does it serve commons goals?
- **Refinement** - Identify patterns → improve autonomous checks → reduce zig-zag

### Reducing Zig-Zag (Continuous Improvement)
- **Pattern detection** - If Nicholas rejects same type of work repeatedly → create check
- **Autonomous checks** - Agents self-validate before showing Nicholas (fewer iterations)
- **Check library** - QA checks, design checks, accessibility checks, ethical checks
- **Example:** If Nicholas always says "make it more accessible" → add accessibility check to QA agent

### Workflow Optimization Specialist Role
- **Audits published epics** - What went well? What created friction?
- **Suggests process improvements** - New checks, better agent communication, refined workflows
- **Reduces Nicholas's cognitive load** - Over time, agents need less direction


## Analytics Tooling

### Self-Hosted Options
1. **PostHog** - Events, sessions, funnels, self-hosted
2. **Matomo** - Privacy-first Google Analytics alternative
3. **Plausible Analytics** - Lightweight, open source, GDPR-compliant

### What to Track
- **Engagement metrics** - Usage patterns, feature adoption, session duration
- **Impact metrics** - Projects completed, community contributions, donations
- **NOT conversion metrics** - No paywall = no traditional funnel

### Where Hosted
- **NAS or Mac Studio** - Self-hosted, full data ownership
- **Tailscale accessible** - Remote monitoring via MagicDNS


## User Testing Workflows

### Recruitment
- **Community-first** - Invite contributors, donors, early adopters
- **Open calls** - Social media, GitHub, project README
- **Incentives** - Early access, recognition, co-creation opportunities

### Testing Methods
- **Qualitative:** Interviews, think-alouds, diary studies
- **Quantitative:** A/B tests, session recordings, heatmaps
- **Mixed:** Surveys with open-ended questions

### Templates & Tools
- **Interview scripts** - Standardized questions, follow-up prompts
- **Test scenarios** - Task-based testing, edge case exploration
- **Consent forms** - Privacy-first, transparent data usage


## Social Media Monitoring

### Platforms to Track
- **GitHub** - Issues, PRs, stars, forks, discussions
- **Instagram** - Engagement, DMs, story reactions
- **Twitter/Mastodon** - Mentions, replies, quote tweets
- **Discord/Forums** - Community feedback, feature requests

### How to Monitor
- **Automated:** Webhooks, RSS feeds, API integrations
- **Manual:** Weekly review sessions, community check-ins


## Growth Strategist vs UX Research

### Overlapping Skillsets
- **Both:** Analyze metrics, identify patterns, suggest improvements
- **Both:** Transform numbers into insights (analytics → actionable feedback)

### Different Ethics
- **Growth Strategist:** Focus on acquisition, retention, expansion
- **UX Researcher:** Focus on usability, accessibility, satisfaction

### In No Paywall Model
- **Significant overlap** - No commercial barrier = shared concerns
- **May merge roles** - One person/agent handles both (growth + UX)
- **Or collaborate closely** - Weekly sync, shared dashboards


## Feedback → Roadmap Integration

### Lifecycle
1. **Collect** - Analytics, user tests, social media, community input
2. **Analyze** - Identify patterns, prioritize insights, flag gaps
3. **Act** - Create tasks, update roadmap, communicate changes

### Tools
- **Open Project** - Task management, roadmap visualization
- **Analytics dashboard** - PostHog/Matomo/Plausible
- **Community channels** - GitHub Discussions, Discord, social media

### Cadence
- **Weekly reviews** - Quick wins, urgent issues
- **Monthly retrospectives** - Bigger patterns, strategic shifts
- **Quarterly recaps** - Major direction changes, epic planning


## Next Steps

1. **Choose analytics tool** (PostHog, Matomo, or Plausible)
2. **Install on NAS/server** (Docker, Tailscale accessible)
3. **Define metrics** (what to track, what NOT to track)
4. **User testing templates** (interview scripts, consent forms)
5. **Social media monitoring** (webhooks, RSS, weekly manual review)
6. **Feedback → roadmap process** (how insights become tasks)


**Updated:** 2026-02-21
