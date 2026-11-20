/* Flat, hand-built SVG illustrations in a warm onboarding style. */

const INK = '#2B2350'
const SKIN = '#B9714A'

/** Hero: a person tossing pages into a giant PDF that sparks ideas. */
export function HeroIllustration() {
  return (
    <svg viewBox="0 0 380 300" className="illus" aria-hidden="true">
      {/* soft backdrop shapes */}
      <circle cx="210" cy="150" r="118" fill="#FFB866" />
      <circle cx="320" cy="60" r="26" fill="#FFD23F" />
      <path d="M30 270h320" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".18" />

      {/* plant */}
      <path d="M58 262c-14-42 0-80 18-98 10 34 4 70-18 98z" fill="#18A57F" />
      <path d="M62 262c6-40 34-62 62-68-6 34-30 58-62 68z" fill="#0F8466" />
      <path d="M58 262c-22-24-34-48-30-74 22 16 32 44 30 74z" fill="#3CC59A" />
      <rect x="40" y="252" width="44" height="26" rx="6" fill="#F2553B" />

      {/* giant PDF document */}
      <g transform="rotate(-5 230 150)">
        <rect x="170" y="48" width="138" height="184" rx="14" fill="#fff" stroke={INK} strokeWidth="3.5" />
        <path d="M276 48h18a14 14 0 0 1 14 14v18z" fill="#FFE6D4" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <rect x="188" y="70" width="54" height="26" rx="8" fill="#F2553B" />
        <text x="215" y="89" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="900" fontSize="15" fill="#fff">PDF</text>
        <rect x="188" y="112" width="100" height="8" rx="4" fill="#FFC7A1" />
        <rect x="188" y="128" width="84" height="8" rx="4" fill="#FFC7A1" />
        <rect x="188" y="144" width="96" height="8" rx="4" fill="#FFC7A1" />
        <rect x="188" y="168" width="44" height="44" rx="10" fill="#D4F3E8" />
        <path d="M198 200l9-12 7 8 5-6 9 10z" fill="#18A57F" />
        <rect x="242" y="172" width="46" height="8" rx="4" fill="#E8E3F5" />
        <rect x="242" y="188" width="38" height="8" rx="4" fill="#E8E3F5" />
        <rect x="242" y="204" width="44" height="8" rx="4" fill="#E8E3F5" />
      </g>

      {/* lightbulb idea */}
      <g transform="translate(300 96)">
        <circle cx="0" cy="0" r="20" fill="#FFD23F" stroke={INK} strokeWidth="3" />
        <rect x="-8" y="18" width="16" height="10" rx="3" fill={INK} />
        <path d="M-6 -2l6 8 6-8" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0 -34v-8M24 -24l6-6M-24 -24l-6-6M34 0h8M-34 0h-8" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* flying pages */}
      <g transform="rotate(-18 150 70)">
        <rect x="128" y="50" width="34" height="42" rx="5" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M135 62h20M135 70h14M135 78h18" stroke="#F2553B" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="rotate(14 104 112)">
        <rect x="92" y="96" width="26" height="32" rx="4" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M98 106h14M98 113h10" stroke="#18A57F" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* person */}
      {/* legs */}
      <path d="M128 268l6-70h18l-4 70z" fill={INK} />
      <path d="M150 268l6-70h18l-2 70z" fill="#3D3470" />
      <ellipse cx="136" cy="270" rx="16" ry="7" fill="#F2553B" />
      <ellipse cx="164" cy="270" rx="16" ry="7" fill="#F2553B" />
      {/* torso */}
      <path d="M124 206c-2-40 6-64 30-64s34 22 30 64z" fill="#18A57F" />
      <path d="M140 150l14 18 14-18" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* raised arm toward pages */}
      <path d="M134 158c-10-8-18-26-22-44" fill="none" stroke="#18A57F" strokeWidth="16" strokeLinecap="round" />
      <circle cx="112" cy="108" r="9" fill={SKIN} />
      {/* other arm pointing at PDF */}
      <path d="M176 160c10 4 18 4 28-2" fill="none" stroke="#18A57F" strokeWidth="16" strokeLinecap="round" />
      <circle cx="208" cy="156" r="9" fill={SKIN} />
      {/* head */}
      <rect x="148" y="122" width="12" height="14" rx="4" fill={SKIN} />
      <circle cx="154" cy="110" r="20" fill={SKIN} />
      <path d="M134 108c-2-18 10-28 22-28 14 0 24 10 22 24-8-2-16-8-20-14-4 8-14 14-24 18z" fill={INK} />
      <circle cx="162" cy="112" r="2.5" fill={INK} />
      <path d="M156 121c3 2 7 2 10 0" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />

      {/* confetti */}
      <circle cx="96" cy="60" r="5" fill="#FFD23F" />
      <circle cx="340" cy="200" r="6" fill="#18A57F" />
      <rect x="330" y="240" width="10" height="10" rx="2" transform="rotate(20 335 245)" fill="#F2553B" />
      <path d="M78 140l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" fill="#fff" />
    </svg>
  )
}

