# Steps Structure (Vanilla MUI)

**Status:** Backlog (depends on v0.1.0 mapping)

---

## Problem

Component mapping done (v0.1.0). Now need working implementation of all 15 steps using vanilla MUI (no custom theming yet).

**Why vanilla first:** Validate structure works before layering visual customization.

---

## Scope

**In scope:**
- All 15 steps (desktop layout)
- Functional navigation (step 1 → step 15)
- Copy/content matches original ReX
- GitHub Pages deployment (public URL)

**Out of scope:**
- ReX theming (v0.3.0)
- Mobile/responsive (v0.4.0)
- Form validation (later)
- Backend integration (out of scope entirely)

---

## Tech Stack

**Build:**
- Vite (fast dev, static build)
- React 18
- Material-UI v5
- React Router v6

**Deployment:**
- GitHub Pages (via GitHub Actions)
- Auto-deploy on push to main

**Why Vite (not Storybook):**
- Simpler (just pages + routing)
- Faster builds
- Permalinks work naturally (/steps/7)
- Less overhead

---

## Success Criteria

- [ ] All 15 steps accessible via `/steps/:id`
- [ ] Component library page (`/components`) lists all mapped components
- [ ] GitHub Pages live (public URL works)
- [ ] Navigation flow matches original ReX
- [ ] Desktop layout only (mobile deferred to v0.4.0)

---

## Structure

```
src/
├── pages/
│   ├── Home.tsx                 # Landing (step list)
│   ├── Steps/
│   │   ├── Step01.tsx          # My Submissions
│   │   ├── Step02.tsx          # Progress Board
│   │   └── ...                 # Step03-15
│   └── Components.tsx           # Component library showcase
├── components/
│   ├── ReXButton.tsx           # MUI Button + ReX mapping
│   ├── ReXTextField.tsx        # MUI TextField + ReX mapping
│   └── ...
├── App.tsx                      # Router config
└── main.tsx
```

---

## Deployment

**GitHub Actions workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Result:** Push to main → auto-deploy to `https://{org}.github.io/rex-mui/`

---

## Next Steps

1. Create GitHub repo (`rex-mui` or similar)
2. Initialize Vite + React + MUI
3. Setup routing (/steps/:id)
4. Implement steps 1-5 (validate approach)
5. Configure GitHub Actions
6. Complete remaining steps (6-15)
