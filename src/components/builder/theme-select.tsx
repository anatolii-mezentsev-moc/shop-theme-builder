import type { SelectHTMLAttributes } from 'react'
import { Lock, Unlock } from 'lucide-react'
import { cn } from '../../lib/utils'

type Option = {
  label: string
  value: string
}

type ThemeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Option[]
  locked?: boolean
  onToggleLock?: () => void
}

export function ThemeSelect({
  label,
  options,
  className,
  locked,
  onToggleLock,
  ...props
}: ThemeSelectProps) {
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
      <select
        className={cn(
          'h-10 rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] px-3 text-sm text-[var(--builder-text)] outline-none transition focus:border-[var(--builder-accent)] focus:ring-2 focus:ring-[var(--builder-accent-soft)]',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
