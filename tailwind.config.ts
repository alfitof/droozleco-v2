/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "drz-black": "#050505",
        "drz-white": "#F5F0E8",
        "drz-lime": "#C8FF00",
        "drz-red": "#FF2A2A",
        "drz-gray": "#1A1A1A",
        "drz-muted": "#6B6B6B",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        body: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        giant: ["12rem", { lineHeight: "0.9" }],
        huge: ["8rem", { lineHeight: "0.9" }],
        big: ["5rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
