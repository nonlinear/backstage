# melhor server - Comparação Completa



### 💰 Faixa $2,000 - $2,500

| Config | CPU | GPU | RAM | Storage | Preço | Qwen 14B | Qwen 32B | Qwen 72B | Nota |
|--------|-----|-----|-----|---------|-------|----------|----------|----------|------|
| M4 Max 14-core | 14-core | 32-core | 36GB | 512GB | **$1,799** | 22-28 t/s | 10-14 t/s ⚠️ | ❌ Swap | Tight RAM, 32B slow |
| M4 Max 14-core + 48GB | 14-core | 32-core | **48GB** | 512GB | **$2,159** | 26-32 t/s | 14-20 t/s ✅ | ❌ Swap | Good 14B/32B, no storage |
| **M4 Max 16-core** | **16-core** | **40-core** | **48GB** | **512GB** | **$2,249** | **28-36 t/s** | **16-22 t/s ✅** | **❌ Swap** | **✅ Best CPU/GPU for price** |

**Winner: M4 Max 16-core + 48GB ($2,249)**
- 16-core CPU + 40-core GPU = melhor performance nesta faixa
- 48GB RAM suficiente pra Qwen 14B (28-36 t/s) e 32B (16-22 t/s) smooth
- 72B não roda (precisa 64GB mínimo)
- Storage: usar NAS/externo (economiza $90 vs 1TB)
- **Best value under $2.5k**

---

### 💰 Faixa $2,500 - $3,000

| Config | CPU | GPU | RAM | Storage | Preço | Qwen 14B | Qwen 32B | Qwen 72B | Nota |
|--------|-----|-----|-----|---------|-------|----------|----------|----------|------|
| M4 Max 14-core + 48GB + 1TB | 14-core | 32-core | 48GB | **1TB** | **$2,339** | 26-32 t/s | 14-20 t/s ✅ | ❌ Swap | Storage good, CPU slower |
| M4 Max 14-core + 64GB | 14-core | 32-core | **64GB** | 512GB | **$2,519** | 30-38 t/s | 20-28 t/s ✅ | 8-12 t/s ⚠️ | 72B fits, slow |
| **M4 Max 16-core + 64GB** | **16-core** | **40-core** | **64GB** | **512GB** | **$2,609** | **32-42 t/s** | **22-30 t/s ✅** | **10-16 t/s ⚠️** | **✅ Best perf, no storage** |
| M4 Max 14-core + 64GB + 1TB | 14-core | 32-core | 64GB | 1TB | **$2,699** | 30-38 t/s | 20-28 t/s ✅ | 8-12 t/s ⚠️ | Slower CPU vs 16-core |

**Winner: M4 Max 16-core + 64GB ($2,609)**
- 16-core CPU + 40-core GPU = performance top nesta faixa
- 64GB RAM = Qwen 32B smooth (22-30 t/s), 72B funciona batch (10-16 t/s)
- Storage: NAS/externo (economiza $180 vs 1TB)
- **Best perf/$ in comparison** - Save $180, add storage later if needed

**Alternative: M4 Max 16-core + 64GB + 1TB ($2,789)** ⭐ **OVERALL SWEET SPOT**
- +$180 = 1TB local storage
- Mesma performance, mais conveniente
- **Recomendação geral: esta config é o melhor custo/benefício de toda comparação**

---

### 💰 Faixa $3,000 - $4,000

| Config | CPU | GPU | RAM | Storage | Preço | Qwen 14B | Qwen 32B | Qwen 72B | Nota |
|--------|-----|-----|-----|---------|-------|----------|----------|----------|------|
| **M4 Max 16-core + 64GB + 1TB** | **16-core** | **40-core** | **64GB** | **1TB** | **$2,789** | **32-42 t/s** | **22-30 t/s ✅** | **10-16 t/s ⚠️** | **✅ Best overall value** |
| M4 Max 16-core + 64GB + 2TB | 16-core | 40-core | 64GB | **2TB** | **$3,329** | 32-42 t/s | 22-30 t/s ✅ | 10-16 t/s ⚠️ | Same perf, +storage |
| M3 Ultra | **28-core** | **60-core** | 64GB | 1TB | **$3,599** | 40-55 t/s | 25-35 t/s ✅ | 12-18 t/s ⚠️ | +25% perf, +$900 |

