import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [import("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}

export default config
