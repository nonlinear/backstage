# v0.17.0 - Salesman 💰

**Status:** 💡 PROPOSED (2026-02-11)

**Goal:** Automação para compra e venda de produtos (price watching, eBay, marketplaces)

---

## Problem

**Manual work:**
- Tracking prices manually across multiple sites
- Missing deals (price dropped, didn't see it)
- No inventory management (what I own, what I want to sell)
- Listing items manually (eBay, Mercado Livre, etc.)
- No comparison across platforms (which site is cheapest?)

**Result:** Lost money (missed deals, sold too cheap, bought too expensive)

---

## Solution

**Automated workflows:**
1. **Price watching** - Monitor products, alert when price drops
2. **Inventory tracking** - What I own, what I want to sell, target prices
3. **Marketplace integration** - eBay listings, sales notifications
4. **Price comparison** - Best deal across platforms
5. **Alert system** - Telegram notifications for price drops, sales, etc.

---

## Use Cases

### Buy Flow
1. Add product to watchlist (URL + target price)
2. System monitors price daily
3. Price drops below target → Telegram alert
4. Nicholas decides: buy now or wait

### Sell Flow
1. Add item to inventory (photo, description, min price)
2. Create listing on eBay (auto-post via API)
3. Monitor listing (views, watchers, bids)
4. Sale detected → Telegram notification + shipping reminder

### Price Comparison
1. Nicholas asks: "Qual o melhor preço pra [product]?"
2. System checks: eBay, Amazon, AliExpress, Temu, Shop.app
3. Returns: cheapest + shipping + estimated delivery

---

## Tech Stack (TBD)

**Already have:**
- **changedetection.io** (running on NAS, port 5555) - price watch for sites without API
- **SearXNG** (running on NAS, port 8888) - meta-search for product discovery
- **Telegram** (notifications, alerts)

**Need to research:**
- **eBay API** - listing automation, price tracking, sales notifications
- **Shop.app API** - price comparison, deal alerts
- **AliExpress API** - product search, price tracking
- **Temu API** - (if exists)
- **Amazon API** - (if accessible without seller account)

**Data storage:**
- **Airtable?** (inventory, watchlist, sales history)
- **SQLite?** (local, lightweight)
- **Spreadsheet?** (simple, portable)

---

## Tasks

### Phase 1: Research (1-2 days)
- [ ] eBay API capabilities (read docs, get API key)
- [ ] changedetection.io integration (test price watch)
- [ ] Shopping APIs (Shop.app, AliExpress, Temu - which have APIs?)
- [ ] Data schema (inventory + watchlist fields)

### Phase 2: Price Watching (3-4 days)
- [ ] Add product to watchlist (URL, target price, notes)
- [ ] changedetection.io monitors price
- [ ] Parse price changes (extract $ from HTML)
- [ ] Alert when price < target (Telegram notification)
- [ ] Test with 3-5 products

### Phase 3: Inventory Tracking (2-3 days)
- [ ] Design schema (item, photo, description, min price, status)
- [ ] Add items to inventory
- [ ] View inventory (CLI? Web UI?)
- [ ] Mark as sold/donated/trashed

### Phase 4: eBay Integration (1 week)
- [ ] eBay API setup (developer account, keys)
- [ ] Create listing via API (title, description, price, photo)
- [ ] Monitor listing (views, watchers)
- [ ] Detect sale (webhook? polling?)
- [ ] Notify on sale (Telegram)

### Phase 5: Price Comparison (3-4 days)
- [ ] Query multiple platforms (eBay, Amazon, AliExpress, etc.)
- [ ] Parse prices + shipping
- [ ] Rank by total cost
- [ ] Return cheapest option

### Phase 6: Automation (1 week)
- [ ] Daily price check (cron job)
- [ ] Weekly inventory review (remind to list items)
- [ ] Monthly sales report (what sold, revenue)

---

## Success Criteria

- ✅ Price alerts work (product drops below target → Telegram notification)
- ✅ eBay listing created via command (no manual web UI)
- ✅ Price comparison across 3+ platforms
- ✅ Inventory visible (what I own, what I want to sell)
- ✅ Sales notifications (item sold → Telegram alert)

---

## Open Questions

1. **Data storage:** Airtable vs SQLite vs Spreadsheet?
2. **eBay API:** Do we need seller account? Cost?
3. **Shopping APIs:** Which platforms have public APIs?
4. **Price parsing:** changedetection.io reliable enough, or need custom scraping?
5. **Photos:** Where to store? NAS? Imgur? eBay hosting?

---

## Notes

- changedetection.io already running - test first before building custom
- Nicholas prefers: Temu > Shop.app > AliExpress >> Amazon (avoid Amazon)
- Telegram notifications = primary alert method
- Voice interface = future (v2.0 - "quanto tá custando X?")

---

**Created:** 2026-02-11  
**Last Updated:** 2026-02-11
