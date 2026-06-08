export type BaseColorKey = keyof typeof import('../data/theme-options').BASE_COLORS

export type ThemeColorKey =
  keyof typeof import('../data/theme-options').THEME_COLORS

export type MenuColorKey =
  keyof typeof import('../data/theme-options').MENU_COLORS

export type MenuAccentKey =
  keyof typeof import('../data/theme-options').MENU_ACCENTS

export type RadiusOption = 'none' | 'small' | 'medium' | 'large'

export type ThemeConfig = {
  baseColor: BaseColorKey
  themeColor: ThemeColorKey
  headingFont: string
  bodyFont: string
  radius: RadiusOption
  menuColor: MenuColorKey
  menuAccent: MenuAccentKey
}

export type ThemeFieldKey = keyof ThemeConfig

export type ThemeLocks = Record<ThemeFieldKey, boolean>

export type ThemePreset = {
  id: string
  name: string
  theme: ThemeConfig
  createdAt: number
  updatedAt: number
}

export type ColorTokenSet = {
  background: string
  surface: string
  border: string
  text: string
  mutedText: string
}

export type AccentTokenSet = {
  solid: string
  soft: string
  text: string
}
