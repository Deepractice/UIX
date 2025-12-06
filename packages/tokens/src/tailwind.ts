/**
 * Lucid UI Tailwind CSS Plugin
 * Use this to integrate Lucid tokens with Tailwind CSS
 */

import { colors, rational, sentient } from './colors'
import { fontFamily, fontSize, fontWeight, letterSpacing } from './typography'
import { spacing } from './spacing'
import { radius } from './radius'
import { shadows } from './shadows'

export const lucidPreset = {
  theme: {
    extend: {
      colors: {
        ...colors,
        // Dual theme colors
        rational,
        sentient,
        // Default primary uses rational theme (科技蓝)
        primary: rational,
        // Semantic color aliases
        background: colors.white,
        foreground: colors.gray[900],
        muted: colors.gray[100],
        'muted-foreground': colors.gray[600],
        border: colors.gray[200],
        ring: rational[500],
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
} as const

export default lucidPreset
