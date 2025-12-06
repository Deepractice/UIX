import type { Config } from 'tailwindcss'

// Import tokens directly using relative path for monorepo compatibility
import { colors } from '../../packages/tokens/src/colors'
import { fontFamily, fontSize, fontWeight, letterSpacing } from '../../packages/tokens/src/typography'
import { spacing } from '../../packages/tokens/src/spacing'
import { radius } from '../../packages/tokens/src/radius'
import { shadows } from '../../packages/tokens/src/shadows'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/react/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: colors.white,
        foreground: colors.gray[900],
        muted: colors.gray[100],
        'muted-foreground': colors.gray[600],
        border: colors.gray[200],
        ring: colors.primary[500],
      },
      fontFamily: {
        sans: fontFamily.sans,
        mono: fontFamily.mono,
      },
      fontSize,
      fontWeight,
      letterSpacing,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
    },
  },
  plugins: [],
} satisfies Config
