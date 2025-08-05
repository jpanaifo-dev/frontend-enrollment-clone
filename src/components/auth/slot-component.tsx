import { cn } from '@/lib/utils'
import { SlotProps } from 'input-otp'

export function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'flex size-16 items-center justify-center rounded-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow',
        { 'z-10 border border-ring ring-[3px] ring-ring/20': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
