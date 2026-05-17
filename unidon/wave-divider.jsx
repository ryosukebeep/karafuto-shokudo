// 樺太食堂 LP — Wave divider SVG (refined, prominent Mt. Rishiri)
function WaveDivider() {
  // wavy path generator
  const wave = (y, amp = 10) => {
    let d = `M 0,${y}`;
    for (let x = 0; x <= 1440; x += 60) {
      d += ` Q ${x + 30},${y - amp} ${x + 60},${y}`;
    }
    return d;
  };
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 280" preserveAspectRatio="none">
        <defs>
          <linearGradient id="skyWash" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--paper)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--paper)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="1440" height="280" fill="url(#skyWash)" />

        {/* SUN */}
        <g transform="translate(220 145)">
          <circle r="54" fill="var(--gold)" opacity="0.16" />
          <circle r="38" fill="var(--gold)" opacity="0.28" />
          <circle r="26" fill="var(--uni)" opacity="0.95" />
          <g stroke="var(--uni)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" fill="none">
            <line x1="-46" y1="0" x2="-38" y2="0" />
            <line x1="38" y1="0" x2="46" y2="0" />
            <line x1="0" y1="-46" x2="0" y2="-38" />
            <line x1="-32" y1="-32" x2="-27" y2="-27" />
            <line x1="32" y1="-32" x2="27" y2="-27" />
            <line x1="-32" y1="32" x2="-27" y2="27" />
            <line x1="32" y1="32" x2="27" y2="27" />
          </g>
        </g>

        {/* RISHIRI-FUJI — large central */}
        <path d="M 460,225 L 720,55 L 980,225 Z" fill="var(--sea-deep)" opacity="0.18" />
        <path d="M 460,225 L 720,55 L 980,225" fill="none" stroke="var(--sea-deep)" strokeWidth="2" opacity="0.65" strokeLinejoin="round" />
        {/* snowcap (jagged) */}
        <path d="M 666,100 L 700,72 L 715,82 L 720,55 L 738,88 L 758,76 L 778,100 L 770,108 L 752,98 L 738,108 L 720,98 L 700,108 L 685,98 Z" fill="var(--paper)" opacity="0.92" />
        <path d="M 666,100 L 700,72 L 715,82 L 720,55 L 738,88 L 758,76 L 778,100" fill="none" stroke="var(--sea-deep)" strokeWidth="1.5" opacity="0.55" strokeLinejoin="round" />
        <path d="M 720,55 L 980,225 L 720,225 Z" fill="var(--sea-deep)" opacity="0.08" />

        {/* fore mountain */}
        <path d="M 880,225 L 1010,130 L 1140,225 Z" fill="var(--sea)" opacity="0.22" />
        <path d="M 880,225 L 1010,130 L 1140,225" fill="none" stroke="var(--sea-deep)" strokeWidth="1.6" opacity="0.55" />

        {/* pines */}
        <g fill="var(--sea-deep)" opacity="0.4">
          <path d="M 130,228 l -4,-13 l 8,0 z" />
          <path d="M 150,228 l -5,-17 l 10,0 z" />
          <path d="M 172,228 l -3,-11 l 6,0 z" />
          <path d="M 1230,228 l -4,-13 l 8,0 z" />
          <path d="M 1250,228 l -3,-10 l 6,0 z" />
        </g>

        <line x1="0" y1="228" x2="1440" y2="228" stroke="var(--sea-deep)" strokeWidth="1" opacity="0.3" />

        {/* waves */}
        <path d={wave(242, 8)} fill="none" stroke="var(--sea)" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
        <path d={wave(258, 9)} fill="none" stroke="var(--sea-deep)" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        <path d={wave(272, 7)} fill="none" stroke="var(--sea)" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />

        {/* wave swirls */}
        <g fill="none" stroke="var(--sea-deep)" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
          <path d="M 100,218 q 10,-14 22,-7 q 8,5 -2,12" />
          <path d="M 280,222 q 12,-15 24,-7 q 8,6 -3,13" />
          <path d="M 1200,215 q 10,-13 22,-6 q 8,5 -2,12" />
          <path d="M 1340,222 q 9,-12 20,-6 q 7,5 -2,11" />
        </g>

        {/* seagulls */}
        <g stroke="var(--ink-2)" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round">
          <path d="M 1100,60 q 8,-8 16,0 q 8,-8 16,0" />
          <path d="M 1200,90 q 6,-6 12,0 q 6,-6 12,0" />
          <path d="M 320,42 q 6,-6 12,0 q 6,-6 12,0" />
          <path d="M 400,68 q 5,-5 10,0 q 5,-5 10,0" />
        </g>
      </svg>
    </div>
  );
}
window.WaveDivider = WaveDivider;
