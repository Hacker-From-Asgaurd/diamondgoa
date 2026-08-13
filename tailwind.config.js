/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hh: {
          green: '#03502E',     // Exact User Swatch Rich Deep Green
          darkGreen: '#023D23', // Darker Header/Footer Shade
          yellow: '#FFE600',    // Sun Yellow title & accents
          hotPink: '#FF007A',   // Vibrant Hot Pink / Magenta
          cream: '#FFFDF0',     // Ivory Cream Card Background
          darkText: '#023D23',  // Deep forest green text
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        serif: ['Bodoni Moda', 'Playfair Display SC', 'Playfair Display', 'serif'],
        hindi: ['Rozha One', 'Yatra One', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'hh-card': '0 12px 36px rgba(0, 0, 0, 0.3)',
        'hh-pink': '0 4px 16px rgba(255, 0, 122, 0.4)',
      }
    },
  },
  plugins: [],
}
