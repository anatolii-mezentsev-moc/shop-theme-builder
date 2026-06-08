import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type PanelProps = HTMLAttributes<HTMLDivElement>

export function Panel({ className, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] shadow-sm',
        className,
      )}
      {...props}
    />
  )
}
