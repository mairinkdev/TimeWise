import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",      // se tiver helpers ou libs
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
