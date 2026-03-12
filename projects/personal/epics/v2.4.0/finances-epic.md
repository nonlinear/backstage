# 💰 Finances Epic - Intelligent Money Management

**Status:** 🟢 Active  
**Priority:** HIGH (debt negotiation time-sensitive!)  
**Owner:** User + OpenClaw  
**Timeline:** Q1 2026

---

## 🎯 GOAL

Build comprehensive financial automation and intelligence:
1. **NYS Tax Debt Negotiation** (URGENT - call weekday mornings!)
2. **Mortgage Optimization** (smart prepayment strategies)
3. **Finance Tips & Automation** (Paperless, budgeting, tracking)

---

## 📋 PHASE 1: NYS Tax Debt Resolution (URGENT!)

### **Reminders Found:**
- ☎️ **Call NYS Department: 518-457-5434** (weekday mornings!)
- ☎️ **Call "Your voice at the Tax Department": 518-530-4357**
- 📄 "Compromise in lieu of taxes"
- 📄 "NYS payment plan"
- 📄 "Send 2023 tax returns to Jenn"

### **Action Items:**
- [ ] **Call 518-457-5434** (NYS main) - weekday morning
- [ ] **Call 518-530-4357** ("Your voice" dept) - weekday morning
- [ ] Research "Compromise in Lieu of Taxes" (NYS equivalent to IRS OIC)
- [ ] Gather 2023 tax returns for Jenn
- [ ] Collect all NYS tax documentation
- [ ] Mail required paperwork

### **Resources Needed:**
- [ ] NYS Tax Department official guides (download from website)
- [ ] "How To Get IRS Tax Relief" book (principles apply to NYS)
- [ ] Tax attorney consultation? (for large debt)
- [ ] Financial hardship documentation

### **OpenClaw Support:**
- Morning reminder: "Call NYS today?" (weekday AM only)
- Document prep checklist
- Track negotiation notes
- Auto-upload docs to Paperless (tag: NYS, tax, 2023)

---

## 📋 PHASE 2: Mortgage Optimization

### **Smart Prepayment Strategies:**

#### **1. Bi-Weekly Payment Hack**
- Pay half mortgage every 2 weeks (26 payments/year = 13 months)
- Extra month/year → shaves ~7 years off 30-year mortgage
- **Math:** 26 half-payments = 13 full payments (vs 12)
- **Savings:** Tens of thousands in interest

#### **2. Principal-Only Extra Payments**
- Even $100/month extra → principal reduction
- Target: First payment of year (max interest saved)
- **Calculator needed:** Show savings over loan life

#### **3. Recast vs Refinance**
- **Recast:** Lump sum → lower payment (same rate, small fee)
- **Refinance:** New loan (lower rate, closing costs)
- **When:** Rates drop 0.75%+, or large windfall available

#### **4. Avalanche Method (Multi-Debt)**
- Pay minimums on all debts
- Extra $ → highest interest rate first
- Mortgage usually lowest rate → pay LAST (focus credit cards first!)

#### **5. Offset Account (if available)**
- Keep cash in offset account (reduces interest calculated)
- Liquidity + savings (vs locked in principal)

### **Mortgage Intel Needed:**
- [ ] Current rate? Term remaining? Balance?
- [ ] Other debts? (credit card APR, student loans, car loans)
- [ ] Monthly budget surplus? (how much extra available?)
- [ ] Refinance eligibility? (credit score, equity %)

### **Tools to Build:**
- [ ] Mortgage prepayment calculator (show scenarios)
- [ ] Debt avalanche tracker (prioritize highest APR)
- [ ] Recast vs refinance decision tree

---

## 📋 PHASE 3: Overall Finance Tips & Automation

### **A. Paperless-ngx Integration**
**Goal:** Auto-organize ALL financial documents

#### **Auto-Upload Workflow:**
1. Scrape IRS/NYS portals → download W2, 1099, tax docs
2. Auto-upload to Paperless → tag by year, type, source
3. OCR search: "show me all 2024 mortgage statements"
4. Retention rules: Tax docs (7 years), receipts (1 year)

#### **Document Categories:**
- **Tax:** W2, 1099, returns, notices (tag: year, IRS/NYS/federal)
- **Mortgage:** Statements, closing docs, escrow (tag: year, property)
- **Bills:** Utilities, insurance, subscriptions (tag: vendor, month)
- **Receipts:** Deductible expenses, warranty items (tag: category, vendor)
- **Banking:** Statements, investment reports (tag: institution, quarter)
- **🇧🇷 Brazilian Identity:** Passport, RG, CPF, voter registration (tag: brazil, identity)

