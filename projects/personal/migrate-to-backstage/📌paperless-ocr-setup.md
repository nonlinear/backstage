# Paperless OCR # Paperless OCR & Auto-tagging Setup Auto-tagging Setup

## ✅ Idiomas OCR instalados:
- eng (English)
- por (Portuguese) ← NOVO!
- spa (Spanish)
- fra (French)
- deu (German)
- ita (Italian)

## 🔧 Configuração necessária (via Web UI):

### 1. **OCR Language**
Settings → General → OCR Language
```
eng+por
```
(Inglês + Português)

### 2. **Auto-tagging** (via Paperless UI)
Settings → Matching → Add tag matching rules

**Exemplos:**
- "tax" → tag: `tax`
- "mortgage" → tag: `mortgage`
- "credit card" → tag: `finance`
- "W-2" → tag: `tax`, `income`

### 3. **Document Types** (opcional)
Settings → Document Types → Create types:
- Tax Documents
- Financial Statements
- Medical Records
- Receipts

### 4. **Correspondents** (remetentes)
Settings → Correspondents → Add:
- IRS
- NYS Tax
- Mortgage Company
- Credit Card Companies

---

## 🎨 **NEXT: Configurar via Web UI**

Abra http://192.168.1.152:8010 e:

1. Settings → General
   - OCR Language: `eng+por`
   - Save

2. Settings → Tags
   - Create tags: tax, finance, mortgage, medical, personal
   - Set colors!

3. Settings → Matching
   - Add auto-tag rules (match text → assign tag)

---

**Quer que eu abra o browser e faça isso via Selenium?** 🌐
