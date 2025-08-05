import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { IEnrollmentStage } from '@/types'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getEnrollmentType(
  startDate: string,
  endDate: string,
  untimelyStart: string,
  untimelyEnd: string
): {
  status: 'regular' | 'untimely'
  message: string
} {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  const untimelyStartDate = new Date(untimelyStart)
  const untimelyEndDate = new Date(untimelyEnd)

  if (now >= start && now <= end) {
    return { status: 'regular', message: 'Matrícula Regular' }
  } else if (now >= untimelyStartDate && now <= untimelyEndDate) {
    return { status: 'untimely', message: 'Matrícula Extemporánea' }
  } else {
    return { status: 'regular', message: 'Matrícula Regular' }
  }
}

interface EnrollmentDataProps {
  enrollmentData?: IEnrollmentStage
}

export const EnrollmentData = (props: EnrollmentDataProps) => {
  const { enrollmentData } = props
  const { status, message } = getEnrollmentType(
    enrollmentData?.start_date ?? '',
    enrollmentData?.end_date ?? '',
    enrollmentData?.untimely_start_date ?? '',
    enrollmentData?.untimely_end_date ?? ''
  )

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'regular':
        return 'default'
      case 'untimely':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="p-6 space-y-3 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-medium text-foreground">
          Período de Matrícula
        </h1>
        <Badge
          variant={getStatusVariant(status)}
          className={cn('text-sm font-medium px-3 rounded-full', {
            'bg-green-100 text-green-800': status === 'regular',
            'bg-yellow-100 text-yellow-800': status === 'untimely',
          })}
        >
          {message}
        </Badge>
      </div>

      {/* Description */}
      {enrollmentData?.description && (
        <p className="font-bold leading-relaxed  text-xl md:text-2xl">
          {enrollmentData.description}
        </p>
      )}

      {/* Dates */}
      <div className="flex flex-col gap-6 sm:flex-row md:gap-8">
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Período Regular
          </div>
          <div className="text-sm font-medium">
            {formatDate(enrollmentData?.start_date ?? '')} -{' '}
            {formatDate(enrollmentData?.end_date ?? '')}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Período Extemporáneo
          </div>
          <div className="text-sm font-medium">
            {formatDate(enrollmentData?.untimely_start_date ?? '')} -{' '}
            {formatDate(enrollmentData?.untimely_end_date ?? '')}
          </div>
        </div>
      </div>
    </div>
  )
}
