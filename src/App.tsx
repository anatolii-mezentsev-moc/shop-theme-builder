import { ThemeSidebar } from './components/builder/theme-sidebar'
import { ShopPreview } from './components/preview/shop-preview'
import { useThemeBuilder } from './hooks/use-theme-builder'

function App() {
  const {
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
    presetsLimit,
  } = useThemeBuilder()

  return (
    <main
      className="min-h-screen bg-[var(--builder-bg)] px-3 py-3 text-[var(--builder-text)] md:px-4 md:py-4"
      style={{ ...themeStyles, fontFamily: 'var(--builder-body-font)' }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 xl:flex-row">
        <ThemeSidebar
          theme={theme}
          fonts={fonts}
          fontsError={fontsError}
          isFontsLoading={isFontsLoading}
          lockedSettings={lockedSettings}
          presets={presets}
          onUpdate={updateTheme}
          onToggleSettingLock={toggleSettingLock}
          onShuffle={shuffleTheme}
          onCopyShareUrl={copyShareUrl}
          onSavePreset={saveCurrentThemeAsPreset}
          onLoadPreset={loadPreset}
          onRenamePreset={renamePreset}
          onDeletePreset={deletePreset}
          presetsLimit={presetsLimit}
        />

        <ShopPreview />
      </div>
    </main>
  )
}

export default App
