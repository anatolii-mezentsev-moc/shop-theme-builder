import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_THEME, FALLBACK_FONTS } from '../data/theme-options'
import { fetchGoogleFontFamilies, mountGoogleFont } from '../lib/fonts'
import {
  getShuffledFonts,
  getShuffledTheme,
  getThemeCssVariables,
  parseThemeFromUrl,
  serializeTheme,
} from '../lib/theme'
import type {
  ThemeConfig,
  ThemeFieldKey,
  ThemeLocks,
  ThemePreset,
} from '../types/theme'

const DEFAULT_LOCKS: ThemeLocks = {
  baseColor: false,
  themeColor: false,
  headingFont: false,
  bodyFont: false,
  radius: false,
  menuColor: false,
  menuAccent: false,
}

const PRESETS_STORAGE_KEY = 'shop-theme-presets'
const PRESETS_LIMIT = 8

function readPresetsFromStorage(): ThemePreset[] {
  try {
    const raw = window.localStorage.getItem(PRESETS_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as ThemePreset[]
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((item) => item?.id && item?.name && item?.theme)
      .sort((a, b) => b.updatedAt - a.updatedAt)
  } catch {
    return []
  }
}

function writePresetsToStorage(presets: ThemePreset[]) {
  window.localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets))
}

export function useThemeBuilder() {
  const [theme, setTheme] = useState<ThemeConfig>(() =>
    parseThemeFromUrl(window.location.search, DEFAULT_THEME),
  )
  const [fonts, setFonts] = useState<string[]>(FALLBACK_FONTS)
  const [fontsError, setFontsError] = useState<string | null>(null)
  const [isFontsLoading, setIsFontsLoading] = useState(true)
  const [lockedSettings, setLockedSettings] = useState<ThemeLocks>(DEFAULT_LOCKS)
  const [presets, setPresets] = useState<ThemePreset[]>(() =>
    readPresetsFromStorage(),
  )

  useEffect(() => {
    mountGoogleFont(theme.headingFont)
    mountGoogleFont(theme.bodyFont)
  }, [theme.headingFont, theme.bodyFont])

  useEffect(() => {
    let isMounted = true

    fetchGoogleFontFamilies()
      .then((allFonts) => {
        if (isMounted && allFonts.length > 0) {
          setFonts(allFonts)
          setFontsError(null)
        }
      })
      .catch(() => {
        if (isMounted) {
          setFontsError('Failed to load the full font list. Using fallback fonts.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFontsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const query = serializeTheme(theme)
    const newUrl = `${window.location.pathname}?${query}`
    window.history.replaceState({}, '', newUrl)
  }, [theme])

  const themeStyles = useMemo(() => getThemeCssVariables(theme), [theme])

  const updateTheme = (key: keyof ThemeConfig, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }))
  }

  const shuffleTheme = () => {
    setTheme((prev) => {
      const nextTheme = getShuffledTheme(prev)
      const shuffledFonts = getShuffledFonts(prev, fonts)
      const candidate = {
        ...nextTheme,
        ...shuffledFonts,
      }

      return {
        baseColor: lockedSettings.baseColor ? prev.baseColor : candidate.baseColor,
        themeColor: lockedSettings.themeColor
          ? prev.themeColor
          : candidate.themeColor,
        headingFont: lockedSettings.headingFont
          ? prev.headingFont
          : candidate.headingFont,
        bodyFont: lockedSettings.bodyFont ? prev.bodyFont : candidate.bodyFont,
        radius: lockedSettings.radius ? prev.radius : candidate.radius,
        menuColor: lockedSettings.menuColor ? prev.menuColor : candidate.menuColor,
        menuAccent: lockedSettings.menuAccent
          ? prev.menuAccent
          : candidate.menuAccent,
      }
    })
  }

  const toggleSettingLock = (key: ThemeFieldKey) => {
    setLockedSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const copyShareUrl = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      return true
    } catch {
      return false
    }
  }

  const saveCurrentThemeAsPreset = (name: string): { ok: boolean; reason?: string } => {
    const normalized = name.trim()
    if (!normalized) {
      return { ok: false, reason: 'Preset name cannot be empty.' }
    }

    setPresets((prev) => {
      const now = Date.now()
      const existing = prev.find(
        (item) => item.name.toLowerCase() === normalized.toLowerCase(),
      )

      let next: ThemePreset[]
      if (existing) {
        next = prev.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                name: normalized,
                theme,
                updatedAt: now,
              }
            : item,
        )
      } else {
        const created: ThemePreset = {
          id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
          name: normalized,
          theme,
          createdAt: now,
          updatedAt: now,
        }
        next = [created, ...prev]
      }

      const limited = next
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, PRESETS_LIMIT)
      writePresetsToStorage(limited)
      return limited
    })

    return { ok: true }
  }

  const loadPreset = (presetId: string): boolean => {
    const preset = presets.find((item) => item.id === presetId)
    if (!preset) {
      return false
    }

    setTheme(preset.theme)
    return true
  }

  const renamePreset = (
    presetId: string,
    nextName: string,
  ): { ok: boolean; reason?: string } => {
    const normalized = nextName.trim()
    if (!normalized) {
      return { ok: false, reason: 'Preset name cannot be empty.' }
    }

    const hasDuplicate = presets.some(
      (item) =>
        item.id !== presetId && item.name.toLowerCase() === normalized.toLowerCase(),
    )
    if (hasDuplicate) {
      return { ok: false, reason: 'A preset with this name already exists.' }
    }

    let updated = false
    setPresets((prev) => {
      const now = Date.now()
      const next = prev.map((item) => {
        if (item.id !== presetId) {
          return item
        }

        updated = true
        return {
          ...item,
          name: normalized,
          updatedAt: now,
        }
      })

      const sorted = next.sort((a, b) => b.updatedAt - a.updatedAt)
      writePresetsToStorage(sorted)
      return sorted
    })

    return updated ? { ok: true } : { ok: false, reason: 'Preset not found.' }
  }

  const deletePreset = (presetId: string): boolean => {
    let deleted = false
    setPresets((prev) => {
      const next = prev.filter((item) => {
        const keep = item.id !== presetId
        if (!keep) {
          deleted = true
        }
        return keep
      })
      writePresetsToStorage(next)
      return next
    })

    return deleted
  }

  return {
    theme,
    fonts,
    themeStyles,
    fontsError,
    isFontsLoading,
    lockedSettings,
    presets,
    updateTheme,
    toggleSettingLock,
    shuffleTheme,
    copyShareUrl,
    saveCurrentThemeAsPreset,
    loadPreset,
    renamePreset,
    deletePreset,
    presetsLimit: PRESETS_LIMIT,
  }
}
