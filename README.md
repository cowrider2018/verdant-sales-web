# Verdant · 森林風格元件庫與示範網頁

一個 shadcn-ui 風格的 monorepo：一套可重用的森林風格 React 元件庫（`@verdant/ui`），
搭配多個各自獨立、各自部署到 GitHub Pages 子路徑的示範網頁。視覺動畫豐富、中低飽和度綠／棕色系，
所有圖片／影片皆為「標示尺寸的佔位符」，方便日後替換真實素材。

## 線上預覽

| 網頁 | 說明 | 網址 |
| --- | --- | --- |
| 展示廊 | 元件庫總覽 + 連到各示範站 | <https://cowrider2018.github.io/verdant-web-ui/> |
| 電商站 | 森林選物電商（首頁／選物／商品詳情／購物車） | <https://cowrider2018.github.io/verdant-web-ui/sales-web> |
| 旅館預約站 | 森林旅宿線上預約（房型／詳情／日期選擇／結帳） | <https://cowrider2018.github.io/verdant-web-ui/booking-web> |
| 個人形象站 | 創意設計師單頁作品集（Hero／作品／經歷／聯絡） | <https://cowrider2018.github.io/verdant-web-ui/portfolio-web> |

## 結構

```
verdant-web-ui/
├─ packages/
│  └─ ui/            @verdant/ui — 元件庫（元件、設計 tokens、基底樣式）
└─ examples/
   ├─ gallery/       展示廊根頁     base /verdant-web-ui/
   ├─ sales-web/     電商示範站     base /verdant-web-ui/sales-web/
   ├─ booking-web/   旅館預約示範站  base /verdant-web-ui/booking-web/
   └─ portfolio-web/ 個人形象示範站  base /verdant-web-ui/portfolio-web/
```

元件庫以 **npm workspaces** 直接被各示範站引用原始碼（`import { ... } from '@verdant/ui'`），
無需獨立建置步驟，Vite 即時編譯。各示範站採 **HashRouter**，確保在 GitHub Pages 子路徑下深層連結可用。

## 技術棧

- **Vite + React** — 建置與開發
- **React Router（HashRouter）** — 各示範站路由
- **Framer Motion** — 全站動畫
- **npm workspaces** — monorepo 套件管理

## 快速開始

```bash
npm install            # 根目錄安裝（建立 workspaces 連結）

npm run dev:gallery    # 開發 — 展示廊
npm run dev:sales      # 開發 — 電商站
npm run dev:booking    # 開發 — 旅館預約站
npm run dev:portfolio  # 開發 — 個人形象站

npm run build          # 建置全部示範站
```

## 元件庫

詳見 [`packages/ui/README.md`](packages/ui/README.md)。提供 `MediaPlaceholder`、`MagneticButton`、
`Parallax`、`Reveal`、`SectionDivider`、`SunFlare`、`LeafMark`，形象站常用裝飾／展示件
`GrainOverlay`、`FloatingLeaves`、`Marquee`、`TiltCard`、`AnimatedCounter`、`Avatar`，
表單元件 `Field`、`TextInput`、`DateField`、`Select`、`Textarea` 與 `formatPrice`，以及 `theme.css`／`primitives.css`。

## 部署

推上 `main` 後，GitHub Actions（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）會：
分別以各自的 `base` 建置三個示範站 → 組裝成單一 `dist`（展示廊放根、兩站放各自子資料夾）→ 發佈到 GitHub Pages。

## 說明

純前端假資料，不接後端；圖片／影片以佔位符標尺寸交付，日後替換即可。
