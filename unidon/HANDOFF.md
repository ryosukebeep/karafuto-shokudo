# 樺太食堂 LP — Handoff Document

北海道・稚内市ノシャップ岬「樺太食堂」のランディングページ。サンプルデザインを忠実に再現することを目的に作成。和紙＋水彩の温かい和モダンテイスト。

---

## 📁 ファイル構成

| ファイル | 役割 |
|---|---|
| `Landing Page.html` | エントリー。React/Babel + CSS + JSXの読み込み |
| `styles.css` | 全スタイル（design tokens、layout、装飾） |
| `app.jsx` | 全React component（Header / Hero / About / Gallery / News / Access+Contact / Footer + Tweaks） |
| `wave-divider.jsx` | 波ディバイダーSVG（利尻富士・太陽・波） |
| `tweaks-panel.jsx` | Tweaksパネルのフレームワーク（変更不要） |

スクリプト読み込み順は `Landing Page.html` の末尾を参照。

---

## 🎨 デザインシステム

### カラートークン（`:root` in styles.css）

```css
--paper:    oklch(0.995 0.003 80);  /* 和紙ホワイト */
--ink:      oklch(0.22 0.020 60);   /* 墨色 */
--uni:      oklch(0.74 0.165 55);   /* うにオレンジ（メインアクセント） */
--uni-deep: oklch(0.66 0.180 50);
--ikura:    oklch(0.65 0.180 35);   /* いくら朱／朱印色 */
--sea:      oklch(0.52 0.095 235);  /* 北の海ブルー */
--sea-pale: oklch(0.90 0.030 230);  /* 水彩ペールブルー */
```

3パレット切替可（`[data-palette]`）：朝焼け（デフォルト）/ 凪の海 / 伝統墨

### タイポ

```css
--f-mincho: "Shippori Mincho B1", "Yu Mincho", serif;  /* 見出し */
--f-hand:   "Klee One", serif;                          /* タグライン手書き感 */
--f-sans:   "Noto Sans JP", system-ui, sans-serif;      /* 本文 */
--f-latin:  "Cormorant Garamond", serif;                /* "since 1976" */
--f-mono:   "JetBrains Mono", monospace;                /* kicker等 */
```

3フォントスタイル切替可（`[data-fonts]`）：明朝（デフォルト）/ モダン / 手書き

### 装飾の仕組み

| 装飾 | 実装 |
|---|---|
| 和紙テクスチャ | `body::before` に SVG feTurbulenceノイズを重畳 |
| 水彩ブラシ（タグライン） | `.hero-tag .watercolor` 要素にラジアルグラデーション複数重ね |
| セクションタイトル下線 | `.sec-title .brush` 要素にラジアルグラデーション |
| About写真の不規則円 | `clip-path: polygon(...)` 38点で organic circle |
| 創業五十年カードのちぎれ縁 | `clip-path: polygon(...)` 60点でジグザグ |
| 波ディバイダー | `wave-divider.jsx` 内のインラインSVG |
| 朱印 | `.brand-seal` に rotate(6deg) + 赤地 |

**重要：CSS pseudo-element の `z-index: -1` は不安定だったため、装飾は基本DOM要素として実装している。**

---

## 📸 画像差し替え方法

すべての画像はCSSグラデーション＋clip-pathで作ったプレースホルダー。実写を入れる時は：

```css
/* styles.css 内の対応するセレクタで、background を url() に置換 */
.hero-photo            { background-image: url("/images/hero.jpg"); background-size: cover; }
.about-photo           { background-image: url("/images/shop-exterior.jpg"); background-size: cover; }
.gcard.ph-unidon .thumb{ background-image: url("/images/gallery-unidon.jpg"); background-size: cover; }
.gcard.ph-shop .thumb  { background-image: url("/images/gallery-shop.jpg"); background-size: cover; }
.gcard.ph-sunset .thumb{ background-image: url("/images/gallery-sunset.jpg"); background-size: cover; }
.gcard.ph-ice .thumb   { background-image: url("/images/gallery-ice.jpg"); background-size: cover; }
.gcard.ph-int .thumb   { background-image: url("/images/gallery-interior.jpg"); background-size: cover; }
```

ニュースサムネは `app.jsx` の `NEWS` 配列の `ph` プロパティで対応のCSSクラスが当たる。

`.hero-photo` の中の `.hero-placeholder` div は写真導入時に削除する。

---

## 🛠 Tweaksパネル

右下に表示。`window.parent.postMessage` で host に通信する仕組み（`tweaks-panel.jsx`）。

`app.jsx` の `TWEAK_DEFAULTS` で初期値、`<TweaksPanel>` 内の `<TweakRadio>` / `<TweakToggle>` でUI生成。

現状の Tweak：
- カラーパレット（3択）
- 日本語フォント（3択）
- 装飾 ON/OFF（紙テクスチャ・波装飾を一括で切り替え）

---

## ⚠️ 注意点・既知の制約

1. **SVG mask + feTurbulence/feDisplacementMap が一部ブラウザで効かない** → ブラシ縁は clip-path に切り替え済み
2. **CSS pseudo-element の z-index: -1 が body::before との重なりで効かない** → DOM 要素として実装するパターンが多い
3. **mobile breakpoint は 960px・520px の2段** → 中間サイズで一部レイアウトが詰まる可能性あり、要追加調整

---

## 📋 残タスク（写真差し替え後）

- [ ] 実写差し替え（上のリスト参照）
- [ ] Google Maps embed の実装（現状はマップ風プレースホルダー）
- [ ] フォーム送信先の実装（現状はクライアントだけのアニメーション）
- [ ] OGP/メタタグ追加
- [ ] フッターリンクの実体作成（プライバシーポリシー等）
- [ ] favicon, apple-touch-icon

---

## 💬 引き継ぎ後のClaudeへの伝え方

新セッションを始める時、以下を最初に伝えてください：

```
このプロジェクト「unidon」は樺太食堂のLPを制作中です。
HANDOFF.md に全体構造・デザインシステム・画像差し替え方法をまとめてあります。
まずこれを読んで全体像を把握してください。
```

その後の指示例：
- 「写真素材を `/uploads/` に置いたので、hero と gallery に差し替えて」
- 「フォームの送信先を Formspree のエンドポイント XXX に変更して」
- 「Google Maps embed を access セクションに入れて」
- 「Tweaks のカラーパレットに『冬の海』を追加して」
