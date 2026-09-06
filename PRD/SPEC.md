# 找房配對助手 — rental-matcher — 規格計劃書 v3.0.2 (10-repo-fleet hardening)

> **v3.0.2 patch（2026-09-06 by Sean 10-repo-fleet）** —
> 對齊 fleet-wide 規格契約（SPEC §1–§19 + Definition of Done + 部署契約）。
> 本次變更為**程式面 / CI 面 / 工具面 hardening**，不變更 M1 SaaS MVP 產品 spec：
> - 新增 `eslint.config.mjs` + `lint` script（原本無 lint 設定）
> - 補上 `PRD/CHANGELOG.md`（v3.0.2 變更日誌）
> - 升級 GHA workflow（從無 → 4-job：lint / test / build / deploy to Pages）
> - 既有 React Sprint 1+2 程式碼、Vitest 11 cases、`web/public/dashboard.html` 307 行 mockup 全部保留

- 主版本：M1 SaaS MVP（Sprint 1+2）｜最後功能更新：2026-09-06｜維護者：Sean Li
- 原始碼：https://github.com/openclawsean024-create/rental-matcher
- 部署目標：GitHub Pages（`web/dist/`）
- 目標：見根目錄 [`GOAL.md`](../GOAL.md) — B2C 找房配對助手 5 個 P0：智慧配對 + 物件比較 + 預約看屋 + 收藏清單 + 看屋行程
- 商業化：NT$99/月 Premium
- **v3.0.2 patch（2026-09-06 Sean 10-repo-fleet batch 3E）**：程式面 / CI 面 / 工具面 hardening（見上方說明）

---

## 1. 產品概述

### 1.1 問題陳述
台灣租屋族在 591 / 信義租屋 / FB 租屋社團跳來跳去，面對 50+ 個物件無法快速比較、看了容易忘記、預約分散在 LINE 對話中。**找房配對助手**整合物件總覽 + 比較 + 看屋行程 + 收藏 + 訊息五大 P0 體驗。

### 1.2 目標使用者
| Persona | 工作情境 | 主要任務 |
|---|---|---|
| Primary — 北漂新鮮人 | 月薪 4-5 萬、找 2 房、預算 2-5 萬 | 3 天內看完 5 個物件、定 1 個 |
| Secondary — 換屋家庭 | 月薪 8-12 萬、找 3 房、預算 5-8 萬 | 一週內比較 10 個物件、預約 3 個看屋 |

### 1.3 核心價值主張
> 「找房配對助手是唯一整合『智慧配對 + 比較表 + 看屋行程 + 收藏 + 訊息』五件式的找房工具，幫你在 7 天內完成找房決策」

### 1.4 Non-Goals（明確不做）
- ❌ 跨平台比價（v1 MVP 不做，租屋比價是紅海）
- ❌ 黑名單資料庫（見 sibling repo `rental-aggregator`）
- ❌ 帳號系統（用 localStorage 模擬；M2 之後評估）
- ❌ 付費牆（M2 之後評估，目前免費）
- ❌ 房東 CRM（M3 之後評估）

---

## 2. 使用者場景與流程

### 2.1 使用者流程圖

```mermaid
flowchart LR
  A[進站] --> B[看物件總覽 3 筆]
  B --> C{喜歡?}
  C -->|是| D[加入收藏]
  C -->|否| B
  D --> E[物件比較]
  E --> F[預約看屋]
  F --> G[確認行程]
  G --> H[訊息聯繫]
```

### 2.2 主要場景

| 場景 | 輸入 | 輸出 | 成功條件 |
|---|---|---|---|
| 看物件總覽 | 進入首頁 | 3 筆 mockup 物件 | 看到房源標題、區域、價格、坪數 |
| 收藏 | 點 ❤ | 加入收藏清單 | localStorage 持久化 |
| 比較 | 進入 `/compare` | 並排 3 欄 | 看到屬性對比 |
| 看屋行程 | 進入 `/viewings` | 3 筆預設行程 | 可確認 / 新增 |
| 訊息 | 進入 `/messages` | 2 則對話 | 看到對話串 |

---

## 3. 功能需求（Sprint 1+2 shipped）