/** Step 1: hand dropping a file. */
export function DropSpot() {
  return (
    <svg viewBox="0 0 120 100" className="spot" aria-hidden="true">
      <circle cx="62" cy="54" r="38" fill="#fff" opacity=".55" />
      <rect x="40" y="22" width="40" height="50" rx="7" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="47" y="30" width="18" height="10" rx="3" fill="#F2553B" />
      <path d="M47 48h26M47 56h18" stroke="#FFC7A1" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 78v14M53 86l7 7 7-7" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 26l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#FFD23F" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="18" cy="30" r="5" fill="#FFD23F" />
    </svg>
  )
}

/** Step 2: brain / sparkle extraction. */
export function ExtractSpot() {
  return (
    <svg viewBox="0 0 120 100" className="spot" aria-hidden="true">
      <circle cx="60" cy="52" r="38" fill="#fff" opacity=".55" />
      <path
        d="M60 22c-10-8-28-2-28 12-10 2-14 16-6 24-4 12 8 22 18 18 4 8 12 8 16 2z"
        fill="#FFC7A1" stroke={INK} strokeWidth="3" strokeLinejoin="round"
      />
      <path
        d="M60 22c10-8 28-2 28 12 10 2 14 16 6 24 4 12-8 22-18 18-4 8-12 8-16 2z"
        fill="#FF9F2E" stroke={INK} strokeWidth="3" strokeLinejoin="round"
      />
      <path d="M60 22v56M44 40c6 0 10 4 10 10M76 40c-6 0-10 4-10 10" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M100 18l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#FFD23F" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 70l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#fff" />
    </svg>
  )
}

/** Step 3: stack of flashcards with a check. */
export function RecallSpot() {
  return (
    <svg viewBox="0 0 120 100" className="spot" aria-hidden="true">
      <circle cx="60" cy="52" r="38" fill="#fff" opacity=".35" />
      <rect x="28" y="30" width="56" height="40" rx="8" fill="#FFD23F" stroke={INK} strokeWidth="3" transform="rotate(-10 56 50)" />
      <rect x="34" y="34" width="56" height="40" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M44 46h28M44 56h18" stroke="#FFC7A1" strokeWidth="4" strokeLinecap="round" />
      <circle cx="90" cy="74" r="14" fill="#F2553B" stroke={INK} strokeWidth="3" />
      <path d="M84 74l4 4 8-8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="24" r="5" fill="#fff" />
    </svg>
  )
}

/** Sidebar promo: little reader on a stack of books. */
export function StreakSpot() {
  return (
    <svg viewBox="0 0 160 110" className="spot spot--wide" aria-hidden="true">
      <rect x="34" y="82" width="92" height="14" rx="4" fill="#F2553B" stroke={INK} strokeWidth="2.5" />
      <rect x="42" y="68" width="80" height="14" rx="4" fill="#FFD23F" stroke={INK} strokeWidth="2.5" />
      <rect x="38" y="54" width="86" height="14" rx="4" fill="#FFC7A1" stroke={INK} strokeWidth="2.5" />
      {/* reader */}
      <path d="M70 54c-2-16 2-24 12-24s14 8 12 24z" fill="#FF9F2E" />
      <circle cx="82" cy="20" r="10" fill={SKIN} />
      <path d="M72 18c0-10 6-14 12-14 7 0 12 6 10 12-6 0-12-2-14-6-2 4-4 6-8 8z" fill={INK} />
      <rect x="66" y="34" width="32" height="20" rx="3" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M82 34v20" stroke={INK} strokeWidth="2.5" />
      <path d="M128 20l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#FFD23F" />
      <circle cx="24" cy="36" r="5" fill="#fff" />
    </svg>
  )
}

