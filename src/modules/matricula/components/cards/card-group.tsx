//card-group.tsx
'use client'
import { Badge } from '@/components/ui/badge'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { EnrollmentGroup } from '@/types'
import { Clock } from 'lucide-react'

interface EnrollmentGroupCardProps {
  group: EnrollmentGroup
  disabled?: boolean
  isSelected?: boolean
  onSelect?: (groupId: string) => void
}

export const EnrollmentGroupCard = ({
  group,
  disabled = false,
  isSelected = false,
  onSelect,
}: EnrollmentGroupCardProps) => {
  const availableSpots = group.max_students - group.students_enrolled
  const isFull = availableSpots <= 0
  const isDisabled = disabled || isFull

  return (
    <label
      htmlFor={`group-${group.id}`}
      className={cn(
        'border bg-white rounded-lg p-4 relative transition-colors block cursor-pointer peer',
        {
          'bg-muted/30 border-muted cursor-not-allowed': isDisabled,
          'border-primary border-2 bg-primary/10': isSelected && !isDisabled,
          'border-muted': !isSelected && !isDisabled,
        }
      )}
      onClick={() => {
        if (!isDisabled && onSelect) {
          onSelect(group.id.toString())
        }
      }}
    >
      {/* Availability Badge */}
      <div className="absolute right-4 top-4">
        {isFull ? (
          <Badge
            variant="destructive"
            className="text-xs rounded-full"
          >
            Sin cupos
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="text-xs rounded-full"
          >
            {availableSpots} cupos disponibles
          </Badge>
        )}
      </div>

      <div className="flex items-start gap-3">
        <RadioGroupItem
          value={group.id.toString()}
          id={`group-${group.id}`}
          disabled={isDisabled}
          className="mt-1"
        />

        <div className="space-y-3 w-full pr-20">
          <div className="flex flex-col gap-1">
            <div
              className={`font-extrabold ${
                isDisabled ? 'text-muted-foreground' : ''
              }`}
            >
              Grupo {group.group}
            </div>
            {group.start_date && group.end_date ? (
              <p className="text-sm text-gray-800 font-semibold">
                Del {group.start_date} al {group.end_date}
              </p>
            ) : (
              <p className="text-xs text-gray-500 italic font-semibold">
                Fechas no disponibles
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <div className={isDisabled ? 'text-muted-foreground' : ''}>
              <span className="font-medium">Docente:</span> {group.teacher}
            </div>

            {group.schedule.length > 0 && (
              <div className="space-y-1">
                <div
                  className={`font-medium ${
                    isDisabled ? 'text-muted-foreground' : ''
                  }`}
                >
                  Horarios:
                </div>
                {group.schedule.map((scheduleItem) => (
                  <div
                    key={scheduleItem.id}
                    className={`flex items-center gap-2 ${
                      isDisabled ? 'text-muted-foreground' : ''
                    }`}
                  >
                    <Clock className="h-3 w-3 shrink-0" />
                    <span className="text-xs">
                      <span className="font-medium">{scheduleItem.day}:</span>{' '}
                      {scheduleItem.start_time} - {scheduleItem.end_time} • Aula{' '}
                      {scheduleItem.room_name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </label>
  )
}