#### **Setup Tasks:**
- [ ] Configure Paperless API access (http://192.168.1.152:8010/api)
- [ ] Build auto-upload script (Python or MCP)
- [ ] Set up tags & correspondents (IRS, NYS, bank names, Brazil consulate, etc.)
- [ ] Create retention policy (auto-delete old receipts)
- [ ] **Upload Brazilian documents:** Scan/photo current passport (YC132899), RG, any other Brazilian docs you have
  - Tag: brazil, identity, passport, cpf
  - Purpose: Safe backup before renewal, easy access for e-consular upload

---

### **B. Actual Budget Integration**
**Already running:** http://192.168.1.152:5006

#### **Smart Budgeting:**
- [ ] Link bank accounts (auto-import transactions)
- [ ] Category setup: Fixed (mortgage, insurance), Variable (groceries, gas), Goals (savings, debt payoff)
- [ ] Monthly budget review automation (OpenClaw pulls report)
- [ ] Spending alerts: "You're 80% through grocery budget"

#### **Debt Payoff Tracking:**
- [ ] Add all debts (balance, APR, minimum payment)
- [ ] Avalanche calculator (which to pay first)
- [ ] Progress visualization (debt-free date projection)

---

### **C. Tax Automation (Read-Only)**
**Goal:** Never manually download tax docs again!

#### **IRS Portal Scraper:**
- Selenium login → Download W2, 1099, transcripts
- Check refund status → Auto-notify
- **NO AUTO-SUBMIT** (review & file manually!)

#### **NYS Portal Scraper:**
- Login → Download 1099-G, property tax, etc.
- Monitor debt status → Alert on changes

#### **Setup Tasks:**
- [ ] Research IRS.gov login flow (2FA handling?)
- [ ] Research NYS Tax portal login
- [ ] Build Selenium read-only scraper
- [ ] Schedule: Monthly (or on-demand)
- [ ] Output: Auto-upload to Paperless

---

### **D. Finance Tips (Ongoing Learning)**

#### **Books to Read:**
- ✅ "How To Get IRS Tax Relief" (David Hickam)
- ✅ "Happy About Tax Relief" (OIC software)
- 📚 "The Total Money Makeover" (Dave Ramsey - debt snowball)
- 📚 "Your Money or Your Life" (FIRE movement)
- 📚 "I Will Teach You to Be Rich" (Ramit Sethi - automation)

#### **Key Concepts:**
- **Emergency Fund:** 3-6 months expenses (BEFORE extra mortgage payments!)
- **Debt Avalanche vs Snowball:** Math (avalanche) vs Psychology (snowball)
- **Tax-Advantaged Accounts:** Max 401k/IRA before taxable investing
- **Opportunity Cost:** Prepay 3.5% mortgage vs invest 8% return? (invest wins!)

#### **OpenClaw Finance Coach:**
- Weekly finance check-in: "How's budget this week?"
- Debt payoff milestones: "Credit card XYZ is 50% paid!"
- Tax deadline reminders: "Q1 estimated taxes due Apr 15"
- Smart questions: "Should I refi or recast?" (provide decision tree)

---

## 🛠️ TECHNICAL ARCHITECTURE

### **Data Sources:**
1. **Paperless-ngx:** Document storage (http://192.168.1.152:8010)
2. **Actual Budget:** Transaction tracking (http://192.168.1.152:5006)
3. **Apple Reminders:** Task/deadline tracking (via `remindctl`)
4. **IRS/NYS portals:** Tax doc scraping (Selenium)
5. **Bank APIs:** (future - Plaid integration?)

### **OpenClaw Tools:**
- **Paperless API client:** Upload, search, tag documents
- **Budget parser:** Pull Actual Budget reports
- **Reminder integration:** Proactive deadline alerts
- **Tax scraper:** Download docs on schedule
- **Mortgage calculator:** Prepayment scenario analysis

### **Privacy & Security:**
- ✅ All local (Paperless on NAS, Actual self-hosted)
- ✅ No cloud storage of sensitive docs
- ✅ Read-only automation (no auto-submission to IRS/NYS)
- ✅ Encrypted backups (Paperless → NAS → offsite)

---

## 📊 SUCCESS METRICS

### **Phase 1 (NYS):**
- [ ] Called both NYS numbers (518-457-5434, 518-530-4357)
- [ ] Negotiation started (payment plan or compromise)
- [ ] All docs uploaded to Paperless (organized, tagged)

### **Phase 2 (Mortgage):**
- [ ] Prepayment strategy chosen (bi-weekly, lump sum, etc.)
- [ ] Calculator built (show savings over loan life)
- [ ] First extra payment made!

### **Phase 3 (Automation):**
- [ ] Paperless auto-upload working (tax docs, bills)
- [ ] Actual Budget synced & reviewed monthly
- [ ] Tax scraper deployed (IRS + NYS)
- [ ] Finance tips delivered weekly (via heartbeat)

---

## 🚀 NEXT STEPS (IMMEDIATE)

1. **TODAY:** Review this epic with user, prioritize phases
2. **THIS WEEK (weekday AM):** Call NYS (518-457-5434, 518-530-4357)
3. **THIS WEEK:** Gather mortgage details (rate, balance, extra $ available)
4. **NEXT WEEK:** Build Paperless upload script (tax docs first!)
5. **ONGOING:** Weekly finance check-ins (via heartbeat)

---

## 💡 KILLER APPS

1. **Voice-triggered tax search:** "Show me all 2024 W2s" → Paperless OCR search
2. **Morning reminder:** "NYS call today?" (weekday AM only, until completed)
3. **Mortgage scenario:** "What if I pay $200 extra/month?" → Calculator output
4. **Debt freedom countdown:** "You're 67% to credit card freedom!" (motivational!)
5. **Auto-tax filing prep:** "Here's your 2024 tax checklist" (W2s, 1099s, deductions ready)

---

**This is your money. Let's make it work smarter.** 💪

---

## 📋 PHASE 4: Wiley Work - Time Tracking & Reporting

### IEEE Timelog Workflow (2026-02-09)
**Status:** ✅ Active

**What it does:**
- Track billable hours for IEEE/Wiley projects
- Offset pending hours across months (max 10h/week)
- Monthly review (5 days before month-end)

**Current state:**
- 43h pending (Nov 2025 - Jan 2026)
- 25h parked in January (Mon/Fri, AUTP-646 + AUTP-165)
- 18h remaining (Feb 10-21 distribution)

**Process:**
1. Work happens (document in `~/Documents/notes/wiley/IEEE_timelog.md`)
2. Every Monday: Claw fills pending offset hours (always in PAST)
3. 5 days before month-end: Review pending, plan distribution

**Limits:**
- Max 10h/week retroactive logging
- Always log in past (never future dates)
- Distribute across Mon/Wed/Fri for realism

**Documentation:**
- Main doc: `~/Documents/notes/wiley/IEEE_timelog.md`
- Parity: `~/.openclaw/workspace/parity/jira.md`
- Reminder: Feb 23 (monthly review)

**Future improvement (pending policy change):**
- Scan Jira tasks with `billable` flag
- Auto-detect WHEN work was done
- Auto-map to WHICH task
- Claw suggests hours, Nicholas approves

---

### Excel Paridade - Design Discrepancy (2026-02-09)
**Status:** ✅ Working solution found

**Problem:** OneDrive sync too slow for real-time paridade (2-10min delays)

**Failed approaches (documented in `parity/onedrive.md`):**
1. ❌ OneDrive sync + browser reload (2-10min)
2. ❌ Temp files strategy (still 2min sync)
3. ❌ Chrome Relay iframe content (empty snapshots)
4. ❌ Tab renaming via openpyxl (local only, doesn't sync)
5. ❌ Force sync methods (no improvement)

**✅ Working solution:** Local Excel app + kill/reopen
- Edit file via Python (openpyxl)
- `killall "Microsoft Excel"`
- `open -a "Microsoft Excel" <file>`
- **Instant paridade** (both see same local file)

**Trade-offs:**
- ✅ Instant paridade (zero sync delay)
- ✅ 100% reliable
- ⚠️ Excel shows "Open recovered workbooks?" warning (ignore)
- ⚠️ AutoSave must be OFF

**Use case:** Wiley Design Discrepancy Excel (review with Lara)

**Timeline:**
- **Now:** Local Excel (works, acceptable warnings)
- **Future:** If OneDrive sync < 10s, reconsider
- **Don't retry:** Sync methods tested today (documented)

