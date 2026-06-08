import type { AccentTokenSet, ColorTokenSet, ThemeConfig } from '../types/theme'

export const BASE_COLORS: Record<string, ColorTokenSet> = {
  Neutral: {
    background: '#f8f3ea',
    surface: '#fffdf8',
    border: '#e3d7c4',
    text: '#1f1a12',
    mutedText: '#766957',
  },
  Slate: {
    background: '#dde7f2',
    surface: '#eef3f9',
    border: '#a8bdd6',
    text: '#0f1f36',
    mutedText: '#465d79',
  },
  Gray: {
    background: '#e7e7e7',
    surface: '#f5f5f5',
    border: '#bcbcbc',
    text: '#1a1a1a',
    mutedText: '#575757',
  },
  Zinc: {
    background: '#e8e8ec',
    surface: '#f6f6fa',
    border: '#babac6',
    text: '#171722',
    mutedText: '#535364',
  },
  Stone: {
    background: '#ede3d8',
    surface: '#fbf3ea',
    border: '#c8b6a3',
    text: '#2b2118',
    mutedText: '#6d5a49',
  },
}

export const THEME_COLORS: Record<string, AccentTokenSet> = {
  Amber: { solid: '#d97706', soft: '#fef3c7', text: '#78350f' },
  Blue: { solid: '#2563eb', soft: '#dbeafe', text: '#1e3a8a' },
  Cyan: { solid: '#0891b2', soft: '#cffafe', text: '#164e63' },
  Rose: { solid: '#e11d48', soft: '#ffe4e6', text: '#881337' },
}

export const MENU_COLORS: Record<string, AccentTokenSet> = {
  Charcoal: { solid: '#1f2937', soft: '#374151', text: '#f9fafb' },
  Forest: { solid: '#14532d', soft: '#166534', text: '#ecfdf5' },
  Navy: { solid: '#1e3a8a', soft: '#1d4ed8', text: '#eff6ff' },
  Cocoa: { solid: '#5b3428', soft: '#7c4b38', text: '#fff7ed' },
}

export const MENU_ACCENTS: Record<string, AccentTokenSet> = {
  Amber: { solid: '#f59e0b', soft: '#fcd34d', text: '#1f2937' },
  Mint: { solid: '#34d399', soft: '#6ee7b7', text: '#0f172a' },
  Coral: { solid: '#fb7185', soft: '#fda4af', text: '#1f2937' },
  Sky: { solid: '#38bdf8', soft: '#7dd3fc', text: '#0f172a' },
}

export const RADIUS_OPTIONS: ThemeConfig['radius'][] = [
  'none',
  'small',
  'medium',
  'large',
]

export const DEFAULT_THEME: ThemeConfig = {
  baseColor: 'Neutral',
  themeColor: 'Blue',
  headingFont: 'Playfair Display',
  bodyFont: 'Inter',
  radius: 'medium',
  menuColor: 'Charcoal',
  menuAccent: 'Amber',
}

export const FALLBACK_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Merriweather',
  'Oswald',
  'Nunito',
  'Playfair Display',
]