| FR | 名稱 | 優先級 | 狀態 |
|---|---|---|---|
| FR-001 | 物件總覽 (`ListingsPage`) | P0 | ✅ shipped |
| FR-002 | 物件比較 (`ComparePage`) | P0 | ✅ shipped |
| FR-003 | 看屋行程 (`ViewingsPage`) | P0 | ✅ shipped |
| FR-004 | 收藏清單 (`FavoritesPage`) | P0 | ✅ shipped |
| FR-005 | 訊息中心 (`MessagesPage`) | P0 | ✅ shipped |
| FR-006 | localStorage 持久化 | P0 | ✅ shipped |
| FR-007 | Mock 資料種子 (`seedDemoData`) | P0 | ✅ shipped |
| FR-008 | Vitest E2E 11 cases | P0 | ✅ shipped |
| FR-009 | 靜態 mockup `dashboard.html` | P0 | ✅ shipped |
| FR-010 | ESLint flat config | P1 | ✅ shipped (v3.0.2) |
| FR-011 | GHA 4-job CI | P1 | ✅ shipped (v3.0.2) |

---

## 4. Non-Functional Requirements

| 維度 | 需求 |
|---|---|
| Performance | 首屏 < 1.5s（純 SPA + localStorage） |
| Security | 純前端，無後端；資料全在 localStorage |
| Privacy | 個資不送 server（v3.0.2 確認） |
| Accessibility | WCAG 2.1 AA（語意化 header / nav / main / footer） |
| Browser | Modern evergreen（Chrome/Edge/Safari/Firefox） |

---

## 5. 技術架構

```
rental-matcher/
├── GOAL.md                  # 1 段 sprint 目標
├── README.md                # M1 SaaS MVP
├── web/                     # Vite + React 19 SPA
│   ├── index.html           # 進入點（meta refresh → dashboard.html）
│   ├── public/
│   │   └── dashboard.html   # 307 行靜態 mockup（CDN Tailwind，實際部署內容）
│   ├── src/
│   │   ├── App.tsx          # 5 routes
│   │   ├── main.tsx         # ReactDOM mount
│   │   ├── components/Layout.tsx
│   │   ├── lib/
│   │   │   ├── bootstrap.ts # localStorage 初始化
│   │   │   ├── db.ts        # CRUD over localStorage
│   │   │   └── types.ts     # RentalListing / Viewing
│   │   └── pages/           # 5 個 page components
│   ├── tests/
│   │   ├── setup.ts         # jsdom + localStorage shim
│   │   └── e2e.test.tsx     # 11 E2E cases
│   ├── vite.config.ts       # base: '/rental-matcher/'
│   └── package.json
└── PRD/
    ├── SPEC.md              # 本檔案
    └── CHANGELOG.md
```

### 5.1 Module Map
- `web/src/` — React 19 + TS 主要程式碼
- `web/tests/` — Vitest E2E
- `web/dist/` — Vite 構建產物（gitignored）
- `web/public/dashboard.html` — 307 行靜態 mockup（部署實際內容）
- `.github/workflows/` — CI

### 5.2 環境變數
- 無（純前端 / 離線優先）

### 5.3 降級策略
- localStorage 不可用 → 仍可運作，狀態不持久化
- 重新整理 → 從 localStorage 復原

---

## 6. Definition of Done

- [x] 功能 P0 全部實作（5 pages + 11 E2E cases）
- [x] `npm test` 11/11 全綠
- [x] `npm run build` 綠（tsc + vite）
- [x] `npm run typecheck` 0 error
- [x] `npm run lint` 0 error（v3.0.2 新增）
- [x] GHA CI 跑 4 jobs（lint / test / build / deploy to Pages）全綠
- [x] `dashboard.html` mockup 可在 GitHub Pages 直接看到

---

## 7. 部署契約

| 環境 | 目標 | 觸發 |
|---|---|---|
| Production | GitHub Pages（`web/dist/`） | push to main |
| Preview | Per-PR | PR opened |

### 7.1 GHA Workflow
- `.github/workflows/ci.yml`
- jobs: lint / test / build / deploy
- deploy: `pages`（`actions/deploy-pages@v4` + `actions/upload-pages-artifact@v3`）

### 7.2 環境變數
- 無需 server-side secret

---

## 8. Out of Scope（不做的）

- 不做帳號系統（M2 評估）
- 不做付費牆（M2 評估）
- 不做原生 App
- 不做跨平台比價（紅海不做）
- 不做黑名單（sibling repo `rental-aggregator`）

---

## 9. 變更日誌

見 [`PRD/CHANGELOG.md`](PRD/CHANGELOG.md)
