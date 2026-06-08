import {
  BASE_COLORS,
  MENU_ACCENTS,
  MENU_COLORS,
  THEME_COLORS,
  RADIUS_OPTIONS,
} from '../data/theme-options'
import type {
  BaseColorKey,
  MenuAccentKey,
  MenuColorKey,
  ThemeColorKey,
  ThemeConfig,
} from '../types/theme'
import { pickRandom } from './utils'

const URL_KEYS = {
  baseColor: 'b',
  themeColor: 't',
  headingFont: 'h',
  bodyFont: 'f',
  radius: 'r',
  menuColor: 'm',
  menuAccent: 'a',
} as const

const RADIUS_MAP: Record<ThemeConfig['radius'], string> = {
  none: '0px',
  small: '6px',
  medium: '12px',
  large: '18px',
}

export function getThemeCssVariables(config: ThemeConfig): Record<string, string> {
  const base = BASE_COLORS[config.baseColor]
  const theme = THEME_COLORS[config.themeColor]
  const menu = MENU_COLORS[config.menuColor]
  const menuAccent = MENU_ACCENTS[config.menuAccent]

  return {
    '--builder-bg': base.background,
    '--builder-surface': base.surface,
    '--builder-border': base.border,
    '--builder-text': base.text,
    '--builder-muted-text': base.mutedText,
    '--builder-accent': theme.solid,
    '--builder-accent-soft': theme.soft,
    '--builder-accent-text': theme.text,
    '--builder-menu': menu.solid,
    '--builder-menu-soft': menu.soft,
    '--builder-menu-text': menu.text,
    '--builder-menu-accent': menuAccent.solid,
    '--builder-menu-accent-soft': menuAccent.soft,
    '--builder-menu-accent-text': menuAccent.text,
    '--builder-radius': RADIUS_MAP[config.radius],
    '--builder-heading-font': `'${config.headingFont}', serif`,
    '--builder-body-font': `'${config.bodyFont}', sans-serif`,
  }
}

export function serializeTheme(config: ThemeConfig): string {
  const params = new URLSearchParams()
  params.set(URL_KEYS.baseColor, config.baseColor)
  params.set(URL_KEYS.themeColor, config.themeColor)
  params.set(URL_KEYS.headingFont, config.headingFont)
  params.set(URL_KEYS.bodyFont, config.bodyFont)
  params.set(URL_KEYS.radius, config.radius)
  params.set(URL_KEYS.menuColor, config.menuColor)
  params.set(URL_KEYS.menuAccent, config.menuAccent)
  return params.toString()
}

function isBaseColor(value: string): value is BaseColorKey {
  return value in BASE_COLORS
}

function isThemeColor(value: string): value is ThemeColorKey {
  return value in THEME_COLORS
}

function isThemeRadius(value: string): value is ThemeConfig['radius'] {
  return RADIUS_OPTIONS.includes(value as ThemeConfig['radius'])
}

function isMenuColor(value: string): value is MenuColorKey {
  return value in MENU_COLORS
}

function isMenuAccent(value: string): value is MenuAccentKey {
  return value in MENU_ACCENTS
}

export function parseThemeFromUrl(
  search: string,
  fallback: ThemeConfig,
): ThemeConfig {
  const params = new URLSearchParams(search)

  const baseColor = params.get(URL_KEYS.baseColor)
  const themeColor = params.get(URL_KEYS.themeColor)
  const headingFont = params.get(URL_KEYS.headingFont)
  const bodyFont = params.get(URL_KEYS.bodyFont)
  const radius = params.get(URL_KEYS.radius)
  const menuColor = params.get(URL_KEYS.menuColor)
  const menuAccent = params.get(URL_KEYS.menuAccent)

  return {
    baseColor: baseColor && isBaseColor(baseColor) ? baseColor : fallback.baseColor,
    themeColor: themeColor && isThemeColor(themeColor) ? themeColor : fallback.themeColor,
    headingFont: headingFont || fallback.headingFont,
    bodyFont: bodyFont || fallback.bodyFont,
    radius: radius && isThemeRadius(radius) ? radius : fallback.radius,
    menuColor: menuColor && isMenuColor(menuColor) ? menuColor : fallback.menuColor,
    menuAccent: menuAccent && isMenuAccent(menuAccent) ? menuAccent : fallback.menuAccent,
  }
}

export function getShuffledTheme(current: ThemeConfig): ThemeConfig {
  const baseColors = Object.keys(BASE_COLORS) as BaseColorKey[]
  const themeColors = Object.keys(THEME_COLORS) as ThemeColorKey[]
  const menuColors = Object.keys(MENU_COLORS) as MenuColorKey[]
  const menuAccents = Object.keys(MENU_ACCENTS) as MenuAccentKey[]

  const next = {
    baseColor: pickRandom(baseColors),
    themeColor: pickRandom(themeColors),
    headingFont: current.headingFont,
    bodyFont: current.bodyFont,
    radius: pickRandom(RADIUS_OPTIONS),
    menuColor: pickRandom(menuColors),
    menuAccent: pickRandom(menuAccents),
  }

  if (Math.random() > 0.45) {
    next.headingFont = current.bodyFont
    next.bodyFont = current.headingFont
  }

  return next
}

export function getShuffledFonts(
  current: ThemeConfig,
  fonts: string[],
): Pick<ThemeConfig, 'headingFont' | 'bodyFont'> {
  if (fonts.length < 2) {
    if (Math.random() > 0.45) {
      return {
        headingFont: current.bodyFont,
        bodyFont: current.headingFont,
      }
    }

    return {
      headingFont: current.headingFont,
      bodyFont: current.bodyFont,
    }
  }

  const pickDifferent = (pool: string[], exclude: string) => {
    const filtered = pool.filter((item) => item !== exclude)
    return filtered.length > 0 ? pickRandom(filtered) : pickRandom(pool)
  }

  const headingFont = pickDifferent(fonts, current.headingFont)
  const bodyPool = fonts.filter((font) => font !== headingFont)
  const bodyFont = pickRandom(bodyPool.length > 0 ? bodyPool : fonts)

  return {
    headingFont,
    bodyFont,
  }
}
