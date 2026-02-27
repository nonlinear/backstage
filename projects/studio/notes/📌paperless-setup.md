# Paperless-ngx Integration

**Status:** ✅ Ready to configure  
**API:** http://192.168.1.152:8010/api  
**Access:** Python API + MCP (mcporter)

---

## 🔑 Setup (DO THIS FIRST!)

### 1. Get API Token

**Option A: Web UI (easiest)**
1. Open http://192.168.1.152:8010
2. Login
3. Settings → API Tokens
4. "Generate new token"
5. Copy token

**Option B: SSH + Docker**
```bash
ssh nonlinear@192.168.1.152
sudo docker exec -it paperless-webserver python manage.py drf_create_token YOUR_USERNAME
```

### 2. Add to .env
```bash
# In ~/.openclaw/workspace/.env
PAPERLESS_URL=http://192.168.1.152:8010
PAPERLESS_TOKEN=your_token_here
```

---

## 🐍 Python API Client

**Script:** `~/.openclaw/workspace/backstage/scripts/paperless_client.py`

### Quick Usage

```bash
# Upload single file
python backstage/scripts/paperless_client.py upload ~/Downloads/W2_2024.pdf \
  --tags tax,2024,W2 \
  --correspondent IRS

# Search documents (full-text + OCR)
python backstage/scripts/paperless_client.py search "mortgage 2024"

# Bulk upload directory
python backstage/scripts/paperless_client.py bulk ~/Downloads/tax_docs/ \
  --tags tax,2024
```

### Python Import

```python
from backstage.scripts.paperless_client import PaperlessClient

client = PaperlessClient()

# Upload
client.upload(
    "~/Downloads/W2.pdf",
    tags=["tax", "2024", "IRS"],
    correspondent="IRS",
    document_type="W2"
)

# Search
results = client.search("NYS tax 2023")
for doc in results:
    print(f"{doc['title']} - Tags: {doc['tags']}")

# Bulk upload
client.bulk_upload(
    "~/Downloads/tax_docs/",
    tags=["tax", "2024"],
    correspondent="IRS"
)
```

---

## 🔧 MCP Integration (mcporter)

### Setup

```bash
# Register Paperless as MCP server
mcporter add paperless \
  --url http://192.168.1.152:8010/api \
  --header "Authorization: Token YOUR_TOKEN_HERE"

# Test
mcporter list
```

### Chat Usage

Once configured, use via OpenClaw chat:

```
"Upload this PDF to Paperless, tag: groceries, receipt"
"Search Paperless for all 2024 W2s"
"Show me mortgage documents from last year"
"List all tags in Paperless"
```

---

## 📋 Common Workflows

### Tax Document Automation

```python
# After tax scraper downloads docs:
from pathlib import Path
from paperless_client import PaperlessClient

client = PaperlessClient()

# Upload IRS docs
for pdf in Path("~/Downloads/IRS/").glob("*.pdf"):
    client.upload(
        str(pdf),
        tags=["tax", "2024", "IRS"],
        correspondent="IRS",
        document_type="Tax Document"
    )

# Upload NYS docs
for pdf in Path("~/Downloads/NYS/").glob("*.pdf"):
    client.upload(
        str(pdf),
        tags=["tax", "2024", "NYS"],
        correspondent="NYS Tax Department",
        document_type="Tax Document"
    )
```

### Monthly Bills

```bash
# Upload all bills from email downloads
python paperless_client.py bulk ~/Downloads/bills/ \
  --tags bills,january,2024
```

---

## 🏷️ Recommended Tags

**Tax:**
- `tax`, `2024`, `2023`, etc.
- `IRS`, `NYS`, `federal`, `state`
- `W2`, `1099`, `return`, `transcript`

**Mortgage:**
- `mortgage`, `2024`
- `statement`, `escrow`, `closing`
- `property-tax`

**Bills:**
- `bills`, `receipt`
- `utilities`, `insurance`, `subscription`
- Vendor name (e.g., `verizon`, `geico`)

**Banking:**
- `banking`, `investment`
- Institution name
- `statement`, `quarterly`, `annual`

---

## 🔄 Retention Rules

Configure in Paperless UI (Settings → Workflow):

- **Tax docs:** Keep 7 years
- **Receipts:** Keep 1 year (unless warranty item)
- **Bills:** Keep 2 years
- **Mortgage:** Keep forever

---

## 🚀 Next Steps

1. **Get token** → Add to `.env`
2. **Test upload:** `python paperless_client.py upload test.pdf --tags test`
3. **Configure MCP:** `mcporter add paperless ...`
4. **Test search:** Search via chat or CLI
5. **Build tax scraper:** Auto-download → auto-upload!

---

## 📚 API Reference

Full Paperless API docs: http://192.168.1.152:8010/api/docs/

**Endpoints we use:**
- `POST /api/documents/post_document/` - Upload
- `GET /api/documents/?query=...` - Search
- `GET /api/tags/` - List tags
- `POST /api/tags/` - Create tag
- `GET /api/correspondents/` - List correspondents
- `POST /api/correspondents/` - Create correspondent

---

**Ready to configure when you get the token!** 🔑
