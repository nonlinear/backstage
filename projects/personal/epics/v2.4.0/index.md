# Finances - Intelligent Money Management

**Goal:** Build comprehensive financial automation: tax debt negotiation, mortgage optimization, Paperless + Actual Budget integration.

**Priority:** HIGH (NYS tax debt time-sensitive!)

---

## Phase 1: NYS Tax Debt Resolution (URGENT!)

**Reminders:**
- ☎️ **Call NYS: 518-457-5434** (weekday mornings)
- ☎️ **Call "Your voice at Tax Dept": 518-530-4357**
- 📄 "Compromise in lieu of taxes"
- 📄 Send 2023 tax returns to Jenn

**Resources:**
- NYS Tax Department official guides
- "How To Get IRS Tax Relief" book (principles apply to NYS)
- Tax attorney consultation? (for large debt)
- Financial hardship documentation

---

## Phase 2: Mortgage Optimization

**Smart Prepayment Strategies:**

### 1. Bi-Weekly Payment Hack
- Pay half mortgage every 2 weeks (26 payments/year = 13 months)
- Extra month/year → shaves ~7 years off 30-year mortgage
- **Savings:** Tens of thousands in interest

### 2. Principal-Only Extra Payments
- Even $100/month extra → principal reduction
- Target: First payment of year (max interest saved)

### 3. Debt Avalanche Method
- Pay minimums on all debts
- Extra $ → highest interest rate first
- **Mortgage usually lowest rate → pay LAST** (focus credit cards first!)

### 4. Recast vs Refinance
- **Recast:** Lump sum → lower payment (same rate, small fee)
- **Refinance:** New loan (lower rate, closing costs)
- **When:** Rates drop 0.75%+, or large windfall available

**Tools to Build:**
- Mortgage prepayment calculator (show scenarios)
- Debt avalanche tracker (prioritize highest APR)
- Recast vs refinance decision tree

---

## Phase 3: Paperless-ngx Integration

**Goal:** Auto-organize ALL financial documents.

**Auto-Upload Workflow:**
1. Scrape IRS/NYS portals → download W2, 1099, tax docs
2. Auto-upload to Paperless → tag by year, type, source
3. OCR search: "show me all 2024 mortgage statements"
4. Retention rules: Tax docs (7 years), receipts (1 year)

**Document Categories:**
- **Tax:** W2, 1099, returns, notices (tag: year, IRS/NYS/federal)
- **Mortgage:** Statements, closing docs, escrow (tag: year, property)
- **Bills:** Utilities, insurance, subscriptions (tag: vendor, month)
- **Receipts:** Deductible expenses, warranty items (tag: category, vendor)
- **Banking:** Statements, investment reports (tag: institution, quarter)
- **🇧🇷 Brazilian Identity:** Passport (YC132899), RG, CPF, voter registration (tag: brazil, identity)

---

## Phase 4: Actual Budget Integration

**Already running:** http://192.168.1.152:5006

**Smart Budgeting:**
- Link bank accounts (auto-import transactions)
- Category setup: Fixed (mortgage, insurance), Variable (groceries, gas), Goals (savings, debt payoff)
- Monthly budget review automation (OpenClaw pulls report)
- Spending alerts: "You're 80% through grocery budget"

**Debt Payoff Tracking:**
- Add all debts (balance, APR, minimum payment)
- Avalanche calculator (which to pay first)
- Progress visualization (debt-free date projection)

**Alternative to evaluate:**
- **Sure** (https://github.com/we-promise/sure) - Modern self-hosted budgeting app
- Compare with Actual Budget (features, UX, performance)
- Test Docker deployment, API, mobile support
- Decide: keep Actual, migrate to Sure, or run both

---

## Phase 5: Tax Automation (Read-Only)

**Goal:** Never manually download tax docs again!

**IRS Portal Scraper:**
- Selenium login → Download W2, 1099, transcripts
- Check refund status → Auto-notify
- **NO AUTO-SUBMIT** (review & file manually!)

**NYS Portal Scraper:**
- Login → Download 1099-G, property tax, etc.
- Monitor debt status → Alert on changes

---

## Phase 6: Wiley Work - Time Tracking

**IEEE Timelog Workflow:**
- Track billable hours for IEEE/Wiley projects
- Offset pending hours across months (max 10h/week)
- Monthly review (5 days before month-end)

**Process:**
1. Work happens (document in `~/Documents/notes/wiley/IEEE_timelog.md`)
2. Every Monday: Fill pending offset hours (always in PAST)
3. 5 days before month-end: Review pending, plan distribution

**Limits:**
- Max 10h/week retroactive logging
- Always log in past (never future dates)
- Distribute across Mon/Wed/Fri for realism

**Future improvement (pending policy change):**
- Scan Jira tasks with `billable` flag
- Auto-detect WHEN work was done
- Auto-map to WHICH task
- Suggest hours, Nicholas approves

---

## Triple Integration Vision

```
📄 PAPERLESS          →  Historical truth (what happened)
💰 ACTUAL BUDGET      →  Current reality (what you have)
💬 YOU + OPENCLAW     →  Future goals (what you want)
        ↓
   🤖 AI CFO
```

**Examples:**

**Mortgage Prepayment:**
- Paperless: Mortgage rate 3.5%, balance $280K
- Actual Budget: Credit card debt $15K @ 19% APR
- Analysis: Pay credit card FIRST (avalanche method!)

**Budget Alert:**
- Actual Budget: Groceries $847 this month (vs $650 avg)
- Paperless OCR: 12 grocery receipts, 3 from Whole Foods
- Alert: "Grocery spending up 30%. Switch to regular store saves $80/month = $960/year."

**Tax Checklist:**
- Paperless (tag: tax, 2024): W2, 1099-INT, 1098, property tax
- Missing: Charity donation receipts
- Output: "You're 90% ready! Need donation receipts."

---

## Books to Read

- ✅ "How To Get IRS Tax Relief" (David Hickam)
- 📚 "The Total Money Makeover" (Dave Ramsey - debt snowball)
- 📚 "Your Money or Your Life" (FIRE movement)
- 📚 "I Will Teach You to Be Rich" (Ramit Sethi - automation)

---

## Success Metrics

### Phase 1 (NYS):
- [ ] Called both NYS numbers
- [ ] Negotiation started (payment plan or compromise)
- [ ] All docs uploaded to Paperless (organized, tagged)

### Phase 2 (Mortgage):
- [ ] Prepayment strategy chosen
- [ ] Calculator built (show savings)
- [ ] First extra payment made!

### Phase 3 (Automation):
- [ ] Paperless auto-upload working
- [ ] Actual Budget synced & reviewed monthly
- [ ] Tax scraper deployed (IRS + NYS)
- [ ] Weekly finance check-ins (via heartbeat)

---

**This is your money. Let's make it work smarter.** 💪
