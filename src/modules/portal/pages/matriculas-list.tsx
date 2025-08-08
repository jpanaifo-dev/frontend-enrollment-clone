'use client'

import { Badge } from '@/components/ui/badge'
import { IEnrollmentStage } from '@/types'
import Link from 'next/link'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface MatriculasListSectionProps {
  enrollmentsList: IEnrollmentStage[]
}

export const MatriculasListSection = (props: MatriculasListSectionProps) => {
  const { enrollmentsList } = props

  // Función helper para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible'
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: es })
    } catch (error) {
      console.error('Error formateando fecha:', error)
      return dateString
    }
  }

  const getMatriculaStatus = (
    matricula: IEnrollmentStage
  ): 'regular' | 'extemporanea' | null => {
    const now = new Date()
    const startRegular = matricula.start_date
      ? parseISO(matricula.start_date)
      : null
    const endRegular = matricula.end_date ? parseISO(matricula.end_date) : null

    if (
      startRegular &&
      endRegular &&
      now >= startRegular &&
      now <= endRegular
    ) {
      return 'regular'
    }
    return null
  }

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 gap-6`}>
        {enrollmentsList.map((matricula, index) => (
          <Card
            key={index}
            className={cn(
              'shadow-sm border flex flex-col md:flex-row gap-0 overflow-hidden group rounded-md pt-0 pb-0'
            )}
          >
            {/* Imagen de cabecera */}
            <div
              className={cn(
                'relative h-32 w-full overflow-hidden',
                'md:w-72 md:h-auto md:flex-shrink-0 lg:w-96',
                'rounded-t-md md:rounded-l-md md:rounded-tr-none',
                matricula?.enrollment ? 'bg-gray-100' : 'bg-blue-800'
              )}
            >
              <Image
                src="/images/bg-matricula.webp"
                alt="Matrícula universitaria"
                className="object-cover group-hover:scale-105 transition-transform duration-300 h-full"
                width={600}
                height={200}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Contenido del Card */}
            <div className="flex flex-col flex-grow p-4 md:p-6">
              <CardHeader className="pb-0 pt-0 px-0">
                <CardTitle>
                  <div className="flex flex-col gap-2">
                    <Badge
                      className={cn(
                        'rounded-full font-medium border w-fit',
                        'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-400'
                      )}
                    >
                      Período: {matricula?.period_name}
                    </Badge>
                    <p className={cn('line-clamp-2', 'text-gray-600')}>
                      {matricula.description}
                    </p>
                  </div>
                  <div>
                    {getMatriculaStatus(matricula) === 'regular' && (
                      <Badge className="rounded-full text-xs bg-green-100 text-green-800 border-green-200">
                        Matrícula Regular
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 py-4 px-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div>
                      <p className={cn('text-sm mb-1')}>
                        {matricula?.enrollment
                          ? 'Tienes una matrícula completada en:'
                          : 'Tienes una matrícula pendiente en:'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            'rounded-full text-xs',
                            'bg-gray-100 text-gray-600 border-gray-200'
                          )}
                        >
                          {matricula.program_code}
                        </Badge>
                        <h3
                          className={cn(
                            'text-sm font-semibold uppercase line-clamp-1',
                            'text-gray-500'
                          )}
                        >
                          {matricula.program_name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 rounded-lg bg-white/5 p-3 border border-white/10">
                  <div className="text-sm">
                    <p className={cn('font-medium mb-1', 'text-gray-600')}>
                      Fechas para matrícula:
                    </p>
                    <div className="pl-2 space-y-1">
                      <p className="flex items-start">
                        <span
                          className={cn(
                            'font-semibold min-w-[70px]',
                            'text-gray-700'
                          )}
                        >
                          Regular:
                        </span>{' '}
                        <span className={'text-gray-600'}>
                          {formatDate(matricula.start_date)} -{' '}
                          {formatDate(matricula.end_date)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <MatriculaActionButton
                    matricula={matricula}
                    fullWidth
                  />
                </div>
              </CardContent>
            </div>
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
    'inline-flex items-center justify-center text-sm px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-md'

  if (!matricula?.enrollment) {
    return (
      <Link
        href={
          APP_URL.MATRICULA.START_ENROLLMENT.URL_BASE +
          '?matricula=' +
          matricula.id +
          '&student=' +
          matricula.student_id
        }
        className={`${baseClasses} ${
          fullWidth ? 'w-full' : ''
        } bg-blue-600 text-white hover:bg-blue-700 font-medium border border-blue-700`}
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
          matricula.enrollment_id.toString()
        )}
        className={`${baseClasses} ${
          fullWidth ? 'w-full' : ''
        } border border-green-600 font-bold text-green-700 hover:bg-green-50 bg-white`}
      >
        Ver Matrícula
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    )
  }

  return null
}
