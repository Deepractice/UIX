/**
 * Lucid UI Color System
 *
 * Design Philosophy:
 * - 白底为主，大众化
 * - 双色调：理性蓝 + 感性金
 * - 专业克制，拒绝紫色和黑色主题
 *
 * Two Themes:
 * - Rational (理性): 冷色调科技蓝 - 效率、精准、计算
 * - Sentient (感性): 暖色调智慧金 - 思维、概率、人文
 */

// ============================================
// 基础灰度系统 (shadcn/ui neutral)
// ============================================
export const gray = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0A0A0A',
} as const

// ============================================
// Rational Theme - 理性蓝（科技、效率、精准）
// ============================================
export const rational = {
  50: '#EFF6FF',   // 极浅蓝
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',  // 主色 - 科技蓝
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
  950: '#172554',
} as const

// ============================================
// Sentient Theme - 感性金（智慧、思维、人文）
// ============================================
export const sentient = {
  50: '#FFFBEB',   // 极浅金
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#D4A012',  // 主色 - 智慧金（比橙更沉稳）
  600: '#B8860B',  // 暗金色
  700: '#92650A',
  800: '#724F09',
  900: '#5C4008',
  950: '#3D2A05',
} as const

// ============================================
// 语义色（通用）
// ============================================
export const success = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
  950: '#052E16',
} as const

export const warning = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#451A03',
} as const

export const error = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
  950: '#450A0A',
} as const

// ============================================
// 聚合导出
// ============================================
export const colors = {
  gray,
  rational,
  sentient,
  success,
  warning,
  error,
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const

// 向后兼容: primary 默认使用 rational
export const primary = rational

// ============================================
// shadcn/ui 兼容的 CSS 变量主题
// ============================================
export const themes = {
  // 理性主题 - 科技蓝
  rational: {
    background: '#FFFFFF',
    foreground: gray[900],
    card: '#FFFFFF',
    cardForeground: gray[900],
    popover: '#FFFFFF',
    popoverForeground: gray[900],
    primary: rational[500],
    primaryForeground: '#FFFFFF',
    secondary: gray[100],
    secondaryForeground: gray[900],
    muted: gray[100],
    mutedForeground: gray[500],
    accent: gray[100],
    accentForeground: gray[900],
    destructive: error[500],
    destructiveForeground: '#FFFFFF',
    border: gray[200],
    input: gray[200],
    ring: rational[500],
  },
  // 感性主题 - 智慧金
  sentient: {
    background: '#FFFFFF',
    foreground: gray[900],
    card: '#FFFFFF',
    cardForeground: gray[900],
    popover: '#FFFFFF',
    popoverForeground: gray[900],
    primary: sentient[500],
    primaryForeground: '#FFFFFF',
    secondary: gray[100],
    secondaryForeground: gray[900],
    muted: gray[100],
    mutedForeground: gray[500],
    accent: sentient[100],
    accentForeground: gray[900],
    destructive: error[500],
    destructiveForeground: '#FFFFFF',
    border: gray[200],
    input: gray[200],
    ring: sentient[500],
  },
} as const

// 语义化颜色（基于当前主题）
export const semanticColors = {
  background: {
    DEFAULT: colors.white,
    subtle: gray[50],
    muted: gray[100],
    emphasis: gray[200],
  },
  foreground: {
    DEFAULT: gray[900],
    muted: gray[600],
    subtle: gray[500],
    disabled: gray[400],
  },
  border: {
    DEFAULT: gray[200],
    muted: gray[100],
    emphasis: gray[300],
  },
} as const

export type Colors = typeof colors
export type Themes = typeof themes
export type SemanticColors = typeof semanticColors
