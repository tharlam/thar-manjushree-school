import { colors as palette } from './src/theme.js'

const toRgb = (hex) => {
  const clean = hex.replace('#', '')
  return [0, 2, 4].map((index) => parseInt(clean.slice(index, index + 2), 16))
}

const toHex = (rgb) =>
  `#${rgb
    .map((value) => Math.round(Math.min(255, Math.max(0, value))).toString(16).padStart(2, '0'))
    .join('')}`

const mix = (from, to, amount) =>
  toHex(toRgb(from).map((channel, index) => channel + (toRgb(to)[index] - channel) * amount))

const ramp = (light, base, dark) => ({
  50: light,
  100: mix(light, base, 0.12),
  200: mix(light, base, 0.28),
  300: mix(light, base, 0.46),
  400: mix(light, base, 0.72),
  500: base,
  600: mix(base, dark, 0.3),
  700: mix(base, dark, 0.55),
  800: mix(base, dark, 0.78),
  900: dark,
  950: mix(dark, '#000000', 0.25),
})

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        brand: {
          ...ramp(palette.primarySoft, palette.primary, palette.primaryDark),
          DEFAULT: palette.primary,
        },
        accent: {
          ...ramp('#f4fbf5', palette.accent, palette.teal),
          DEFAULT: palette.accent,
        },
        primary: palette.primary,
        'primary-dark': palette.primaryDark,
        'primary-soft': palette.primarySoft,
        'accent-soft': palette.accentSoft,
        gold: palette.gold,
        chrome: palette.bg,
        text: palette.text,
        'text-soft': palette.textSoft,
        border: palette.border,
        sidebar: palette.sidebar,
        'sidebar-active': palette.sidebarActive,
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-up': 'slideUp 0.35s ease both',
      },
    },
  },
}
