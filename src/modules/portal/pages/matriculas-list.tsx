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
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns} gap-6`}>
        {enrollmentsList.map((matricula, index) => (
          <Card
            key={index}
            className={cn(
              'shadow-sm border flex flex-col md:flex-row gap-0 overflow-hidden group rounded-md' // Added responsive flex and rounded-md
              // {
              //   'bg-gradient-to-br from-blue-700 to-blue-900 text-white':
              //     !matricula?.enrollment,
              // }
            )}
          >
            {/* Imagen de cabecera */}
            <div
              className={cn(
                'relative h-32 w-full overflow-hidden',
                'md:w-56 md:h-auto md:flex-shrink-0', // Fixed width for image on md and up, prevent shrinking
                'rounded-t-md md:rounded-l-md md:rounded-tr-none' // Rounded corners for image
                // !matricula?.enrollment ? 'bg-blue-800' : 'bg-gray-100' // Adjust background for image based on card state
              )}
            >
              <Image
                src="/images/bg-matricula.webp" // Ruta a tu imagen por defecto
                alt="Matrícula universitaria"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Contenido del Card */}
            <div className="flex flex-col flex-grow p-4 md:p-6">
              <CardHeader className="pb-0 pt-0 px-0">
                <CardTitle
                  className={cn(
                    'text-lg font-extrabold flex justify-between',
                    matricula?.enrollment ? 'text-gray-700' : 'text-white'
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <Badge
                      className={cn(
                        'rounded-full font-medium border w-fit',
                        matricula?.enrollment
                          ? 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-400'
                          : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                      )}
                    >
                      Período: {matricula?.period_name}
                    </Badge>
                    <p
                      className={cn(
                        'line-clamp-2',
                        matricula?.enrollment
                          ? 'text-gray-600'
                          : 'text-white/80'
                      )}
                    >
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
              <CardContent className="flex flex-col gap-4 py-4 px-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div>
                      <p
                        className={cn(
                          'text-sm mb-1',
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
                            'text-sm font-semibold uppercase line-clamp-1',
                            matricula?.enrollment
                              ? 'text-gray-700'
                              : 'text-white'
                          )}
                        >
                          {matricula.program_type}: {matricula.program_name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 rounded-lg bg-white/5 p-3 border border-white/10">
                  <div className="text-sm">
                    <p
                      className={cn(
                        'font-medium mb-1',
                        matricula?.enrollment
                          ? 'text-gray-600'
                          : 'text-white/80'
                      )}
                    >
                      Fechas para matrícula:
                    </p>
                    <div className="pl-2 space-y-1">
                      <p className="flex items-start">
                        <span
                          className={cn(
                            'font-semibold min-w-[70px]',
                            matricula?.enrollment
                              ? 'text-gray-700'
                              : 'text-white'
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
                          {formatDate(matricula.start_date)} -{' '}
                          {formatDate(matricula.end_date)}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span
                          className={cn(
                            'font-semibold min-w-[70px]',
                            matricula?.enrollment
                              ? 'text-gray-700'
                              : 'text-white'
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
                          {formatDate(matricula.untimely_start_date)} -{' '}
                          {formatDate(matricula.untimely_end_date)}
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
          matricula.student_uuid
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
          matricula?.enrollment_id.toString()
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
