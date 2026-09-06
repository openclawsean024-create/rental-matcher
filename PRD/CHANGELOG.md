# 變更日誌 (CHANGELOG)

> 維護者：Sean Li（rental-matcher owner）
> 對齊 10-repo-fleet fleet-wide 規格契約

---

## v3.0.2 — 2026-09-06 — `Sean 10-repo-fleet` batch 3E

> 程式面 / CI 面 / 工具面 hardening，**不變更 M1 SaaS MVP 產品 spec**。

### Changed
- **`PRD/SPEC.md`**：新增 v3.0.2 規格書（11 個 FRs / 5 NFRs / Pages 部署契約）
- **`PRD/CHANGELOG.md`**：本檔案
- **`.github/workflows/ci.yml`**：新增 4-job CI（lint / test / build / deploy to Pages）
- **`web/eslint.config.mjs`**：新增 ESLint flat config（@typescript-eslint 直接設定，~95 行）
- **`web/package.json`**：新增 `lint` script + 補安裝 `eslint@^9` / `@typescript-eslint/parser` / `@typescript-eslint/eslint-plugin` devDeps

### Verification（v3.0.2 完成時的狀態）
- `npm test` — **11 / 11 passed**（1 test file，0.44s）
- `npm run typecheck` — **0 error**（tsc --noEmit）
- `npm run lint` — **0 error, 0 warning**（eslint flat config）
- `npm run build` — **OK**（Vite 6.4.3，dist 包含 `index.html` + `dashboard.html`）

### Files changed in v3.0.2
| 檔案 | 變更摘要 |
|---|---|
| `PRD/SPEC.md` | 新增 v3.0.2 規格書（~7KB） |
| `PRD/CHANGELOG.md` | 本檔案 |
| `.github/workflows/ci.yml` | 新增 4-job CI |
| `web/eslint.config.mjs` | 新增 ESLint flat config（~95 行） |
| `web/package.json` | 新增 `lint` script + 補 3 個 ESLint devDeps |

### 部署契約（不變）
- **Production target**：GitHub Pages（`web/dist/`）
- **Preview**：每個 PR（GitHub Pages preview）
- **CI 觸發**：push to `main` + 任何 `pull_request`
- **CI 內容**：lint → test → build → deploy to Pages（4 jobs）

### Known Good
- Vite build 產出 `web/dist/index.html`（meta refresh → dashboard.html）+ `web/dist/dashboard.html`（307 行靜態 mockup）
- 部署後瀏覽 `https://openclawsean024-create.github.io/rental-matcher/` 會 meta-refresh 到 `https://openclawsean024-create.github.io/rental-matcher/dashboard.html`，看到 mockup

---

## Sprint 1+2 — 2026-09-06 — M1 SaaS MVP shipped

> （既有記錄，由 repo owner 維護）

- 5 個 P0 pages（物件總覽 / 比較 / 看屋行程 / 收藏 / 訊息）
- 11 個 Vitest E2E cases
- `seedDemoData()` 預載 3 物件 + 3 看屋
- `web/public/dashboard.html` 307 行 mockup（CDN Tailwind + Noto Sans TC / JetBrains Mono）
- 部署：gh-pages branch via `npm run deploy`

---

> v3.0.2 完成於 **2026-09-06 by Sean 10-repo-fleet**（batch 3E, repo rank #30）
