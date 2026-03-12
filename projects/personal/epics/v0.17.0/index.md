# Salesman 💰

**Goal:** Automação para compra e venda de produtos (price watching, eBay, marketplaces).

**Problem:** Manual price tracking, missed deals, no inventory management, manual listings = lost money.

---

## Solution: Automated Workflows

1. **Price watching** - Monitor products, alert when price drops
2. **Inventory tracking** - What I own, what I want to sell, target prices
3. **Marketplace integration** - eBay listings, sales notifications
4. **Price comparison** - Best deal across platforms
5. **Alert system** - Telegram notifications (price drops, sales)

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

## Tech Stack

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
