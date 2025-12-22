/**
 * Lucid UI Tailwind CSS Plugin
 * Use this to integrate Lucid tokens with Tailwind CSS
 */

import { colors, rational, sentient } from './colors'
import { fontFamily, fontSize, fontWeight, letterSpacing } from './typography'
import { spacing } from './spacing'
import { radius } from './radius'
import { shadows } from './shadows'

/**
 * Custom keyframes for AI-specific animations
 */
const keyframes = {
  // Wave animation for ThinkingIndicator
  wave: {
    '0%, 100%': { height: '0.3em' },
    '50%': { height: '1em' },
  },
  // Breathing effect for AI status
  breath: {
    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
  },
  // Shimmer effect for loading states
  shimmer: {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
}

/**
 * Custom animations using keyframes
 */
const animation = {
  wave: 'wave 1s ease-in-out infinite',
  breath: 'breath 2s ease-in-out infinite',
  shimmer: 'shimmer 2s linear infinite',
}

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
        // Secondary uses sentient theme (金色)
        secondary: sentient,
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
      keyframes,
      animation,
    },
  },
} as const

// Export for direct usage
export { keyframes, animation }

export default lucidPreset
