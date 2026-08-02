/** Local PostCSS — Tailwind only activates for files that `@import "tailwindcss"`. */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