/** Preview side panel: clipboard quiz with a pencil and a trophy. */
export function QuizIllustration() {
  return (
    <svg viewBox="0 0 220 170" className="illus illus--quiz" aria-hidden="true">
      <circle cx="110" cy="88" r="70" fill="#FFE6D4" />
      <circle cx="186" cy="36" r="14" fill="#FFD23F" />
      {/* clipboard */}
      <rect x="62" y="30" width="96" height="124" rx="12" fill="#fff" stroke={INK} strokeWidth="3.5" />
      <rect x="88" y="22" width="44" height="18" rx="6" fill="#18A57F" stroke={INK} strokeWidth="3" />
      {[58, 88, 118].map((y, i) => (
        <g key={y}>
          <rect x="76" y={y} width="18" height="18" rx="5" fill={i < 2 ? '#18A57F' : '#fff'} stroke={INK} strokeWidth="2.5" />
          {i < 2 && (
            <path d={`M80 ${y + 9}l4 4 7-8`} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          <rect x="102" y={y + 3} width={i === 1 ? 36 : 44} height="6" rx="3" fill="#FFC7A1" />
          <rect x="102" y={y + 12} width="26" height="5" rx="2.5" fill="#E8E3F5" />
        </g>
      ))}
      {/* pencil */}
      <g transform="rotate(35 172 112)">
        <rect x="164" y="70" width="16" height="64" rx="3" fill="#FF9F2E" stroke={INK} strokeWidth="3" />
        <rect x="164" y="70" width="16" height="12" rx="3" fill="#F2553B" stroke={INK} strokeWidth="3" />
        <path d="M164 134l8 14 8-14z" fill="#FFE6D4" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* sparkles */}
      <path d="M34 54l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FFD23F" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="40" cy="128" r="6" fill="#18A57F" />
      <rect x="180" y="140" width="10" height="10" rx="2" transform="rotate(20 185 145)" fill="#F2553B" />
    </svg>
  )
}

/** Quiz side panel: student thinking, with a big question mark. */
export function ThinkingIllustration() {
  return (
    <svg viewBox="0 0 240 200" className="illus illus--side" aria-hidden="true">
      <circle cx="120" cy="104" r="80" fill="#3CC59A" />
      <circle cx="40" cy="40" r="10" fill="#FFD23F" />
      <rect x="196" y="150" width="12" height="12" rx="3" transform="rotate(18 202 156)" fill="#F2553B" />
      {/* thought bubble with ? */}
      <circle cx="180" cy="56" r="30" fill="#fff" stroke={INK} strokeWidth="3.5" />
      <circle cx="152" cy="94" r="7" fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx="142" cy="108" r="4" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M170 48a10 10 0 1 1 14 9c-3 1.5-4 4-4 7" fill="none" stroke="#F2553B" strokeWidth="5" strokeLinecap="round" />
      <circle cx="180" cy="76" r="3.5" fill="#F2553B" />
      {/* desk */}
      <rect x="30" y="170" width="180" height="12" rx="6" fill={INK} />
      {/* book on desk */}
      <path d="M58 170l4-18h46l-4 18z" fill="#FFD23F" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M66 158h30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* body */}
      <path d="M86 170c-2-36 6-56 34-56s36 20 34 56z" fill="#FF9F2E" />
      <path d="M106 118l14 14 14-14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* arm to chin */}
      <path d="M146 150c8-10 6-28-6-38" fill="none" stroke="#FF9F2E" strokeWidth="15" strokeLinecap="round" />
      <circle cx="136" cy="104" r="8" fill={SKIN} />
      {/* head */}
      <rect x="114" y="92" width="12" height="14" rx="4" fill={SKIN} />
      <circle cx="120" cy="80" r="21" fill={SKIN} />
      <path d="M98 82c-4-22 10-32 24-32 16 0 26 12 22 28-4-10-14-14-22-14-6 8-14 14-24 18z" fill={INK} />
      <circle cx="113" cy="82" r="2.6" fill={INK} />
      <circle cx="127" cy="82" r="2.6" fill={INK} />
      <path d="M114 93h10" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 120l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fff" />
    </svg>
  )
}

