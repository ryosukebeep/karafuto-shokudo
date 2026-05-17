// 樺太食堂 LP — main app (refined)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "asayake",
  "fonts": "classic",
  "decor": true
}/*EDITMODE-END*/;

// WaveDivider is loaded from wave-divider.jsx (before this script)
const WaveDivider = window.WaveDivider;

// ─── Sun icon (with rays) for anniversary card ─────────────────────
function SunIcon({ size = 56 }) {
  return (
    <svg className="anniv-sun" width={size} height={size * 0.7} viewBox="0 0 56 40" aria-hidden="true">
      <g stroke="var(--uni)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.85">
        <line x1="12" y1="28" x2="8" y2="28" />
        <line x1="44" y1="28" x2="48" y2="28" />
        <line x1="28" y1="6" x2="28" y2="2" />
        <line x1="15" y1="14" x2="12" y2="11" />
        <line x1="41" y1="14" x2="44" y2="11" />
        <line x1="20" y1="9" x2="18" y2="6" />
        <line x1="36" y1="9" x2="38" y2="6" />
      </g>
      <circle cx="28" cy="28" r="14" fill="var(--uni)" opacity="0.18" />
      <circle cx="28" cy="28" r="9" fill="var(--uni)" />
    </svg>
  );
}

// ─── Tiny seagull SVG (reused) ─────────────────────────────────────
function Gull({ stroke = "var(--ink-2)", w = 28 }) {
  return (
    <svg viewBox="0 0 60 24" width={w} aria-hidden="true">
      <path d="M 2,18 q 10,-16 28,-2 q 18,-14 28,2"
            stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Uni mascot — cute black uni character holding a bowl ──────────
// ─── Uni mascot (with bowl) and SoloUni (without) ──────────────────
function UniBody({ size = 96, x = 0, y = 0, hasBowl = true }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* spikes */}
      <g fill="#1a1410">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const inner = 32, outer = 50, cx = 60, cy = 60;
          const x1 = cx + Math.cos(a - 0.16) * inner;
          const y1 = cy + Math.sin(a - 0.16) * inner;
          const x2 = cx + Math.cos(a + 0.16) * inner;
          const y2 = cy + Math.sin(a + 0.16) * inner;
          const xT = cx + Math.cos(a) * outer;
          const yT = cy + Math.sin(a) * outer;
          return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${xT},${yT}`} />;
        })}
      </g>
      <circle cx="60" cy="60" r="34" fill="#1a1410" />
      <ellipse cx="48" cy="48" rx="10" ry="6" fill="oklch(0.30 0.02 60)" opacity="0.7" />
      <circle cx="48" cy="58" r="4.5" fill="#faf7f0" />
      <circle cx="72" cy="58" r="4.5" fill="#faf7f0" />
      <circle cx="49" cy="59" r="2" fill="#1a1410" />
      <circle cx="73" cy="59" r="2" fill="#1a1410" />
      <circle cx="42" cy="68" r="3" fill="var(--ikura)" opacity="0.55" />
      <circle cx="78" cy="68" r="3" fill="var(--ikura)" opacity="0.55" />
      <path d="M 56,68 q 4,3 8,0" stroke="#faf7f0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {hasBowl && (
        <g transform="translate(60 96)">
          <ellipse cx="0" cy="0" rx="24" ry="6" fill="#1a1410" />
          <path d="M -24,0 Q -20,13 0,13 Q 20,13 24,0 Z" fill="#1a1410" />
          <ellipse cx="0" cy="0" rx="20" ry="4.8" fill="var(--uni)" />
          <circle cx="-7" cy="-1" r="1.7" fill="var(--ikura)" />
          <circle cx="5" cy="0" r="1.7" fill="var(--ikura)" />
          <circle cx="11" cy="-1" r="1.7" fill="var(--ikura)" />
        </g>
      )}
    </g>
  );
}
function MascotPair() {
  return (
    <svg className="x-mascot" viewBox="0 0 200 140" aria-hidden="true">
      {/* solo uni on left (smaller, no bowl) */}
      <g transform="translate(0 0) scale(0.55)">
        <UniBody hasBowl={false} />
      </g>
      {/* uni with bowl on right (larger) */}
      <g transform="translate(80 0)">
        <UniBody hasBowl={true} />
      </g>
    </svg>
  );
}

// ─── Header ────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="hdr">
      <div className="container hdr-inner">
        <a href="#top" className="brand" aria-label="樺太食堂 ホーム">
          <div className="brand-text">
            <span className="brand-sup">無敵の生うに丼</span>
            <span className="brand-name">樺太食堂<span className="brand-seal" aria-hidden="true">印</span></span>
          </div>
        </a>
        <nav className="nav" aria-label="メイン">
          <a href="#about">当店について</a>
          <a href="#gallery">ギャラリー</a>
          <a href="#news">最新情報</a>
          <a href="#access">アクセス</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#contact" className="cta">お問い合わせ</a>
          <button className="menu-btn" aria-label="メニュー"><span></span></button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-text">
          <p className="hero-tag">
            <span className="watercolor" aria-hidden="true"></span>
            <span className="hero-tag-text">
              北の海が育んだ、<br />
              最高の一杯を。
            </span>
          </p>
          <h1 className="hero-name" aria-label="樺太食堂">
            <span>樺</span><span>太</span><span>食</span><span>堂</span>
          </h1>
          <p className="hero-loc">北海道・稚内市 ノシャップ岬</p>
        </div>
        <div className="hero-photo" aria-label="ノシャップ岬の夕焼け"></div>
      </div>
      <WaveDivider />
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────
function About() {
  return (
    <section className="sec" id="about">
      <div className="container about-grid">
        <div className="about-text">
          <span className="kicker">ABOUT</span>
          <h2 className="sec-title"><span className="brush" aria-hidden="true"></span><span className="text">当店について</span></h2>
          <p>
            ノシャップ岬の先っぽ、<br />
            日本海と利尻富士が目の前にある食堂です。
          </p>
          <p>
            昭和51年の創業から、ずっとこの場所で<br />
            北の海で獲れた新鮮なうに・いくら・ほたてを<br />
            シンプルにどんぶりに盛ってお出ししています。
          </p>
          <p>
            一番人気は <strong>「無敵の生うに丼」</strong>。<br />
            ぜひ一度、食べにいらしてください。
          </p>
        </div>
        <div className="about-photo" aria-label="店舗外観 プレースホルダー">
          <div className="lbl">PHOTO: 店舗外観</div>
        </div>
        <div style={{ position: "relative" }}>
          <div className="anniv-wrap">
            <SunIcon size={56} />
            <div className="about-anniv">
              <div className="label">おかげさまで創業</div>
              <div className="big">五十年</div>
              <div className="latin">since 1976</div>
              <div className="small">昭和51年（1976）創業</div>
            </div>
          </div>
          <div className="gulls" aria-hidden="true">
            <span className="g1"><Gull w={56} /></span>
            <span className="g2"><Gull w={36} /></span>
            <span className="g3"><Gull w={32} /></span>
            <span className="g4"><Gull w={40} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────
const GALLERY = [
  { cls: "ph-unidon", cap: "うにいくら丼",        label: "PHOTO: 丼" },
  { cls: "ph-shop",   cap: "樺太食堂 外観",       label: "PHOTO: 外観" },
  { cls: "ph-sunset", cap: "利尻富士と夕焼けの海", label: "PHOTO: 夕景" },
  { cls: "ph-ice",    cap: "流氷の港",             label: "PHOTO: 流氷" },
  { cls: "ph-int",    cap: "店内の様子",           label: "PHOTO: 店内" },
];
function Gallery() {
  return (
    <section className="sec" id="gallery" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="gallery-head">
          <div>
            <span className="kicker">GALLERY</span>
            <h2 className="sec-title"><span className="brush" aria-hidden="true"></span><span className="text">樺太食堂の風景</span></h2>
          </div>
          <a href="#" className="more-link">ギャラリーをもっと見る　→</a>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <div key={i} className="gcard">
              <div className={"thumb " + g.cls} style={{ "--ph-label": `"${g.label}"` }}></div>
              <div className="cap">{g.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── News ──────────────────────────────────────────────────────────
const NEWS = [
  { date: "2025.05.12", time: "10:30", title: "本日の生うに入荷状況について", desc: "本日の生うに入荷しました！本日のおすすめです。", new: true, ph: "ph-unidon" },
  { date: "2025.05.10", time: "08:00", title: "5月の営業時間について", desc: "5月の営業時間のお知らせです。詳しくはこちらをご確認ください。", new: false, ph: "ph-shop-s" },
  { date: "2025.05.07", time: "16:45", title: "臨時休業のお知らせ（5/8）", desc: "5月8日（木）は都合により臨時休業とさせていただきます。", new: false, ph: "ph-ice-s" },
];
function News() {
  return (
    <section className="sec" id="news" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ marginBottom: 28 }}>
          <span className="kicker">LATEST NEWS</span>
          <h2 className="sec-title"><span className="brush" aria-hidden="true"></span><span className="text">最新情報</span></h2>
        </div>
        <div className="news-grid">
          <div>
            <div className="news-list">
              {NEWS.map((n, i) => (
                <a key={i} href="#" className="news-item">
                  <div className={"news-thumb " + n.ph}></div>
                  <div className="news-body">
                    <div className="news-title">
                      {n.title}
                      {n.new && <span className="badge">NEW</span>}
                    </div>
                    <p className="news-desc">{n.desc}</p>
                  </div>
                  <div className="news-date">{n.date}　{n.time}</div>
                </a>
              ))}
            </div>
            <div className="news-more">
              <a href="#" className="more-link">もっと見る　→</a>
            </div>
          </div>

          {/* X promo card */}
          <div className="x-card">
            <div className="x-icon">𝕏</div>
            <h3>最新の営業情報・<br />仕入れ状況は<br />Xで発信中！</h3>
            <a className="x-follow" href="#">
              <span className="uname">@karafuto_</span>
              <span>をフォローする</span>
              <span aria-hidden="true">→</span>
            </a>
            <div className="x-foot">フォローして最新情報をお見逃しなく♪</div>
            <MascotPair />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Access + Contact ──────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [data, setData] = React.useState({ name: "", email: "", phone: "", msg: "" });
  function submit(e) {
    e.preventDefault();
    if (!data.name || !data.email || !data.msg) return;
    setSent(true);
    setTimeout(() => { setSent(false); setData({ name: "", email: "", phone: "", msg: "" }); }, 2200);
  }
  const upd = (k) => (e) => setData({ ...data, [k]: e.target.value });
  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <input placeholder="お名前" value={data.name} onChange={upd("name")} />
        <input placeholder="メールアドレス" type="email" value={data.email} onChange={upd("email")} />
      </div>
      <input placeholder="お電話番号（任意）" value={data.phone} onChange={upd("phone")} />
      <textarea placeholder="お問い合わせ内容" value={data.msg} onChange={upd("msg")}></textarea>
      <button type="submit" className={"submit " + (sent ? "sent" : "")}>
        <span>{sent ? "✓ 送信しました" : "送信する"}</span>
        {!sent && <span>→</span>}
      </button>
    </form>
  );
}

function AccessContact() {
  return (
    <section className="sec" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="container bottom-grid">
        {/* Access */}
        <div className="panel" id="access">
          <div className="panel-head">
            <span className="kicker">ACCESS</span>
            <h3>アクセス</h3>
          </div>
          <div className="access-grid">
            <div className="access-info">
              <div className="info-row">
                <div className="info-ico" aria-hidden="true">📍</div>
                <div>
                  <div className="info-lbl">所在地</div>
                  <div className="info-val wrap">〒097-0026 北海道稚内市 ノシャップ2丁目2-6</div>
                </div>
              </div>
              <div className="info-row">
                <div className="info-ico" aria-hidden="true">☏</div>
                <div>
                  <div className="info-lbl">電話番号</div>
                  <div className="info-val">0162-24-3451</div>
                </div>
              </div>
              <div className="info-row">
                <div className="info-ico" aria-hidden="true">◷</div>
                <div>
                  <div className="info-lbl">営業時間</div>
                  <div className="info-val">9:00〜14:30（L.O. 14:00）</div>
                  <div className="info-sub">※季節により変動あり。詳しくはお知らせをご確認ください。</div>
                </div>
              </div>
            </div>
            <div className="map" aria-label="地図 プレースホルダー">
              <div className="map-pin">
                <span className="dot"></span>
                <span className="tag">樺太食堂</span>
              </div>
              <a href="#" className="map-btn">Google Mapで見る　→</a>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="panel" id="contact">
          <div className="panel-head">
            <span className="kicker">CONTACT</span>
            <h3>お問い合わせ</h3>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="foot">
      <div className="container foot-grid">
        <div className="brand foot-brand">
          <div className="brand-text">
            <span className="brand-sup">無敵の生うに丼</span>
            <span className="brand-name">樺太食堂<span className="brand-seal" aria-hidden="true">印</span></span>
            <span className="foot-loc">北海道・稚内市 ノシャップ岬</span>
          </div>
        </div>
        <div className="follow">
          <span className="lbl">FOLLOW US</span>
          <div className="icons">
            <a href="#" aria-label="X">𝕏</a>
            <a href="#" aria-label="Instagram">◉</a>
          </div>
        </div>
        <div className="foot-links">
          <a href="#">プライバシーポリシー</a>
          <a href="#">特定商取引法に基づく表記</a>
          <a href="#">サイトマップ</a>
        </div>
      </div>
      <div className="foot-bottom container">
        © 2026 樺太食堂　All Rights Reserved.
      </div>
    </footer>
  );
}

// ─── App root ──────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.dataset.palette = t.palette;
    document.documentElement.dataset.fonts = t.fonts;
    document.documentElement.dataset.decor = t.decor ? "on" : "off";
  }, [t.palette, t.fonts, t.decor]);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <News />
      <AccessContact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="カラーパレット" />
        <TweakRadio
          label="Palette"
          value={t.palette}
          options={[
            { value: "asayake", label: "朝焼け" },
            { value: "kanagi",  label: "凪の海" },
            { value: "sumi",    label: "伝統墨" },
          ]}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakSection label="日本語フォント" />
        <TweakRadio
          label="Style"
          value={t.fonts}
          options={[
            { value: "classic", label: "明朝" },
            { value: "modern",  label: "モダン" },
            { value: "kobo",    label: "手書き" },
          ]}
          onChange={(v) => setTweak("fonts", v)}
        />
        <TweakSection label="装飾" />
        <TweakToggle
          label="水彩・波・装飾"
          value={t.decor}
          onChange={(v) => setTweak("decor", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
