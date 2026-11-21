/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: "#EDE3CF",
          beigeLight: "#F7F2E7",
          beigeCard: "#FAF6ED",
          beigeDark: "#DFD4BD",
          olive: "#6B7A2A",
          oliveDark: "#4A5520",
          oliveDeep: "#262E10",
          oliveLight: "#8E9E39",
          oliveBorder: "#4A552026",
          yellow: "#F5C400",
          yellowHover: "#DFB000",
          black: "#0E1208",
          charcoal: "#1C220E",
          textDark: "#171D0A",
          textMuted: "#4F5938",
        }
      },
      fontFamily: {
        heading: ["Sora", "Space Grotesk", "sans-serif"],
        body: ["Inter", "DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(74, 85, 32, 0.08)',
        'elevated': '0 12px 32px -4px rgba(74, 85, 32, 0.15)',
        'card-beige': '0 8px 24px -4px rgba(74, 85, 32, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glow-olive': '0 0 24px -2px rgba(107, 122, 42, 0.3)',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
