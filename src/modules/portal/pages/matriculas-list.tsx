import { Badge } from '@/components/ui/badge'
import { IEnrollmentStage } from '@/types'
import Link from 'next/link'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'

interface MatriculasListSectionProps {
  enrollmentsList: IEnrollmentStage[]
}

export const MatriculasListSection = (props: MatriculasListSectionProps) => {
  const { enrollmentsList } = props

  // Calculamos el número de columnas según la cantidad de elementos
  const gridColumns =
    enrollmentsList.length >= 3
      ? 'lg:grid-cols-3'
      : enrollmentsList.length === 2
      ? 'lg:grid-cols-2'
      : 'lg:grid-cols-1'

  // Función helper para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible'
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: es })
    } catch (error) {
      console.error('Error formateando fecha:', error)
      return dateString // Devuelve el string original si hay error
    }
  }

  const getMatriculaStatus = (
    matricula: IEnrollmentStage
  ): 'regular' | 'extemporanea' | null => {
    const now = new Date()
    const startRegular = matricula.start_date
      ? parseISO(formatDate(matricula.start_date))
      : null
    const endRegular = matricula.end_date
      ? parseISO(formatDate(matricula.end_date))
      : null
    const startExt = matricula.untimely_start_date
      ? parseISO(formatDate(matricula.untimely_start_date))
      : null
    const endExt = matricula.untimely_end_date
      ? parseISO(formatDate(matricula.untimely_end_date))
      : null

    if (
      startRegular &&
      endRegular &&
      now >= startRegular &&
      now <= endRegular
    ) {
      return 'regular'
    }
    if (startExt && endExt && now >= startExt && now <= endExt) {
      return 'extemporanea'
    }

    return null
  }

  return (
    <div className="w-full">
      {/* Grid responsive para todas las pantallas */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns} gap-4`}>
        {enrollmentsList.map((matricula, index) => (
          <Card
            key={index}
            className={cn('shadow-none border flex flex-col gap-3', {
              'bg-gradient-to-r from-blue-700 to-blue-900 text-white':
                !matricula?.enrollment,
            })}
          >
            <CardHeader className="pb-0">
              <CardTitle
                className={cn(
                  'text-lg font-extrabold flex justify-between',
                  matricula?.enrollment ? 'text-gray-700' : 'text-white/90'
                )}
              >
                <div className="flex flex-col gap-2">
                  <Badge
                    className={cn(
                      'rounded-full font-medium border',
                      matricula?.enrollment
                        ? 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-400'
                        : 'bg-white/20 text-white/90 border-white/30 hover:bg-white/30'
                    )}
                  >
                    Período: {matricula?.period_name}
                  </Badge>
                  <p className={matricula?.enrollment ? '' : 'text-white/80'}>
                    {matricula.description}
                  </p>
                </div>
                <div>
                  {getMatriculaStatus(matricula) === 'regular' && (
                    <Badge className="rounded-full text-xs bg-green-100 text-green-800 border-green-200">
                      Matrícula Regular
                    </Badge>
                  )}
                  {getMatriculaStatus(matricula) === 'extemporanea' && (
                    <Badge className="rounded-full text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                      Matrícula Extemporánea
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div>
                    <p
                      className={cn(
                        'text-sm',
                        matricula?.enrollment
                          ? 'text-muted-foreground'
                          : 'text-white/70'
                      )}
                    >
                      {matricula?.enrollment
                        ? 'Tienes una matrícula completada en:'
                        : 'Tienes una matrícula pendiente en:'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'rounded-full text-xs',
                          matricula?.enrollment
                            ? 'bg-gray-100 text-gray-600 border-gray-200'
                            : 'bg-white/20 text-white border-white/40'
                        )}
                      >
                        {matricula.program_code}
                      </Badge>
                      <h3
                        className={cn(
                          'text-sm font-semibold uppercase',
                          matricula?.enrollment
                            ? 'text-gray-700'
                            : 'text-white/90'
                        )}
                      >
                        {matricula.program_type}: {matricula.program_name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-lg">
                <div className="text-sm">
                  <p
                    className={cn(
                      'font-medium mb-1',
                      matricula?.enrollment ? 'text-gray-600' : 'text-white/80'
                    )}
                  >
                    Fechas para matrícula:
                  </p>
                  <div className="pl-2 space-y-1">
                    <p>
                      <span
                        className={cn(
                          'font-semibold',
                          matricula?.enrollment
                            ? 'text-gray-700'
                            : 'text-white/90'
                        )}
                      >
                        Regular:
                      </span>{' '}
                      <span
                        className={
                          matricula?.enrollment
                            ? 'text-gray-600'
                            : 'text-white/70'
                        }
                      >
                        Desde el {formatDate(matricula.start_date)} hasta el{' '}
                        {formatDate(matricula.end_date)}
                      </span>
                    </p>
                    <p>
                      <span
                        className={cn(
                          'font-semibold',
                          matricula?.enrollment
                            ? 'text-gray-700'
                            : 'text-white/90'
                        )}
                      >
                        Extemporánea:
                      </span>{' '}
                      <span
                        className={
                          matricula?.enrollment
                            ? 'text-gray-600'
                            : 'text-white/70'
                        }
                      >
                        Desde el {formatDate(matricula.untimely_start_date)}{' '}
                        hasta el {formatDate(matricula.untimely_end_date)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <MatriculaActionButton
                  matricula={matricula}
                  fullWidth
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface MatriculaActionButtonProps {
  matricula: IEnrollmentStage
  fullWidth?: boolean
}

const MatriculaActionButton = ({
  matricula,
  fullWidth = false,
}: MatriculaActionButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center text-sm px-4 py-2 rounded-md font-medium transition-all duration-200'

  if (!matricula?.enrollment) {
    return (
      <Link
        href={
          APP_URL.MATRICULA.START_ENROLLMENT.URL_BASE +
          '?matricula=' +
          matricula.id +
          '&student=' +
          matricula.student_uuid
        }
        className={`${baseClasses} ${
          fullWidth ? 'w-full' : ''
        } bg-blue-50 text-blue-800 hover:bg-blue-100 shadow hover:shadow-md font-medium border-blue-600`}
      >
        Realizar Matrícula
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    )
  }

  if (matricula?.enrollment && matricula?.enrollment_id) {
    return (
      <Link
        href={APP_URL.MATRICULA.MATRICULAS_LIST.DETAIL(
          matricula?.enrollment_id.toString()
        )}
        className={`${baseClasses} ${
          fullWidth ? 'w-full' : ''
        } border border-green-300 font-bold text-green-800 hover:bg-green-50 shadow-sm bg-green-100`}
      >
        Ver Matrícula
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    )
  }

  return null
}
