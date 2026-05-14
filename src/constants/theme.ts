/**
 * ═══════════════════════════════════════════════════════════════
 *  AI LIFE COACH — Design Token System
 *  "Terminal Black" Premium Dark Aesthetic
 * ═══════════════════════════════════════════════════════════════
 *
 *  Every color, spacing value, typography token, shadow, and
 *  animation timing used in the app lives here. Components NEVER
 *  use raw hex values — they reference these tokens.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Color Palette ──────────────────────────────────────────────

export const palette = {
  // Blacks & Backgrounds (Terminal Black system)
  black: {
    pure: '#000000',
    base: '#050505',
    card: '#0C0C0E',
    elevated: '#111114',
    surface: '#161619',
    muted: '#1C1C20',
    border: '#242428',
    hover: '#2A2A30',
  },

  // Neon Cyan (Primary accent)
  cyan: {
    50: '#E0FFFF',
    100: '#B3FFFF',
    200: '#80FFFF',
    300: '#4DFFFF',
    400: '#1AFFFF',
    500: '#00FFFF',
    600: '#00E6E6',
    700: '#00CCCC',
    800: '#00B3B3',
    900: '#009999',
    glow: 'rgba(0, 255, 255, 0.2)',
    glowStrong: 'rgba(0, 255, 255, 0.4)',
  },

  // Success / Growth Greens
  green: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
    muted: '#2D5A3D',
    glow: 'rgba(76, 175, 80, 0.15)',
  },

  // Danger / Penalty Reds
  red: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
    muted: '#5A2D2D',
    glow: 'rgba(244, 67, 54, 0.15)',
  },

  // Information / Cool Blues
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
    muted: '#1A3A5C',
    glow: 'rgba(33, 150, 243, 0.15)',
  },

  // Purple / XP / Level
  purple: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
    muted: '#3D2654',
    glow: 'rgba(156, 39, 176, 0.15)',
  },

  // Text
  text: {
    primary: '#FFFFFF', // Pure white for max contrast
    secondary: '#A1A1AA', // Richer gray
    tertiary: '#71717A',
    disabled: '#52525B',
    inverse: '#000000',
  },

  // Misc
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

// ─── Semantic Colors ────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bg: palette.black.base,
  bgCard: palette.black.card,
  bgElevated: palette.black.elevated,
  bgSurface: palette.black.surface,
  bgMuted: palette.black.muted,

  // Borders
  border: palette.black.border,
  borderLight: 'rgba(255, 255, 255, 0.06)',
  borderFocus: palette.cyan[500],

  // Primary (Cyan)
  primary: palette.cyan[500],
  primaryLight: palette.cyan[300],
  primaryDark: palette.cyan[700],
  primaryGlow: palette.cyan.glow,
  primaryGlowStrong: palette.cyan.glowStrong,

  // Semantics
  success: palette.green[500],
  successMuted: palette.green.muted,
  successGlow: palette.green.glow,

  danger: palette.red[500],
  dangerMuted: palette.red.muted,
  dangerGlow: palette.red.glow,

  info: palette.blue[500],
  infoMuted: palette.blue.muted,
  infoGlow: palette.blue.glow,

  xp: palette.purple[500],
  xpMuted: palette.purple.muted,
  xpGlow: palette.purple.glow,

  // Text
  textPrimary: palette.text.primary,
  textSecondary: palette.text.secondary,
  textTertiary: palette.text.tertiary,
  textDisabled: palette.text.disabled,
  textInverse: palette.text.inverse,
} as const;

// ─── Typography ─────────────────────────────────────────────────

export const typography = {
  family: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
    extraBold: 'System',
    black: 'System',
    mono: 'monospace',
  },

  size: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 22,
    xl: 28,
    '2xl': 36,
    '3xl': 48,
    '4xl': 64,
    '5xl': 80,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
    widest: 2.0,
  },
} as const;

// ─── Spacing ────────────────────────────────────────────────────

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

// ─── Border Radii ───────────────────────────────────────────────

export const radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// ─── Shadows ────────────────────────────────────────────────────

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  }),
} as const;

// ─── Animation Timings ──────────────────────────────────────────

export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  springBouncy: {
    damping: 10,
    stiffness: 180,
    mass: 0.8,
  },
} as const;

// ─── Z-Index ────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  card: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
  max: 100,
} as const;

// ─── Screen Breakpoints ─────────────────────────────────────────

export const breakpoints = {
  sm: 360,
  md: 390,
  lg: 428,
  xl: 768,  // Tablet
} as const;
