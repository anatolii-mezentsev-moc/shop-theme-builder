import { Check, ChevronDown, Lock, Unlock } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { mountGoogleFont } from '../../lib/fonts'

type FontSelectProps = {
  label: string
  value: string
  fonts: string[]
  onChange: (font: string) => void
  locked?: boolean
  onToggleLock?: () => void
}

export function FontSelect({
  label,
  value,
  fonts,
  onChange,
  locked,
  onToggleLock,
}: FontSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const options = useMemo(
    () => fonts.map((font) => ({ label: font, value: font })),
    [fonts],
  )

  useEffect(() => {
    if (!open) {
      return
    }

    for (const font of fonts.slice(0, 60)) {
      mountGoogleFont(font)
    }
  }, [open, fonts])

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const selectedLabel = options.find((option) => option.value === value)?.label ?? value

  const handleSelect = (font: string) => {
    onChange(font)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-[var(--builder-text)]">{label}</span>
        {onToggleLock ? (
          <button
            type="button"
            onClick={onToggleLock}
            className="inline-flex h-7 items-center gap-1 rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] px-2 text-xs text-[var(--builder-muted-text)] hover:bg-[var(--builder-accent-soft)]"
            title={locked ? 'Unlock setting' : 'Lock setting'}
          >
            {locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {locked ? 'Locked' : 'Lock'}
          </button>
        ) : null}
      </div>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-between rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] px-3 text-left text-sm text-[var(--builder-text)] outline-none transition focus:border-[var(--builder-accent)] focus:ring-2 focus:ring-[var(--builder-accent-soft)]"
          style={{ fontFamily: `'${selectedLabel}', sans-serif` }}
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </button>

        {open ? (
          <ul
            role="listbox"
            className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] p-1 shadow-lg"
          >
            {options.map((option) => {
              const selected = option.value === value

              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onMouseEnter={() => mountGoogleFont(option.value)}
                    onFocus={() => mountGoogleFont(option.value)}
                    onClick={() => handleSelect(option.value)}
                    className="flex w-full items-center justify-between gap-2 rounded-[var(--builder-radius)] px-2 py-2 text-left text-base text-[var(--builder-text)] transition hover:bg-[var(--builder-accent-soft)]"
                    style={{ fontFamily: `'${option.value}', sans-serif` }}
                  >
                    <span className="truncate">{option.label}</span>
                    {selected ? <Check className="h-4 w-4 shrink-0" /> : null}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
