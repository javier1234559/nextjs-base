import type { Config } from 'tailwindcss'
import { CustomThemeConfig } from 'tailwindcss/types/config'
import { extendTheme } from './src/theme/extend-theme'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {
      extend: extendTheme as unknown as Partial<CustomThemeConfig>,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