**Winner: M4 Max 16-core + 64GB + 1TB ($2,789)** ⭐
- 16-core CPU + 40-core GPU = same as $2.5k-$3k bracket winner
- 64GB RAM = Qwen 32B smooth (22-30 t/s), 72B batch (10-16 t/s)
- 1TB storage local
- **Best overall value** - Repetindo vencedor do bracket anterior por completude
- M3 Ultra ($3,599) = +$810 pra ganhar apenas +3-5 t/s no 32B (marginal)

**M3 Ultra só vale se:**
- Precisa extra 5-10 t/s no Qwen 32B (25-35 vs 22-30)
- Múltiplos models simultâneos (800 GB/s bandwidth vs 400 GB/s)
- 8 displays necessários
- **Senão:** M4 Max 16-core + 64GB + 1TB ($2,789) = **melhor escolha** (save $810)

---

### 💰 Faixa $4,000+

| Config | CPU | GPU | RAM | Storage | Preço | Qwen 14B | Qwen 32B | Qwen 72B | Nota |
|--------|-----|-----|-----|---------|-------|----------|----------|----------|------|
| M3 Ultra | 28-core | 60-core | 64GB | 1TB | **$3,599** | 40-55 t/s | 25-35 t/s ✅ | 12-18 t/s ⚠️ | 72B slow |
| M3 Ultra + 96GB | 28-core | 60-core | **96GB** | 1TB | **$3,959** | 45-60 t/s | 30-42 t/s ✅ | 16-24 t/s ✅ | 72B better |
| **M3 Ultra + 128GB** | **28-core** | **60-core** | **128GB** | **1TB** | **$4,319** | **50-65 t/s** | **35-48 t/s ✅** | **20-30 t/s ✅** | **✅ 72B smooth** |
| M3 Ultra + 2TB | 28-core | 60-core | 64GB | 2TB | **$4,139** | 40-55 t/s | 25-35 t/s ✅ | 12-18 t/s ⚠️ | Wrong upgrade |
| M3 Ultra + 128GB + 2TB | 28-core | 60-core | 128GB | 2TB | **$4,859** | 50-65 t/s | 35-48 t/s ✅ | 20-30 t/s ✅ | +storage, +$600 |
| M3 Ultra 32-core | **32-core** | **80-core** | 128GB | 1TB | **$4,949** | 55-70 t/s | 40-55 t/s ✅ | 25-35 t/s ✅ | Better CPU/GPU |
| M3 Ultra 32-core + 2TB | 32-core | 80-core | 128GB | 2TB | **$5,489** | 55-70 t/s | 40-55 t/s ✅ | 25-35 t/s ✅ | +storage |
| M3 Ultra 32-core + 192GB | 32-core | 80-core | **192GB** | 1TB | **$5,669** | 60-75 t/s | 45-60 t/s ✅ | 30-40 t/s ✅ | RAM overkill |
| M3 Ultra 32-core + 192GB + 2TB | 32-core | 80-core | 192GB | 2TB | **$6,209** | 60-75 t/s | 45-60 t/s ✅ | 30-40 t/s ✅ | Max config |

**Winner: M3 Ultra + 128GB ($4,319)**
- 72B finalmente usável (20-30 t/s)
- 128GB futureproof
- 1TB suficiente

**Só upgrade pra 32-core ($4,949) se:**
- Precisa +5-10 t/s extra (32-core CPU)
- Budget >$5k tranquilo

**Above $5k = diminishing returns**

---

## Legenda

### Performance (tokens/segundo)
- ✅ **>20 t/s**: Conversational, smooth interactive
- ⚠️ **10-20 t/s**: Usable batch, slow interactive
- ❌ **<10 t/s** or **Swap**: Unusable (swap thrashing)

### TTFT (Time to First Token)
- **<200ms**: Feels instant
- **200-400ms**: Acceptable
- **>400ms**: Noticeable delay

### Context Window Assumptions
- All estimates assume **32k context** (standard for Qwen 2.5)
- KV cache included in RAM calculations
- Q4_K_M quantization (balance quality/speed)

---

## Sweet Spots por Budget

