export const colors = {
  primary: '#1E4646',
  primaryDark: '#0F2A2A',
  primarySoft: '#E6F5E6',
  accent: '#88B898',
  accentSoft: '#E6F5E6',
  bg: '#F2FBF2',
  surface: '#FFFFFF',
  surfaceAlt: '#F8F8F8',
  text: '#0F2A2A',
  textSoft: '#31514C',
  muted: '#6E8C82',
  border: '#DCE9DF',
  success: '#2F7D57',
  successSoft: '#E6F5E6',
  danger: '#B3412F',
  dangerSoft: '#F8E7E3',
  warning: '#B06A12',
  warningSoft: '#FCEFDB',
  info: '#31568A',
  infoSoft: '#E5EDF7',
  purple: '#5E4A8C',
  teal: '#2E746F',
  sidebar: '#0F2A2A',
  sidebarActive: '#1E4646',
  white: '#FFFFFF',
  gold: '#88B898',
  goldLight: '#98B898',
  ink: '#0F2A2A',
  cream: '#F2FBF2',
}

export const layout = {
  maxWidth: 1240,
  gutter: 22,
}

export const space = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  '2xl': 32,
  '3xl': 44,
}

export const font = {
  sans: "'Inter', 'Segoe UI', 'Noto Sans Devanagari', 'Noto Sans Tibetan', system-ui, sans-serif",
  heading: "'Fraunces', Georgia, 'Noto Serif', 'Noto Serif Devanagari', 'Noto Serif Tibetan', serif",
  mono: "'Cascadia Code', Consolas, monospace",
}

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  round: 999,
}

/* Non-rectangular silhouettes. The notch pair is a matched outer/inset pair so a
   true 1px gradient hairline can be drawn around a clipped corner. */
export const shapes = {
  arch: '46% 46% 16px 16px / 20% 20% 16px 16px',
  notch: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)',
  notchInset: 'polygon(1px 1px, calc(100% - 36px) 1px, calc(100% - 1px) 36px, calc(100% - 1px) calc(100% - 1px), 1px calc(100% - 1px))',
}

export const hairline = {
  soft: `linear-gradient(90deg, rgba(216,248,216,0) 0%, ${colors.border} 50%, rgba(216,248,216,0) 100%)`,
  gold: `linear-gradient(90deg, rgba(136,184,152,0) 0%, rgba(136,184,152,0.5) 50%, rgba(136,184,152,0) 100%)`,
  rail: 'linear-gradient(180deg, rgba(136,184,152,0.4) 0%, rgba(136,184,152,0.08) 100%)',
}

export const type = {
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase' },
  title: { fontFamily: font.heading, fontSize: 19, fontWeight: 700, letterSpacing: '-0.2px', lineHeight: 1.3 },
  body: { fontSize: 13.75, fontWeight: 400, lineHeight: 1.78 },
  meta: { fontSize: 12.5, fontWeight: 600, letterSpacing: '0.2px' },
}

export const shadows = {
  card: '0 1px 2px rgba(15, 42, 42, 0.04), 0 6px 20px rgba(15, 42, 42, 0.05)',
  pop: '0 10px 34px rgba(15, 42, 42, 0.12)',
  gold: '0 8px 26px rgba(136, 184, 152, 0.25)',
  arch: 'inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 8px 24px rgba(15, 42, 42, 0.06)',
  lift: 'inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 16px 38px rgba(15, 42, 42, 0.08)',
}
