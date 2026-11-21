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
          black: "#0B0B0A",
          dark: "#141412",
          cardDark: "#171715",
          borderDark: "#262622",
          olive: "#6B7A2A",
          oliveDark: "#4A5520",
          oliveLight: "#A3B04B",
          yellow: "#F5C400",
          yellowHover: "#E5B700",
          beige: "#EDE3CF",
          beigeDark: "#DFD4BD",
          warmWhite: "#F7F2E7",
          white: "#FFFFFF",
          mutedDark: "#8E8E8A",
          mutedLight: "#63635E",
        }
      },
      fontFamily: {
        heading: ["Sora", "Space Grotesk", "sans-serif"],
        body: ["Inter", "DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.12)',
        'card-beige': '0 8px 24px -4px rgba(107, 122, 42, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glow-olive': '0 0 24px -2px rgba(107, 122, 42, 0.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'brand': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