### Budget < $2,500
**Recomendação: M4 Max Base + 48GB RAM ($2,159)**
- Qwen 14B: 26-32 t/s ✅
- Qwen 32B: 14-20 t/s ✅
- Save $200 on storage (use external/NAS)

### Budget $2,500 - $3,000
**Recomendação: M4 Max 14-core + 64GB + 1TB ($2,699)**
- Qwen 32B: 20-28 t/s ✅
- Qwen 72B: 8-12 t/s ⚠️ (slow but works)
- Balanced storage for local data

### Budget $3,000 - $3,500
**Recomendação: M4 Max 16-core + 64GB + 1TB ($2,789)**
- Qwen 32B: 22-30 t/s ✅
- Qwen 72B: 10-16 t/s ⚠️ (usable batch)
- Better CPU for multi-tasking

### Budget $3,500 - $4,500
**Recomendação: M3 Ultra Base ($3,599)**
- Qwen 32B: 25-35 t/s ✅ (smooth)
- Qwen 72B: 12-18 t/s ⚠️ (slow but functional)
- 800 GB/s bandwidth boost
- 8 displays (overkill for most)

### Budget > $4,500
**Recomendação: M3 Ultra 28-core + 128GB ($4,319)**
- Qwen 72B: 20-30 t/s ✅ (finally usable)
- Future-proof RAM
- Unless you NEED 72B daily: **overkill**

---

## Performance/$1000 Efficiency

| Config | Preço | Qwen 32B t/s | t/s per $1k | Winner? |
|--------|-------|--------------|-------------|---------|
| M4 Max 48GB | $2,159 | 14-20 | **5.8-8.3** | ✅ Best value |
| M4 Max 64GB (14-core) | $2,699 | 20-28 | **6.7-9.3** | ✅ Best perf/$ |
| M4 Max 64GB (16-core) | $2,789 | 22-30 | **7.1-9.7** | ✅ Best overall |
| M3 Ultra 64GB | $3,599 | 25-35 | 6.3-8.8 | Marginal gain |
| M3 Ultra 128GB | $4,319 | 35-48 | 7.3-10.0 | Good, but expensive |

**Winner: M4 Max 16-core + 64GB ($2,789)**
- Best t/s per $1k (7.1-9.7)
- Qwen 32B smooth (22-30 t/s)
- Qwen 72B works (10-16 t/s)

---

## When M3 Ultra Makes Sense

**ONLY IF:**
- ✅ You run Qwen 72B **daily** (not occasional)
- ✅ Budget >$4k is comfortable
- ✅ Need 8 displays (creative work)
- ✅ Want 800 GB/s bandwidth for multi-model inference

**Otherwise:** M4 Max 64GB saves $900-1,800 for marginal loss.

---

## TCO (5 Years)

| Config | Upfront | Power (5yr) | Total | Notes |
|--------|---------|-------------|-------|-------|
| M4 Max 48GB | $2,159 | $197 | **$2,596** | 15W idle, $0.15/kWh |
| M4 Max 64GB | $2,789 | $197 | **$3,296** | 15W idle |
| M3 Ultra 64GB | $3,599 | $328 | **$4,327** | 25W idle |
| M3 Ultra 128GB | $4,319 | $328 | **$5,127** | 25W idle |

**Power calc:** 24/7 idle @ $0.15/kWh × 5 years

---

## Final Recommendation 🏴

**$2,789 - M4 Max 16-core + 64GB + 1TB**

**Why:**
- ✅ Qwen 14B: 32-42 t/s (daily driver, smooth)
- ✅ Qwen 32B: 22-30 t/s (conversational)
- ✅ Qwen 72B: 10-16 t/s (slow but works for batch)
- ✅ 1TB storage (EPUBs + Docker fit)
- ✅ Best t/s per $1k (7.1-9.7)
- ✅ Save $900 vs M3 Ultra base

**Alternative if tight budget:** $2,339 (14-core + 48GB + 1TB)
- Lose Qwen 72B (swap hell)
- Qwen 32B slower (14-20 t/s vs 22-30 t/s)
- Save $500

**Alternative if money no object:** $4,319 (M3 Ultra 128GB)
- Qwen 72B smooth (20-30 t/s)
- Future-proof everything
- Costs $1,700 more for marginal gain