/** Score page (good result): trophy with confetti. */
export function TrophyIllustration() {
  return (
    <svg viewBox="0 0 300 240" className="illus illus--result" aria-hidden="true">
      <circle cx="150" cy="124" r="98" fill="#FFB866" />
      {/* confetti */}
      <rect x="40" y="40" width="12" height="20" rx="3" transform="rotate(-25 46 50)" fill="#18A57F" />
      <rect x="246" y="52" width="12" height="20" rx="3" transform="rotate(30 252 62)" fill="#F2553B" />
      <rect x="62" y="170" width="10" height="16" rx="3" transform="rotate(40 67 178)" fill="#FFD23F" />
      <rect x="232" y="168" width="10" height="16" rx="3" transform="rotate(-30 237 176)" fill="#fff" />
      <circle cx="88" cy="70" r="6" fill="#fff" />
      <circle cx="220" cy="108" r="6" fill="#18A57F" />
      <circle cx="256" cy="130" r="4" fill="#FFD23F" />
      <path d="M48 112l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#fff" />
      <path d="M232 22l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#FFD23F" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {/* trophy */}
      <path d="M108 70c-30 0-34 40-2 48" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <path d="M108 70c-30 0-34 40-2 48" fill="none" stroke="#FFD23F" strokeWidth="5" strokeLinecap="round" />
      <path d="M192 70c30 0 34 40 2 48" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <path d="M192 70c30 0 34 40 2 48" fill="none" stroke="#FFD23F" strokeWidth="5" strokeLinecap="round" />
      <path d="M104 56h92v30c0 32-20 54-46 54s-46-22-46-54z" fill="#FFD23F" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M124 66v22c0 14 6 26 16 32" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
      <path d="M150 80l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" fill="#F2553B" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="138" y="138" width="24" height="24" fill="#FF9F2E" stroke={INK} strokeWidth="3.5" />
      <rect x="114" y="160" width="72" height="26" rx="6" fill="#18A57F" stroke={INK} strokeWidth="3.5" />
      <rect x="130" y="168" width="40" height="10" rx="3" fill="#fff" opacity=".85" />
      <path d="M90 200h120" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".25" />
    </svg>
  )
}

/** Score page (needs practice): watering a growing plant. */
export function GrowIllustration() {
  return (
    <svg viewBox="0 0 300 240" className="illus illus--result" aria-hidden="true">
      <circle cx="150" cy="124" r="98" fill="#FFD3B0" />
      <circle cx="244" cy="50" r="22" fill="#FFD23F" />
      <path d="M244 18v-8M276 50h8M267 27l6-6M221 27l-6-6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* pot + plant */}
      <path d="M170 150c-6-34 6-62 24-78 8 30 0 58-24 78z" fill="#18A57F" />
      <path d="M172 150c-20-20-44-28-64-24 12 22 36 30 64 24z" fill="#0F8466" />
      <path d="M174 150c4-22 22-38 46-40-4 24-22 38-46 40z" fill="#3CC59A" />
      <path d="M172 150v-60" stroke="#0F8466" strokeWidth="4" strokeLinecap="round" />
      <path d="M140 150h64l-8 44h-48z" fill="#F2553B" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="134" y="144" width="76" height="14" rx="5" fill="#FF7A5C" stroke={INK} strokeWidth="3.5" />
      {/* watering can */}
      <g transform="rotate(-20 82 96)">
        <rect x="52" y="82" width="56" height="40" rx="10" fill="#FF9F2E" stroke={INK} strokeWidth="3.5" />
        <path d="M108 92l32-16" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        <path d="M108 92l32-16" stroke="#FF9F2E" strokeWidth="4" strokeLinecap="round" />
        <path d="M62 82c0-18 36-18 36 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* drops */}
      <path d="M146 92c0 5-3 8-6 8s-6-3-6-8 6-12 6-12 6 7 6 12z" fill="#5BC8F5" stroke={INK} strokeWidth="2" />
      <path d="M160 112c0 4-2.5 6.5-5 6.5s-5-2.5-5-6.5 5-10 5-10 5 6 5 10z" fill="#5BC8F5" stroke={INK} strokeWidth="2" />
      <path d="M90 200h140" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".25" />
      <path d="M50 150l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fff" />
    </svg>
  )
}
