import { Copy, Pencil, Save, Shuffle, Trash2 } from 'lucide-react'
import {
  BASE_COLORS,
  MENU_ACCENTS,
  MENU_COLORS,
  RADIUS_OPTIONS,
  THEME_COLORS,
} from '../../data/theme-options'
import type {
  BaseColorKey,
  MenuAccentKey,
  MenuColorKey,
  ThemeConfig,
  ThemeColorKey,
  ThemeFieldKey,
  ThemeLocks,
  ThemePreset,
} from '../../types/theme'
import { Button } from '../ui/button'
import { Panel } from '../ui/panel'
import { FontSelect } from './font-select'
import { ThemeSelect } from './theme-select'

type ThemeSidebarProps = {
  theme: ThemeConfig
  fonts: string[]
  fontsError: string | null
  isFontsLoading: boolean
  lockedSettings: ThemeLocks
  presets: ThemePreset[]
  onUpdate: <K extends ThemeFieldKey>(key: K, value: ThemeConfig[K]) => void
  onToggleSettingLock: (key: ThemeFieldKey) => void
  onShuffle: () => void
  onCopyShareUrl: () => Promise<boolean>
  onSavePreset: (name: string) => { ok: boolean; reason?: string }
  onLoadPreset: (presetId: string) => boolean
  onRenamePreset: (presetId: string, name: string) => { ok: boolean; reason?: string }
  onDeletePreset: (presetId: string) => boolean
  presetsLimit: number
}

function toOptions(items: readonly string[]) {
  return items.map((item) => ({ label: item, value: item }))
}

export function ThemeSidebar({
  theme,
  fonts,
  fontsError,
  isFontsLoading,
  lockedSettings,
  presets,
  onUpdate,
  onToggleSettingLock,
  onShuffle,
  onCopyShareUrl,
  onSavePreset,
  onLoadPreset,
  onRenamePreset,
  onDeletePreset,
  presetsLimit,
}: ThemeSidebarProps) {
  const handleCopy = async () => {
    const ok = await onCopyShareUrl()
    if (ok) {
      window.alert('Link copied to clipboard')
      return
    }

    window.alert('Failed to copy link')
  }

  const handleSavePreset = () => {
    const name = window.prompt('Preset name', `Preset ${presets.length + 1}`)
    if (name === null) {
      return
    }

    const result = onSavePreset(name)
    if (!result.ok) {
      window.alert(result.reason || 'Could not save preset.')
      return
    }

    window.alert('Preset saved.')
  }

  const handleLoadPreset = (presetId: string) => {
    const loaded = onLoadPreset(presetId)
    if (!loaded) {
      window.alert('Preset not found.')
    }
  }

  const handleRenamePreset = (preset: ThemePreset) => {
    const nextName = window.prompt('Rename preset', preset.name)
    if (nextName === null) {
      return
    }

    const result = onRenamePreset(preset.id, nextName)
    if (!result.ok) {
      window.alert(result.reason || 'Could not rename preset.')
    }
  }

  const handleDeletePreset = (preset: ThemePreset) => {
    const confirmed = window.confirm(`Delete preset "${preset.name}"?`)
    if (!confirmed) {
      return
    }

    const deleted = onDeletePreset(preset.id)
    if (!deleted) {
      window.alert('Preset not found.')
    }
  }

  return (
    <aside className="w-full xl:w-[390px] xl:min-w-[390px]">
      <Panel className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--builder-muted-text)]">
              Theme Builder
            </p>
            <h1
              className="text-2xl text-[var(--builder-text)]"
              style={{ fontFamily: 'var(--builder-heading-font)' }}
            >
              Shop Theme
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onShuffle}>
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto pr-3">
          <div className="rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-[var(--builder-text)]">
                Theme Presets
              </p>
              <Button size="sm" variant="secondary" onClick={handleSavePreset}>
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
            <p className="mb-3 text-xs text-[var(--builder-muted-text)]">
              Save favorite combinations. Limit: {presetsLimit} presets.
            </p>

            <div className="space-y-2">
              {presets.length === 0 ? (
                <p className="text-xs text-[var(--builder-muted-text)]">
                  No saved presets yet.
                </p>
              ) : (
                presets.map((preset) => (
                  <div
                    key={preset.id}
                    className="flex items-center justify-between gap-2 rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-bg)] p-2"
                  >
                    <button
                      type="button"
                      onClick={() => handleLoadPreset(preset.id)}
                      className="min-w-0 flex-1 truncate text-left text-sm text-[var(--builder-text)] hover:underline"
                      title="Load preset"
                    >
                      {preset.name}
                    </button>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => handleRenamePreset(preset)}
                        title="Rename preset"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => handleDeletePreset(preset)}
                        title="Delete preset"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <p className="text-xs text-[var(--builder-muted-text)]">
            Locked settings stay unchanged when you click Shuffle.
          </p>

          <ThemeSelect
            label="Base color"
            value={theme.baseColor}
            options={toOptions(Object.keys(BASE_COLORS))}
            locked={lockedSettings.baseColor}
            onToggleLock={() => onToggleSettingLock('baseColor')}
            onChange={(event) =>
              onUpdate('baseColor', event.target.value as BaseColorKey)
            }
          />

          <ThemeSelect
            label="Theme color"
            value={theme.themeColor}
            options={toOptions(Object.keys(THEME_COLORS))}
            locked={lockedSettings.themeColor}
            onToggleLock={() => onToggleSettingLock('themeColor')}
            onChange={(event) =>
              onUpdate('themeColor', event.target.value as ThemeColorKey)
            }
          />

          <FontSelect
            label={isFontsLoading ? 'Heading font (loading...)' : 'Heading font'}
            value={theme.headingFont}
            fonts={fonts}
            locked={lockedSettings.headingFont}
            onToggleLock={() => onToggleSettingLock('headingFont')}
            onChange={(font) => onUpdate('headingFont', font)}
          />

          <FontSelect
            label={isFontsLoading ? 'Body font (loading...)' : 'Body font'}
            value={theme.bodyFont}
            fonts={fonts}
            locked={lockedSettings.bodyFont}
            onToggleLock={() => onToggleSettingLock('bodyFont')}
            onChange={(font) => onUpdate('bodyFont', font)}
          />

          <ThemeSelect
            label="Radius"
            value={theme.radius}
            options={toOptions(RADIUS_OPTIONS)}
            locked={lockedSettings.radius}
            onToggleLock={() => onToggleSettingLock('radius')}
            onChange={(event) =>
              onUpdate('radius', event.target.value as ThemeConfig['radius'])
            }
          />

          <ThemeSelect
            label="Menu color"
            value={theme.menuColor}
            options={toOptions(Object.keys(MENU_COLORS))}
            locked={lockedSettings.menuColor}
            onToggleLock={() => onToggleSettingLock('menuColor')}
            onChange={(event) =>
              onUpdate('menuColor', event.target.value as MenuColorKey)
            }
          />

          <ThemeSelect
            label="Menu accent"
            value={theme.menuAccent}
            options={toOptions(Object.keys(MENU_ACCENTS))}
            locked={lockedSettings.menuAccent}
            onToggleLock={() => onToggleSettingLock('menuAccent')}
            onChange={(event) =>
              onUpdate('menuAccent', event.target.value as MenuAccentKey)
            }
          />

          {fontsError ? (
            <p className="rounded-[var(--builder-radius)] bg-orange-100 px-3 py-2 text-xs text-orange-800">
              {fontsError}
            </p>
          ) : null}
        </div>
      </Panel>
    </aside>
  )
}
