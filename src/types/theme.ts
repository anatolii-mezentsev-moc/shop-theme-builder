export type RadiusOption = 'none' | 'small' | 'medium' | 'large'

export type ThemeConfig = {
  baseColor: string
  themeColor: string
  headingFont: string
  bodyFont: string
  radius: RadiusOption
  menuColor: string
  menuAccent: string
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
